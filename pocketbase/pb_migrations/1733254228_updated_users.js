/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "authToken": {
      "duration": 3600
    },
    "verificationToken": {
      "duration": 3600
    }
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "authToken": {
      "duration": 604800
    },
    "verificationToken": {
      "duration": 259200
    }
  }, collection)

  return app.save(collection)
})
