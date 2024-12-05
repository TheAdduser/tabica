/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1276319826")

  // update collection data
  unmarshal({
    "deleteRule": ""
  }, collection)

  // remove field
  collection.fields.removeById("relation800313582")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1276319826")

  // update collection data
  unmarshal({
    "deleteRule": "project.owner.id ~ @request.auth.id  "
  }, collection)

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_484305853",
    "hidden": false,
    "id": "relation800313582",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "project",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
