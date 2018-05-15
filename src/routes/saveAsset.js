import fs from "fs";
import hashing from "../hashing_service";

const path = `${__dirname}/../../assets`;

function saveAsset(req, res) {
  if (!req.body.asset) {
    return res.status(404).send("An asset and/or a secret is missing");
  }
  const { asset } = req.body;
  const hash = hashing(asset);
  const assetData = {
    [hash]: asset
  };
  return new Promise(resolve =>
    fs.stat(path, err => {
      if (err) {
        fs.mkdir(path, () => resolve());
      }
      resolve();
    })
  ).then(() =>
    new Promise((resolve, reject) => {
      fs.readFile(`${path}/assets.json`, "utf-8", (err, data) => {
        if (err && err.code === "ENOENT") {
          return resolve(assetData);
        } else if (err) {
          return reject(err);
        }
        return resolve(Object.assign({}, JSON.parse(data), assetData));
      });
    }).then(data =>
      new Promise((resolve, reject) => {
        fs.writeFile(`${path}/assets.json`, JSON.stringify(data), err => {
          if (err) reject(err);
          else resolve();
        });
      })
        .then(() => res.status(200).send(hash))
        .catch(err => {
          console.error(err); // eslint-disable-line no-console
          res.status(400).send("Sorry. Something went wrong");
        })
    )
  );
}

export default saveAsset;
