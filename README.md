# Hashing Service

Store assets in a file system with the asset's modified hash as a key - `/save_asset`.

Fetch an asset from the file system with the returned modified key that was recieved after storing - `/fetch_asset/:hash`.

### Installation

The service requires [Node.js](https://nodejs.org/) v6.4+ to run.

```sh
$ yarn
// or
$ npm install
```

### Run the service production

```sh
$ yarn start
// or
$ npm start
```

### Run the service locally in dev mode

```sh
$ yarn dev
// or
$ npm run dev
```

### Run unit tests

```sh
$ yarn test
// or
$ npm test
```
