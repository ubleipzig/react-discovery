## React Discovery
[![CircleCI](https://circleci.com/gh/ubleipzig/react-discovery.svg?style=shield)](https://circleci.com/gh/ubleipzig/react-discovery)
[![Netlify Status](https://api.netlify.com/api/v1/badges/c5727bf2-2ed5-42f7-a8c1-274871f0c3ea/deploy-status)](https://app.netlify.com/sites/react-discovery/deploys)
[![codecov](https://codecov.io/gh/ubleipzig/react-discovery/branch/master/graph/badge.svg)](https://codecov.io/gh/ubleipzig/react-discovery)

#### @react-discovery/configuration
[![npm (scoped)](https://img.shields.io/npm/v/@react-discovery/configuration.svg?color=blue)](https://www.npmjs.com/package/@react-discovery/configuration)

#### @react-discovery/core
[![npm (scoped)](https://img.shields.io/npm/v/@react-discovery/core.svg?color=blue)](https://www.npmjs.com/package/@react-discovery/core)

#### @react-discovery/components
[![npm (scoped)](https://img.shields.io/npm/v/@react-discovery/components.svg?color=blue)](https://www.npmjs.com/package/@react-discovery/components)

### Quick Start

#### Create Environment
- configure `search api host` and `collection` in `.env` file in test app root
```yaml
REACT_APP_SEARCH_API_HOST=http://localhost/solr/
REACT_APP_SEARCH_API_COLLECTION=test04
```
##### Setup Test Solr Instance
- start docker composition 
    ```bash
    $ cd deployment/solr
    $ docker-compose up
    ```
- create core in docker:
    ```
    $ docker exec solr1 /opt/solr/bin/solr create_collection -c test04
    ```
- load sample data
    ```bash
    $ curl -X POST -H"Content-Type: application/json" http://localhost/solr/test04/update/json?commit=true --data-binary @test-data/test-data-04.json
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

### Continuous Deployment
https://react-discovery.netlify.com/

### Testing
```bash
 $ lerna run test --stream
```
