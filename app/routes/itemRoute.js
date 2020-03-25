const authMiddleware = require('../middleware/authMiddleware');
const itemController = require('../controller/itemController');
const appconfig = require('../../appConfig')

let setRouter = (app) => {

    const baseUrl = `${appconfig.apiVersion}/list/item`;
    //route for adding item to a list
    //params-->listId
    //body-->itemTitle
    app.put(`${baseUrl}/:listId/addItem`, authMiddleware.isAuthorized, itemController.addItemToList);
    /**
     * @apiGroup item
     * @apiVersion  1.0.0
     * @api {put} /api/v1/list/item/:listId/addItem api for adding item on a list.
     *
     * @apiParam {string} listId id of list on which new item is being created. (query params) (required)
     * @apiParam {string} itemTitle title of new item. (body params) (required)
     * @apiParam {string} authToken authToken of user. (body/query/header params) (required)

     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "item added to list",
            "status": 200,
            "data":{
                "userId":"skfj9s9",
                "listId":"df8fs9",
                "listTitle":"new edited tite of list",
                "creatorId":"skfj9s9",
                "modifierId":"",
                "createdOn":"2021-09-12T26:42:58.000Z",
                "modifiedOn":"",
                "items":[{
                    "itemId":"jfiof89s9f",
                    "itemTitle":"new item in a list",
                    "itemCreatedOn":"2021-09-12T26:42:58.000Z",
                    "itemCreatorId":"fjs9f9s",
                    "itemDone":"false"
                }]
            }
        }
    */

    //edit item title by its id
    //param--itemId
    //body-->itemTitle
    app.put(`${baseUrl}/:itemId/editItemTitle`,authMiddleware.isAuthorized,itemController.editItemTitle);
    /**
     * @apiGroup item
     * @apiVersion  1.0.0
     * @api {put} /api/v1/list/item/:itemId/editItemTitle api for editing item .
     *
     * @apiParam {string} itemId id of item. (query params) (required)
     * @apiParam {string} itemTitle new title of  item. (body params) (required)
     * @apiParam {string} authToken authToken of user. (body/query/header params) (required)

     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "item updated",
            "status": 200,
            "data":{
                "userId":"skfj9s9",
                "listId":"df8fs9",
                "listTitle":"new edited tite of list",
                "creatorId":"skfj9s9",
                "modifierId":"",
                "createdOn":"2021-09-12T26:42:58.000Z",
                "modifiedOn":"",
                "items":[{
                    "itemId":"jfiof89s9f",
                    "itemTitle":"edited item in a list",
                    "itemCreatedOn":"2021-09-12T26:42:58.000Z",
                    "itemCreatorId":"fjs9f9s",
                    "itemDone":"false"
                }]
            }
        }
    */

    //delete item by itemId
    //param--itemId
    //body--listId
    app.post(`${baseUrl}/:itemId/deleteItem`,authMiddleware.isAuthorized,itemController.deleteItemById);
    /**
     * @apiGroup item
     * @apiVersion  1.0.0
     * @api {post} /api/v1/list/item/:itemId/deleteItem api for editing item .
     *
     * @apiParam {string} itemId id of item. (query params) (required)
     * @apiParam {string} listId listid of list to which this item belongs to. (body params) (required)
     * @apiParam {string} authToken authToken of user. (body/query/header params) (required)

     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "item deleted",
            "status": 200,
            "data":{}
        }
    */

    //params--itemId
    //body--isDone(boolean)
    app.put(`${baseUrl}/:itemId/markitem`,authMiddleware.isAuthorized,itemController.markItemAsDoneAndUndone)
    /**
     * @apiGroup item
     * @apiVersion  1.0.0
     * @api {put} /api/v1/list/item/:itemId/markitem api for marking item .
     *
     * @apiParam {string} itemId id of item. (query params) (required)
     * @apiParam {boolean} isDone to make item done and undone. (body params) (required)
     * @apiParam {string} authToken authToken of user. (body/query/header params) (required)

     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "item marked",
            "status": 200,
            "data":{}
        }
    */
}

module.exports={
    setRouter
}
