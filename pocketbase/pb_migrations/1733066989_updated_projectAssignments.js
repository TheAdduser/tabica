/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2815867050")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id ~ project.assignee",
    "listRule": "@request.auth.id ~ project.assignee",
    "updateRule": "@request.auth.id ~ project.assignee",
    "viewRule": "@request.auth.id ~ project.assignee"
  }, collection)

  // update field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_484305853",
    "hidden": false,
    "id": "relation1821597943",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "project",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation1689669068",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "assignee",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2815867050")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id ~ projectId.assignee",
    "listRule": "@request.auth.id ~ projectId.assignee",
    "updateRule": "@request.auth.id ~ projectId.assignee",
    "viewRule": "@request.auth.id ~ projectId.assignee"
  }, collection)

  // update field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_484305853",
    "hidden": false,
    "id": "relation1821597943",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "projectId",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation1689669068",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "userId",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
