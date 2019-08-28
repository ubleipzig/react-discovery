## React Discovery
[![CircleCI](https://circleci.com/gh/ubleipzig/react-discovery.svg?style=shield)](https://circleci.com/gh/ubleipzig/react-discovery)
[![Netlify Status](https://api.netlify.com/api/v1/badges/c5727bf2-2ed5-42f7-a8c1-274871f0c3ea/deploy-status)](https://app.netlify.com/sites/react-discovery/deploys)
[![codecov](https://codecov.io/gh/ubleipzig/react-discovery/branch/solr/graph/badge.svg)](https://codecov.io/gh/ubleipzig/react-discovery)

#### @react-discovery/configuration
[![npm (scoped)](https://img.shields.io/npm/v/@react-discovery/configuration.svg?color=blue)](https://www.npmjs.com/package/@react-discovery/configuration)

#### @react-discovery/core
[![npm (scoped)](https://img.shields.io/npm/v/@react-discovery/core.svg?color=blue)](https://www.npmjs.com/package/@react-discovery/core)

#### @react-discovery/components
[![npm (scoped)](https://img.shields.io/npm/v/@react-discovery/components.svg?color=blue)](https://www.npmjs.com/package/@react-discovery/components)

### Quick Start

### Setup Firebase Project Configuration for Authentication
[See Firebase Documents](https://firebase.google.com/docs/web/setup#config-object)
The firebase configuration object is located in `react-discovery-elasticsearch-app/src/config/firebase`

#### Create Environment
- configure `search api host` and `collection` in `.env` file in elasticsearch-app root
```yaml
REACT_APP_SEARCH_API_HOST=http://localhost:8000/
REACT_APP_SEARCH_API_COLLECTION=hsp2
REACT_APP_FIREBASE_API_KEY=
```

##### Setup Test Elasticsearch Instance
- start docker composition 
    ```bash
    $ cd deployment/elasticsearch
    $ docker-compose up
    ```
- create index mapping
    ```bash
    $ curl -X PUT "localhost:8000/hsp2" -H 'Content-Type: application/json' -d @test-data/hsp_mapping.json
    ```

- create test data set
    ```bash
    $ curl -X PUT "localhost:8000/_bulk" -H 'Content-Type: application/x-ndjson' --data-binary @test-data/test-data-09.txt
    ```
    
- OR execute 
    ```bash
    $ ./build.sh
    ```
    
### Build and Start React App
 ```bash
 $ npm install
 $ lerna bootstrap --hoist
 $ lerna run build
 $ lerna run start
```

### Continuous Deployment Elasticsearch App
https://react-discovery.netlify.com/

### Testing
```bash
 $ lerna run test --stream
```
### Solr Support
    Checkout solr branch
```bash
 $ git checkout solr
```
### Continuous Deployment Solr App
https://solr--react-discovery.netlify.com/
