## Solr-React
[![CircleCI](https://circleci.com/gh/ubl-chj/solr-react.svg?style=shield)](https://circleci.com/gh/ubl-chj/solr-react)
[![Netlify Status](https://api.netlify.com/api/v1/badges/c5727bf2-2ed5-42f7-a8c1-274871f0c3ea/deploy-status)](https://app.netlify.com/sites/react-discovery/deploys)
### Quick Start

#### Create Environment
- configure `search api host` and `collection` in `.env` file in test app root
```yaml
REACT_APP_SEARCH_API_HOST=http://localhost/solr/
REACT_APP_SEARCH_API_COLLECTION=gettingstarted
```
##### Setup Test Solr Instance
- start docker composition 
    ```bash
    $ docker-compose up
    ```
- create core in docker:
    ```
    $ docker exec solr1 /opt/solr/bin/solr create_collection -c gettingstarted
    ```
- load sample data
    ```bash
    $ curl -X POST -H"Content-Type: application/json" http://localhost/solr/gettingstarted/update/json?commit=true --data-binary @test-data/sample-data.json
    ```
    
### Build and Start React App
 ```bash
 $ npm install
 $ lerna bootstrap --hoist
 $ lerna run --scope solr-react-faceted-search build
 $ lerna run --scope test-app start
```

### Continuous Deployment
https://react-discovery.netlify.com/
