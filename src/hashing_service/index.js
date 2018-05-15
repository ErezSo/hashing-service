const crypto = require("crypto");

const KEY = "woof";

const hashing = asset =>
  crypto
    .createHmac("sha256", KEY)
    .update(asset)
    .digest("hex");

module.exports = hashing;
