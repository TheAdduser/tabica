/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1276319826")

  // update collection data
  unmarshal({
    "name": "columns"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1276319826")

  // update collection data
  unmarshal({
    "name": "status"
  }, collection)

  return app.save(collection)
})
