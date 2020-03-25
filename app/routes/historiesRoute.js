const authMiddleware = require('../middleware/authMiddleware');
const appConfig = require('../../appConfig');
const historiesController = require('../controller/historiesController')

let setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/histories`;
    //adding new history
    //params-
    app.post(`${baseUrl}/add`, authMiddleware.isAuthorized, historiesController.addHistory);
    /**
     * @apiGroup history
     * @apiVersion  1.0.0
     * @api {post} /api/v1/histories/add api for adding to history .
     *
     * @apiParam {string} userId id of user of whose list/item/subitem is manipulated. (body params) (required)
     * @apiParam {string} category defines type of history(eg. list-add/list-edit/list-delete). (body params) (required)
     * @apiParam {string} message defines meaning of history. (body params) (optional)
     * @apiParam {string} itemId id of item. (body params) (optional)
     * @apiParam {string} subItemId id subItem which is manipulated. (body params) (optonal)
     * @apiParam {string} authToken authToken of user. (body/query/header params) (required)

     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "history created",
            "status": 200,
            "data":{}
        }
    */

    app.get(`${baseUrl}/:userId/view/all`, authMiddleware.isAuthorized, historiesController.getAllHistoryOfUser)
    /**
     * @apiGroup history
     * @apiVersion  1.0.0
     * @api {get} /api/v1/histories/:userId/view/all api for getting all histories of user .
     *
     * @apiParam {string} userId id of user  (query params) (required)
     * @apiParam {string} authToken authToken of user. (body/query/header params) (required)

     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "histories found",
            "status": 200,
            "data":{}
        }
    */

    app.post(`${baseUrl}/:userId/delete`, authMiddleware.isAuthorized, historiesController.deleteHistoryOfUser)
    /**
    * @apiGroup history
    * @apiVersion  1.0.0
    * @api {post} /api/v1/histories/:userId/delete api for deleting histories of user .
    *
    * @apiParam {string} userId id of user  (query params) (required)
    * @apiParam {string} authToken authToken of user. (body/query/header params) (required)

    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
       {
           "error": false,
           "message": "history deleted",
           "status": 200,
           "data":{}
       }
   */
}

module.exports =
    {
        setRouter: setRouter
    }