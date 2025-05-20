POSTMAN_API_KEY := $(POSTMAN_API_KEY)
COLLECTION_UID := $(COLLECTION_UID)

swagger.json:
	curl http://localhost:3000/swagger.json -o swagger.json

postman.json: swagger.json
	openapi2postmanv2 -s swagger.json -o postman.json -p

wrap:
	jq '{ collection: . }' postman.json > wrapped-postman.json

sync: swagger.json
	openapi2postmanv2 -s swagger.json -o postman.json -p
	jq '{ collection: . }' postman.json > wrapped-postman.json
	curl -X PUT https://api.getpostman.com/collections/$(COLLECTION_UID) \
	  -H "X-Api-Key: $(POSTMAN_API_KEY)" \
	  -H "Content-Type: application/json" \
	  -d @wrapped-postman.json

clean:
	rm -f swagger.json postman.json wrapped-postman.json
