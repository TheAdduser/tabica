/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_484305853")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.id ~ owner",
    "viewRule": "@request.auth.id ~ owner "
  }, collection)

  // remove field
  collection.fields.removeById("relation2090728460")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_484305853")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.id ~ owner || @request.auth.id ~ assignee",
    "viewRule": "@request.auth.id ~ owner || @request.auth.id ~ assignee"
  }, collection)

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation2090728460",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "assignee",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
