#!/usr/bin/env bash
curl -X PUT "localhost:8000/hsp2" -H 'Content-Type: application/json' -d @test-data/hsp_mapping.json
curl -X PUT "localhost:8000/_bulk" -H 'Content-Type: application/x-ndjson' --data-binary @test-data/test-data-09.txt
