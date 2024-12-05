/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1276319826")

  // update collection data
  unmarshal({
    "listRule": "project.assignee.id ~ @request.auth.id",
    "viewRule": "project.assignee ~ @request.auth.id  "
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1276319826")

  // update collection data
  unmarshal({
    "listRule": "project.assignee.id ~ @request.auth.id  ",
    "viewRule": "project.assignee.id ~ @request.auth.id  "
  }, collection)

  return app.save(collection)
})
