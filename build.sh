#!/usr/bin/env bash
docker exec solr1 /opt/solr/bin/solr create_collection -c test01
curl -X POST -H"Content-Type: application/json" http://localhost/solr/test01/update/json?commit=true --data-binary @test-data/solr-test-data.json
