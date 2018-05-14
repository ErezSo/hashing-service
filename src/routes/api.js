/* eslint no-console:0 */
import express from "express";
import fs from "fs";
import hashing from "../hashing_service";

const router = express.Router();

function saveAsset(req, res) {
  if (!req.body.asset || !req.body.secret) {
    return res.status(400).send("An asset and/or a secret is missing");
  }
  const { asset, secret } = req.body;
  const hash = hashing(asset, secret);
  const assetData = {
    [hash]: asset
  };

  return new Promise((resolve, reject) => {
    fs.readFile("./assets.json", "utf-8", (err, data) => {
      if (err && err.code === "ENOENT") {
        return resolve(assetData);
      } else if (err) {
        console.error(err);
        return reject();
      }
      return resolve(Object.assign({}, JSON.parse(data), assetData));
    });
  }).then(data =>
    new Promise((resolve, reject) => {
      fs.writeFile("./assets.json", JSON.stringify(data), err => {
        if (err) reject(err);
        else resolve();
      });
    })
      .then(() => res.status(200).send(data))
      .catch(err => {
        console.error(err);
        res.status(400).send("Sorry. Something went wrong");
      })
  );
}

function fetchAsset(req, res) {
  const { hash } = req.params;
  if (!hash) {
    return res.status(400).send("A hash is missing");
  }
  return new Promise((resolve, reject) => {
    fs.readFile("./assets.json", "utf-8", (err, data) => {
      if (err) {
        console.error(err);
        return reject();
      }
      const assets = JSON.parse(data);
      return assets[hash] ? resolve(assets[hash]) : resolve(false);
    });
  }).then(asset => {
    if (asset === false) {
      return res.status(400).send("The asset you're asking for doesn't exist");
    }
    return res.status(200).send(asset);
  });
}

router.route("/save_asset").post(saveAsset);
router.route("/fetch_asset/:hash").get(fetchAsset);

/**
 * Middleware for handling errors when attempting retrival
 */
export const errorsMiddleware = (err, req, res, next) => {
  console.warn(err);
  res.state(400).send(err);
  next();
};

export default router;
