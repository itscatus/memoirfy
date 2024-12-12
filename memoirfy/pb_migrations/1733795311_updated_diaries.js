/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2950295505")

  // remove field
  collection.fields.removeById("text54111990")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "select54111990",
    "maxSelect": 1,
    "name": "mood",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "Happy",
      "Sad",
      "Neutral"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2950295505")

  // add field
  collection.fields.addAt(3, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text54111990",
    "max": 0,
    "min": 0,
    "name": "mood",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("select54111990")

  return app.save(collection)
})
