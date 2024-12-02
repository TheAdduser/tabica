/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1276319826")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id ~ projects_via_statuses.owner",
    "deleteRule": "@request.auth.id ~ projects_via_statuses.owner",
    "listRule": "",
    "updateRule": "@request.auth.id ~ projects_via_statuses.owner",
    "viewRule": ""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1276319826")

  // update collection data
  unmarshal({
    "createRule": null,
    "deleteRule": null,
    "listRule": null,
    "updateRule": null,
    "viewRule": null
  }, collection)

  return app.save(collection)
})
