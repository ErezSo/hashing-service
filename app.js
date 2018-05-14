/* eslint no-console:0 */

import express from "express";
import bodyParser from "body-parser";
import api from "./src/routes/api";

const app = express();
const port = process.env.PORT || 3002;

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", api);

app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Running app on http://localhost:${port}`);
  }
});
