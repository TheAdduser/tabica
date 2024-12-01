/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2815867050")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id ~ projectId.assignee",
    "listRule": "@request.auth.id ~ projectId.assignee",
    "updateRule": "@request.auth.id ~ projectId.assignee",
    "viewRule": "@request.auth.id ~ projectId.assignee"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2815867050")

  // update collection data
  unmarshal({
    "createRule": null,
    "listRule": null,
    "updateRule": null,
    "viewRule": null
  }, collection)

  return app.save(collection)
})
