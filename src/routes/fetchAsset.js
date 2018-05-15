import fs from "fs";

const path = `${__dirname}/../../assets`;

function fetchAsset(req, res) {
  const { hash } = req.params;
  if (!hash) {
    return res.status(400).send("A hash is missing");
  }
  const fileNumber = hash.match(":") ? hash.match(/^(\d):/)[1] : false;

  if (!fileNumber) {
    return res.status(400).send("The hash is wrong");
  }

  return new Promise((resolve, reject) => {
    return fs.stat(`${path}/assets${fileNumber}.json`, err => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  })
    .then(() => {
      return new Promise((resolve, reject) => {
        return fs.readFile(
          `${path}/assets${fileNumber}.json`,
          "utf-8",
          (err, data) => {
            if (err) {
              return reject(err);
            }
            const assets = JSON.parse(data);
            return Object.hasOwnProperty.call(assets, hash)
              ? resolve(assets[hash])
              : reject();
          }
        );
      });
    })
    .then(asset => {
      return res.status(200).send(asset);
    })
    .catch(err => {
      console.error(err); // eslint-disable-line no-console
      res.status(404).send("The asset you're asking for doesn't exist");
    });
}

export default fetchAsset;
