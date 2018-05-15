import fs from "fs";

const path = `${__dirname}/../../assets`;

function fetchAsset(req, res) {
  const { hash } = req.params;
  if (!hash) {
    return res.status(400).send("A hash is missing");
  }
  return new Promise(resolve =>
    fs.stat(path, err => {
      if (err) {
        resolve(false);
      }
      resolve();
    })
  ).then(nodir =>
    new Promise((resolve, reject) => {
      if (nodir === false) {
        return resolve(false);
      }
      return fs.readFile(`${path}/assets.json`, "utf-8", (err, data) => {
        if (err) {
          return reject(err);
        }
        const assets = JSON.parse(data);
        return Object.hasOwnProperty.call(assets, hash)
          ? resolve(assets[hash])
          : resolve(false);
      });
    }).then(asset => {
      if (asset === false) {
        return res
          .status(404)
          .send("The asset you're asking for doesn't exist");
      }
      return res.status(200).send(asset);
    })
  );
}

export default fetchAsset;
