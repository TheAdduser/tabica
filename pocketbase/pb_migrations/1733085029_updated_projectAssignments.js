/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2815867050")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id ~ project.owner.id",
    "listRule": "@request.auth.id ~ project.owner.id",
    "updateRule": "@request.auth.id ~ project.owner.id",
    "viewRule": "@request.auth.id ~ project.owner.id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2815867050")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id ~ project.owner",
    "listRule": "@request.auth.id ~ project.owner",
    "updateRule": "@request.auth.id ~ project.owner",
    "viewRule": "@request.auth.id ~ project.owner"
  }, collection)

  return app.save(collection)
})
