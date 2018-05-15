# Hashing Service

Store assets in a file system with the asset's modified hash as a key. The POST endpoint `/save_asset` expect to recieve a body with an "asset" key and the actual asset as a value.

Fetch an asset from the file system with the returned modified key that was recieved after storing. The GET endpoint `/fetch_asset/:hash` expects to recieve as a parameter the modified hash that was returned from the `/save_asset` endpoint.

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
