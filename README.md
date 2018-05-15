# Hashing Service

Store assets in a file system with the asset's modified hash as a key. POST `/save_asset`.

Fetch an asset from the file system with the returned modified key that was recieved after storing. GET `/fetch_asset/:hash`.

### Installation

The service requires [Node.js](https://nodejs.org/) v6.4+ to run.

```sh
$ yarn
// or
$ npm install
```

### Run the service in production

```sh
$ yarn prod
// or
$ npm run prod
```

### Run the service locally in dev mode

```sh
$ yarn start
// or
$ npm start
```

### Run unit tests

```sh
$ yarn test
// or
$ npm test
```
