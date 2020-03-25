define({ "api": [
  {
    "group": "history",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/histories/:userId/view/all",
    "title": "api for getting all histories of user .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>id of user  (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user. (body/query/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"histories found\",\n    \"status\": 200,\n    \"data\":{}\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/historiesRoute.js",
    "groupTitle": "history",
    "name": "GetApiV1HistoriesUseridViewAll"
  },
  {
    "group": "history",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/histories/add",
    "title": "api for adding to history .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>id of user of whose list/item/subitem is manipulated. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "category",
            "description": "<p>defines type of history(eg. list-add/list-edit/list-delete). (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>defines meaning of history. (body params) (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>id of item. (body params) (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subItemId",
            "description": "<p>id subItem which is manipulated. (body params) (optonal)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user. (body/query/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"history created\",\n    \"status\": 200,\n    \"data\":{}\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/historiesRoute.js",
    "groupTitle": "history",
    "name": "PostApiV1HistoriesAdd"
  },
  {
    "group": "history",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/histories/:userId/delete",
    "title": "api for deleting histories of user .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>id of user  (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user. (body/query/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"history deleted\",\n    \"status\": 200,\n    \"data\":{}\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/historiesRoute.js",
    "groupTitle": "history",
    "name": "PostApiV1HistoriesUseridDelete"
  },
  {
    "group": "item",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/list/item/:itemId/deleteItem",
    "title": "api for editing item .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>id of item. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>listid of list to which this item belongs to. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user. (body/query/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"item deleted\",\n    \"status\": 200,\n    \"data\":{}\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/itemRoute.js",
    "groupTitle": "item",
    "name": "PostApiV1ListItemItemidDeleteitem"
  },
  {
    "group": "item",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/list/item/:itemId/editItemTitle",
    "title": "api for editing item .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>id of item. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemTitle",
            "description": "<p>new title of  item. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user. (body/query/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"item updated\",\n    \"status\": 200,\n    \"data\":{\n        \"userId\":\"skfj9s9\",\n        \"listId\":\"df8fs9\",\n        \"listTitle\":\"new edited tite of list\",\n        \"creatorId\":\"skfj9s9\",\n        \"modifierId\":\"\",\n        \"createdOn\":\"2021-09-12T26:42:58.000Z\",\n        \"modifiedOn\":\"\",\n        \"items\":[{\n            \"itemId\":\"jfiof89s9f\",\n            \"itemTitle\":\"edited item in a list\",\n            \"itemCreatedOn\":\"2021-09-12T26:42:58.000Z\",\n            \"itemCreatorId\":\"fjs9f9s\",\n            \"itemDone\":\"false\"\n        }]\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/itemRoute.js",
    "groupTitle": "item",
    "name": "PutApiV1ListItemItemidEdititemtitle"
  },
  {
    "group": "item",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/list/item/:itemId/markitem",
    "title": "api for marking item .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>id of item. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isDone",
            "description": "<p>to make item done and undone. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user. (body/query/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"item marked\",\n    \"status\": 200,\n    \"data\":{}\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/itemRoute.js",
    "groupTitle": "item",
    "name": "PutApiV1ListItemItemidMarkitem"
  },
  {
    "group": "item",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/list/item/:listId/addItem",
    "title": "api for adding item on a list.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>id of list on which new item is being created. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemTitle",
            "description": "<p>title of new item. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user. (body/query/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"item added to list\",\n    \"status\": 200,\n    \"data\":{\n        \"userId\":\"skfj9s9\",\n        \"listId\":\"df8fs9\",\n        \"listTitle\":\"new edited tite of list\",\n        \"creatorId\":\"skfj9s9\",\n        \"modifierId\":\"\",\n        \"createdOn\":\"2021-09-12T26:42:58.000Z\",\n        \"modifiedOn\":\"\",\n        \"items\":[{\n            \"itemId\":\"jfiof89s9f\",\n            \"itemTitle\":\"new item in a list\",\n            \"itemCreatedOn\":\"2021-09-12T26:42:58.000Z\",\n            \"itemCreatorId\":\"fjs9f9s\",\n            \"itemDone\":\"false\"\n        }]\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/itemRoute.js",
    "groupTitle": "item",
    "name": "PutApiV1ListItemListidAdditem"
  },
  {
    "group": "list",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/list/:listId/view",
    "title": "api for getting single list.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>id of list. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user. (body/query/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"list found\",\n    \"status\": 200,\n    \"data\":{\n        \"userId\":\"skfj9s9\",\n        \"listId\":\"df8fs9\",\n        \"listTitle\":\"new edited tite of list\",\n        \"creatorId\":\"skfj9s9\",\n        \"modifierId\":\"\",\n        \"createdOn\":\"2021-09-12T26:42:58.000Z\",\n        \"modifiedOn\":\"\",\n        \"items\":[]\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/listRoute.js",
    "groupTitle": "list",
    "name": "GetApiV1ListListidView"
  },
  {
    "group": "list",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/list/:userId/view/all",
    "title": "api for getting all list of user .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>id of user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listTitle",
            "description": "<p>title of new edited list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user. (body/query/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"All list of user found\",\n    \"status\": 200,\n    \"data\":[{\n        \"userId\":\"skfj9s9\",\n        \"listId\":\"df8fs9\",\n        \"listTitle\":\"new edited tite of list\",\n        \"creatorId\":\"skfj9s9\",\n        \"modifierId\":\"\",\n        \"createdOn\":\"2021-09-12T26:42:58.000Z\",\n        \"modifiedOn\":\"\",\n        \"items\":[]\n    }]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/listRoute.js",
    "groupTitle": "list",
    "name": "GetApiV1ListUseridViewAll"
  },
  {
    "group": "list",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/list/create",
    "title": "api for creating list.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listTitle",
            "description": "<p>title of new list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listCreatorId",
            "description": "<p>userId of user who create's new list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user. (body/query/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"new list created\",\n    \"status\": 200,\n    \"data\":{\n        \"userId\":\"skfj9s9\",\n        \"listId\":\"df8fs9\",\n        \"listTitle\":\"new tite of list\",\n        \"creatorId\":\"skfj9s9\",\n        \"modifierId\":\"\",\n        \"createdOn\":\"2021-09-12T26:42:58.000Z\",\n        \"modifiedOn\":\"\",\n        \"items\":[]\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/listRoute.js",
    "groupTitle": "list",
    "name": "PostApiV1ListCreate"
  },
  {
    "group": "list",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/list/:listId/delete",
    "title": "api for deleting list .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>id of list. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user. (body/query/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"list deleted\",\n    \"status\": 200,\n    \"data\":{}\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/listRoute.js",
    "groupTitle": "list",
    "name": "PostApiV1ListListidDelete"
  },
  {
    "group": "list",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/list/:listId/editTitle",
    "title": "api for editing list .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>id of list being edited. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listTitle",
            "description": "<p>title of new edited list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user. (body/query/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"list updated\",\n    \"status\": 200,\n    \"data\":{\n        \"userId\":\"skfj9s9\",\n        \"listId\":\"df8fs9\",\n        \"listTitle\":\"new edited tite of list\",\n        \"creatorId\":\"skfj9s9\",\n        \"modifierId\":\"\",\n        \"createdOn\":\"2021-09-12T26:42:58.000Z\",\n        \"modifiedOn\":\"\",\n        \"items\":[]\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/listRoute.js",
    "groupTitle": "list",
    "name": "PutApiV1ListListidEdittitle"
  },
  {
    "group": "subitem",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/list/item/subItem/:itemId/view",
    "title": "api for getting subitem of item.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>id of item . (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"subitem found\",\n    \"status\": 200,\n    \"data\":{\n        \"itemId\":\"kd8s9f\"\n        \"subItems\":{\n            \"subItemId\":\"dfs8fs8\",\n            \"subItemTitle\":\"edited subitem\",\n            \"creatorId\":\"dfkj3f9\",\n            \"createdOn\":\"2021-09-12T26:42:58.000Z\",\n            \"modifierId\":\"df9fs9f\",\n            \"modifiedOn\":\"2021-10-12T26:42:58.000Z\",\n            \"subItemDone\":\"true\"\n        }\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/subItemRoute.js",
    "groupTitle": "subitem",
    "name": "GetApiV1ListItemSubitemItemidView"
  },
  {
    "group": "subitem",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/list/item/subItem/:subItemId/delete",
    "title": "api for deleting subitem.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subItemId",
            "description": "<p>itemId of which subitem is being created. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>id of item to which this subitem belongs to. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"subitem deleted\",\n    \"status\": 200,\n    \"data\":{}\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/subItemRoute.js",
    "groupTitle": "subitem",
    "name": "PostApiV1ListItemSubitemSubitemidDelete"
  },
  {
    "group": "subitem",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/list/item/subItem/:itemId/addItem",
    "title": "api for adding subitem.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>itemId of which subitem is being created. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subItemTitle",
            "description": "<p>title of new subitem being created. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"subitem created\",\n    \"status\": 200,\n    \"data\":{\n        \"itemId\":\"kd8s9f\"\n        \"subItems\":{\n            \"subItemId\":\"dfs8fs8\",\n            \"subItemTitle\":\"edited subitem\",\n            \"creatorId\":\"dfkj3f9\",\n            \"createdOn\":\"2021-09-12T26:42:58.000Z\",\n            \"modifierId\":\"\",\n            \"modifiedOn\":\"\",\n            \"subItemDone\":\"false\"\n        }\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/subItemRoute.js",
    "groupTitle": "subitem",
    "name": "PutApiV1ListItemSubitemItemidAdditem"
  },
  {
    "group": "subitem",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/list/item/subItem/:subItemId/edit",
    "title": "api for updating subitem.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subItemId",
            "description": "<p>itemId of which subitem is being created. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subItemTitle",
            "description": "<p>new title of  subitem being edited. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>id of item to which this subitem belongs to. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "modifierId",
            "description": "<p>userId of user editing subitem. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"subitem updated\",\n    \"status\": 200,\n    \"data\":{\n        \"itemId\":\"kd8s9f\"\n        \"subItems\":{\n            \"subItemId\":\"dfs8fs8\",\n            \"subItemTitle\":\"edited subitem\",\n            \"creatorId\":\"dfkj3f9\",\n            \"createdOn\":\"2021-09-12T26:42:58.000Z\",\n            \"modifierId\":\"df9fs9f\",\n            \"modifiedOn\":\"2021-10-12T26:42:58.000Z\",\n            \"subItemDone\":\"true\"\n        }\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/subItemRoute.js",
    "groupTitle": "subitem",
    "name": "PutApiV1ListItemSubitemSubitemidEdit"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/user/:userId/view",
    "title": "api for getting user details.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"User Details Found\",\n    \"status\": 200,\n    \"data\": {\n        \"createdOn\": \"2021-09-12T26:42:58.000Z\",\n        \"email\": \"nomail@gmail.com\",\n        \"mobileNumber\": \"91 7840962887\",\n        \"countryName\": \"India\",\n        \"lastName\": \"sharma\",\n        \"firstName\": \"govind\",\n        \"userId\": \"B1cyuc8OX\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/userRoute.js",
    "groupTitle": "user",
    "name": "GetApiV1UserUseridView"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/user/:userId/view/friendrequests",
    "title": "api for getting all friend requests.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"All receiver request found\",\n    \"status\": 200,\n    \"data\":[\n        {\n            friendId:\"sf7fsf9\",\n            friendName:\"namegame\"\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/userRoute.js",
    "groupTitle": "user",
    "name": "GetApiV1UserUseridViewFriendrequests"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/user/view/all",
    "title": "api for Getting all users.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"All User Details Found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"createdOn\": \"2020-09-16T13:33:58.000Z\",\n            \"email\": \"nomail@gmail.com\",\n            \"mobileNumber\": \"91 7840962887\",\n            \"countryName\": \"India\",\n            \"lastName\": \"sharma\",\n            \"firstName\": \"govind\",\n            \"userId\": \"dfjsh8sdfyf\"\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/userRoute.js",
    "groupTitle": "user",
    "name": "GetApiV1UserViewAll"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/user/accept/friend/request",
    "title": "api for accepting friend request.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "senderId",
            "description": "<p>userId of user who sent request. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "receiverId",
            "description": "<p>userId of the request receiver. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "senderName",
            "description": "<p>name of user who sent sender. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "receiverName",
            "description": "<p>name of the request receiver. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"friend request accepted\",\n    \"status\": 200,\n    \"data\":null\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/userRoute.js",
    "groupTitle": "user",
    "name": "PostApiV1UserAcceptFriendRequest"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/user/:email/forgotpassword",
    "title": "api for login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"reset password successfull\",\n\"status\": 200,\n\"data\": \n}\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/userRoute.js",
    "groupTitle": "user",
    "name": "PostApiV1UserEmailForgotpassword"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/user/signin",
    "title": "api for login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"login successfull\",\n\"status\": 200,\n\"data\": {\n        \"authToken\": \"32kjciOiJIsdkfjkjfkej9eu93u32oir6MTUzODgxNzIzNDUzNCwiZXhwIjskdfj89ds89f\",\n        \"userDetails\": {\n            \"friendRequestSent\": [],\n            \"friendRequestRecieved\": [],\n            \"friends\": [],\n            \"email\": \"gomail@gmail.com\",\n            \"mobileNumber\": \"91 7840962887\",\n            \"countryName\": \"india\",\n            \"lastName\": \"sharma\",\n            \"firstName\": \"roshan\",\n            \"userId\": \"389ejh7\"\n    }\n}\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/userRoute.js",
    "groupTitle": "user",
    "name": "PostApiV1UserSignin"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/user/signup",
    "title": "api for Registering User.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>First Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastname",
            "description": "<p>Last Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "countryName",
            "description": "<p>country Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Mobile Number of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"User Created\",\n\"status\": 200,\n\"data\": [\n    {\n        \"createdOn\": \"2020-03-12T16:42:58.000Z\",\n        \"email\": \"gomail@gmail.com\",\n        \"mobileNumber\": \"91 7384756357\",\n        \"countryName\": \"India\",\n        \"firstName\": \"phurba\",\n        \"lastName\": \"sherpa\",\n        \"userId\": \"B1cyuc8OX\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/userRoute.js",
    "groupTitle": "user",
    "name": "PostApiV1UserSignup"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/:userId/logout",
    "title": "api to logout .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Logged Out Successfully\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/userRoute.js",
    "groupTitle": "user",
    "name": "PostApiV1UsersUseridLogout"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/user/request/friend",
    "title": "api for sending friend request.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "senderId",
            "description": "<p>userId of the sender. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "receiverId",
            "description": "<p>userId of the receiver. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "senderName",
            "description": "<p>name of the sender. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "receiverName",
            "description": "<p>name of the receiver. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"friend request sent\",\n    \"status\": 200,\n    \"data\":\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/userRoute.js",
    "groupTitle": "user",
    "name": "PutApiV1UserRequestFriend"
  }
] });
