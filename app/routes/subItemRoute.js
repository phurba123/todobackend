const authMiddleware = require('../middleware/authMiddleware');
const subItemController = require('../controller/subItemController')
const appconfig = require('../../appConfig')

let setRouter = (app) => {

    const baseUrl = `${appconfig.apiVersion}/list/item/subItem`;
    
    //route for adding subItem to item
    //params-->itemId
    //body-->subItemTitle
    app.put(`${baseUrl}/:itemId/addItem`, authMiddleware.isAuthorized, subItemController.addSubItem);
    /**
     * @apiGroup subitem
     * @apiVersion  1.0.0
     * @api {put} /api/v1/list/item/subItem/:itemId/addItem api for adding subitem.
     *
     * @apiParam {string} itemId itemId of which subitem is being created. (query params) (required)
     * @apiParam {string} subItemTitle title of new subitem being created. (body params) (required)
     * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)

     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "subitem created",
            "status": 200,
            "data":{
                "itemId":"kd8s9f"
                "subItems":{
                    "subItemId":"dfs8fs8",
                    "subItemTitle":"edited subitem",
                    "creatorId":"dfkj3f9",
                    "createdOn":"2021-09-12T26:42:58.000Z",
                    "modifierId":"",
                    "modifiedOn":"",
                    "subItemDone":"false"
                }
            }
        }
    */

    //edit item title by its id
    //param--subItemId
    //body-->subItemTitle,modifierId,itemId,authToken
    app.put(`${baseUrl}/:subItemId/edit`, authMiddleware.isAuthorized, subItemController.editSubItemTitle);
     /**
     * @apiGroup subitem
     * @apiVersion  1.0.0
     * @api {put} /api/v1/list/item/subItem/:subItemId/edit api for updating subitem.
     *
     * @apiParam {string} subItemId itemId of which subitem is being created. (query params) (required)
     * @apiParam {string} subItemTitle new title of  subitem being edited. (body params) (required)
     * @apiParam {string} itemId id of item to which this subitem belongs to. (body params) (required)
     * @apiParam {string} modifierId userId of user editing subitem. (body params) (required)
     * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)

     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "subitem updated",
            "status": 200,
            "data":{
                "itemId":"kd8s9f"
                "subItems":{
                    "subItemId":"dfs8fs8",
                    "subItemTitle":"edited subitem",
                    "creatorId":"dfkj3f9",
                    "createdOn":"2021-09-12T26:42:58.000Z",
                    "modifierId":"df9fs9f",
                    "modifiedOn":"2021-10-12T26:42:58.000Z",
                    "subItemDone":"true"
                }
            }
        }
    */

    //delete subitem
    //param--subitemId
    //body--auth,itemId
    app.post(`${baseUrl}/:subItemId/delete`, authMiddleware.isAuthorized, subItemController.deleteSubItemById);
    /**
     * @apiGroup subitem
     * @apiVersion  1.0.0
     * @api {post} /api/v1/list/item/subItem/:subItemId/delete api for deleting subitem.
     *
     * @apiParam {string} subItemId itemId of which subitem is being created. (query params) (required)
     * @apiParam {string} itemId id of item to which this subitem belongs to. (body params) (required)
     * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)

     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "subitem deleted",
            "status": 200,
            "data":{}
            }
        }
    */

    //params--itemId
    app.get(`${baseUrl}/:itemId/view`,authMiddleware.isAuthorized,subItemController.getSubItemsofItem)
    /**
     * @apiGroup subitem
     * @apiVersion  1.0.0
     * @api {get} /api/v1/list/item/subItem/:itemId/view api for getting subitem of item.
     *
     * @apiParam {string} itemId id of item . (query params) (required)
     * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)

     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "subitem found",
            "status": 200,
            "data":{
                "itemId":"kd8s9f"
                "subItems":{
                    "subItemId":"dfs8fs8",
                    "subItemTitle":"edited subitem",
                    "creatorId":"dfkj3f9",
                    "createdOn":"2021-09-12T26:42:58.000Z",
                    "modifierId":"df9fs9f",
                    "modifiedOn":"2021-10-12T26:42:58.000Z",
                    "subItemDone":"true"
                }
            }
        }
    */
}

module.exports = {
    setRouter
}