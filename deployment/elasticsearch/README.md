#### create index mapping
curl -X PUT "localhost:8000/hsp1" -H 'Content-Type: application/json' -d @test-data/hsp_mapping.json

#### create test data set
curl -X PUT "localhost:8000/_bulk" -H 'Content-Type: application/x-ndjson' --data-binary @test-data/test-data-04.txt

#### get highlighted nested documents
curl -X GET "localhost:8000/hsp1/_search" -H 'Content-Type: application/json' -d'
{
  "query": {
    "nested": {
      "path": "entities.entities",
      "query": {
        "bool": {
          "must": [
            { "match": { "entities.entities.beschreibungFaszikelText_t": "Pulvinar" }}
          ]
        }
      },
      "inner_hits": { 
        "highlight": {
          "fields": {
            "entities.entities.beschreibungFaszikelText_t": {}
          }
        }
      }
    }
  }
}'
