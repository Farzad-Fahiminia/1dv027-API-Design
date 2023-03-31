# API Documentation

## Record API
Properties that are included and required for add a record.
- artist
- recordTitle
- releaseYear

## Base URL to API
https://1dv027-api-design-production.up.railway.app/api/v1

## /user/register
POST: Register a user.

## /user/login
POST: Logs in the user and returns a access token.

## /record
GET: Get all records.
POST: Register a record to the database collection.

## /record/id
GET: Get a specific record.
PUT: Updates the whole record object.
PATCH: Updates part of the record object.
DELETE: Deletes a specific record.

## /webhook
Short message pointing to /webhook/register.

## /webhook/register
POST: To register a url and get notified when a record is added to the collection.