#!/usr/bin/env bash
docker exec solr1 /opt/solr/bin/solr create_collection -c nested
curl -X POST -H"Content-Type: application/json" http://localhost/solr/nested/update/json?commit=true --data-binary @test-data/nested-entities-data.json
