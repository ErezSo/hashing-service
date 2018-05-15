import crypto from "crypto";

const KEY = "woof";

const hashing = asset =>
  crypto
    .createHmac("sha256", KEY)
    .update(asset)
    .digest("hex");

export default hashing;
