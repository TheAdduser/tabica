/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2602490748")

  // update collection data
  unmarshal({
    "deleteRule": ""
  }, collection)

  // remove field
  collection.fields.removeById("relation1821597943")

  // remove field
  collection.fields.removeById("relation4044550264")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2602490748")

  // update collection data
  unmarshal({
    "deleteRule": "project.assignee.id ~ @request.auth.id  "
  }, collection)

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_484305853",
    "hidden": false,
    "id": "relation1821597943",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "project",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1276319826",
    "hidden": false,
    "id": "relation4044550264",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "statusId",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
