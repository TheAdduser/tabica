/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2815867050")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id ~ assignee.projects_via_owner.id",
    "listRule": "@request.auth.id ~ assignee.projects_via_owner.id",
    "updateRule": "@request.auth.id ~ assignee.projects_via_owner.id",
    "viewRule": "@request.auth.id ~ assignee.projects_via_owner.id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2815867050")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id ~ assignee",
    "listRule": "@request.auth.id ~ assignee",
    "updateRule": "@request.auth.id ~ assignee",
    "viewRule": "@request.auth.id ~ assignee"
  }, collection)

  return app.save(collection)
})
