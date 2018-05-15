/* eslint no-console:0 */
import request from "supertest";
import fs from "fs";
import server from "../../app";

const api = request(server);
const path = `${__dirname}/../../assets`;

// https://stackoverflow.com/a/32197381/4640352
function deleteFolderRecursive(pathToDelete) {
  if (fs.existsSync(pathToDelete)) {
    fs.readdirSync(pathToDelete).forEach(file => {
      const curPath = `${pathToDelete}/${file}`;
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(pathToDelete);
  }
}

describe("API", () => {
  const asset = "See you in the next life, Jack!";
  const fileNumber = 1;
  const hash = `${fileNumber}:84345bcf2be3296a3faee0d8a0dab3b450b224e1969c56cb58759a4edc7fdc72`;

  beforeAll(() => {
    deleteFolderRecursive(path);
  });

  afterEach(() => {
    deleteFolderRecursive(path);
  });

  test("successful POST request", () =>
    api
      .post("/save_asset")
      .send(`asset=${asset}`)
      .then(res => {
        expect(res.text).toBe(hash);
      })
      .catch(err => {
        console.error(err);
      }));

  test("failing POST request", () =>
    api
      .post("/save_asset")
      .expect(404)
      .then(res => {
        expect(res.text).toBe("An asset is missing");
      })
      .catch(err => {
        console.error(err);
      }));

  test("failing GET request - illegal hash", () =>
    api
      .get(`/fetch_asset/asdf`)
      .expect(400)
      .then(res => {
        expect(res.text).toBe("The hash is wrong");
      })
      .catch(err => {
        console.error(err);
      }));

  test("failing GET request - wrong hash", () => {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    fs.writeFileSync(
      `${path}/assets${fileNumber}.json`,
      JSON.stringify({ [hash]: asset })
    );

    return api
      .get(`/fetch_asset/1:asdf`)
      .expect(404)
      .then(res => {
        expect(res.text).toBe("The asset you're asking for doesn't exist");
      })
      .catch(err => {
        console.error(err);
      });
  });

  test("successful GET request", () => {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    fs.writeFileSync(
      `${path}/assets${fileNumber}.json`,
      JSON.stringify({ [hash]: asset })
    );

    return api
      .get(`/fetch_asset/${hash}`)
      .expect(200)
      .then(res => {
        expect(res.text).toBe(asset);
      })
      .catch(err => {
        console.error(err);
      });
  });

  test("Error on wrong path", () =>
    api
      .get("/asdf")
      .then(res => {
        expect(res.status).toBe(404);
      })
      .catch(err => {
        console.error(err);
      }));
});
