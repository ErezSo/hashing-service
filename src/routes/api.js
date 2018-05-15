import express from "express";
import saveAsset from "./saveAsset";
import fetchAsset from "./fetchAsset";

const router = express.Router();

router.route("/save_asset").post(saveAsset);
router.route("/fetch_asset/:hash").get(fetchAsset);

export const errorsMiddleware = (err, req, res, next) => {
  console.error(err.message); // eslint-disable-line no-console
  const errorStatus = err.statusCode || 500;
  res.status(errorStatus).send(err.message);
  next(err);
};

export default router;
