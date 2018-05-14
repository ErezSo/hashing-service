import crypto from "crypto";

const hashing = (asset, secret) =>
  crypto
    .createHmac("sha256", secret)
    .update(asset)
    .digest("hex");

export default hashing;
