import express from "express";
import saveAsset from "./saveAsset";
import fetchAsset from "./fetchAsset";

const router = express.Router();

router.route("/save_asset").post(saveAsset);
router.route("/fetch_asset/:hash").get(fetchAsset);

/**
 * Middleware for handling errors when attempting retrival
 */
export const errorsMiddleware = (err, req, res, next) => {
  console.warn(err); // eslint-disable-line no-console
  res.state(400).send(err);
  next();
};

export default router;
