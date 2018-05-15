import fs from "fs";
import hashing from "../hashing_service";
import findHighestNumber from "../utils";

const path = `${__dirname}/../../assets`;
const BYTE = 1000;
// File size threshold of 16MB === ~100K records
const fileThreshold = 16 * BYTE;

function saveAsset(req, res) {
  if (!req.body.asset) {
    return res.status(404).send("An asset is missing");
  }
  const { asset } = req.body;
  const hash = hashing(asset);

  return new Promise(resolve => {
    return fs.stat(path, err => {
      if (err) {
        fs.mkdir(path, () => resolve());
      }
      resolve();
    });
  })
    .then(() => {
      return new Promise((resolve, reject) => {
        // Get all the files from the assets directory as an array in order to find the number of the current file to write to.
        fs.readdir(path, (err, files) => {
          if (err) {
            return reject();
          }
          return resolve(findHighestNumber(files) || 1);
        });
      });
    })
    .then(fileNumber => {
      return new Promise(resolve => {
        return fs.stat(`${path}/assets${fileNumber}.json`, (err, file) => {
          if (err) {
            // If the file doesn't exist we're using we'll create the first file with the provided fileNumber - should be 1
            return resolve(fileNumber);
          }
          // If the file is too big, we are creating a new file.
          if (file.size > fileThreshold) {
            return resolve(fileNumber + 1);
          }

          return resolve(fileNumber);
        });
      });
    })
    .then(fileNumber => {
      // In order to know in which file the asset is located we're adding the file number to the hash.
      const modifiedHash = `${fileNumber}:${hash}`;
      const assetData = {
        [modifiedHash]: asset
      };
      return new Promise((resolve, reject) => {
        fs.readFile(
          `${path}/assets${fileNumber}.json`,
          "utf-8",
          (err, data) => {
            if (err && err.code === "ENOENT") {
              // If file doesn't exist we will create a new one with the provided asset.
              return resolve(assetData);
            } else if (err) {
              return reject(err);
            }
            return resolve(Object.assign({}, JSON.parse(data), assetData));
          }
        );
      }).then(data => {
        return new Promise((resolve, reject) => {
          return fs.writeFile(
            `${path}/assets${fileNumber}.json`,
            JSON.stringify(data),
            err => {
              if (err) {
                return reject(err);
              }
              return resolve(modifiedHash);
            }
          );
        });
      });
    })
    .then(modifiedHash => res.status(200).send(modifiedHash))
    .catch(err => {
      console.error(err); // eslint-disable-line no-console
      res.status(400).send("Sorry. Something went wrong");
    });
}

export default saveAsset;
