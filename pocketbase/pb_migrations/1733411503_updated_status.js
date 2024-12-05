/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1276319826")

  // update collection data
  unmarshal({
    "createRule": "",
    "listRule": "",
    "updateRule": "",
    "viewRule": ""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1276319826")

  // update collection data
  unmarshal({
    "createRule": "project.assignee.id ~ @request.auth.id  ",
    "listRule": "project.assignee.id ~ @request.auth.id",
    "updateRule": "project.assignee.id ~ @request.auth.id  ",
    "viewRule": "project.assignee ~ @request.auth.id  "
  }, collection)

  return app.save(collection)
})
