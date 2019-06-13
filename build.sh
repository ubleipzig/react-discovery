#!/usr/bin/env bash
docker exec solr1 /opt/solr/bin/solr create_collection -c test04
curl -X POST -H"Content-Type: application/json" http://localhost/solr/test04/update/json?commit=true --data-binary @test-data/test-data-04.json
