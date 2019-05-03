## Solr-React

### Quick Start

#### Setup Test Solr Instance
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
    $ curl -X POST -H"Content-Type: application/json" http://localhost/solr/gettingstarted/update/json?commit=true --data-binary @sample-data.json
    ```
    
#### Build and Start React App
 ```bash
 $ npm install
 $ lerna bootstrap --hoist
 $ lerna run --scope solr-faceted-search-react build
 $ lerna run --scope test-app start
