/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1276319826")

  // update collection data
  unmarshal({
    "createRule": "project.assignee.id ~ @request.auth.id  ",
    "deleteRule": "project.owner.id ~ @request.auth.id  ",
    "listRule": "project.assignee.id ~ @request.auth.id  ",
    "updateRule": "project.assignee.id ~ @request.auth.id  ",
    "viewRule": "project.assignee.id ~ @request.auth.id  "
  }, collection)

  return app.save(collection)
}, (app) => {
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
})
