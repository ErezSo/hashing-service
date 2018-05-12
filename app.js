/* eslint no-console:0 */

import express from "express";

const app = express();
const port = process.env.PORT || 3002;

app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Running app on http://localhost:${port}`);
  }
});
