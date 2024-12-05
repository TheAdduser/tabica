/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1276319826")

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2602490748",
    "hidden": false,
    "id": "relation1384045349",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "task",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1276319826")

  // remove field
  collection.fields.removeById("relation1384045349")

  return app.save(collection)
})
