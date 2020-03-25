const appconfig = require('../../appConfig');
const listController = require('../controller/listController');
const authMiddleware = require('../middleware/authMiddleware');

let setRouter = (app)=>
{
    const baseUrl = `${appconfig.apiVersion}/list`;

    //route to create list
    //body--listCreatorId,listTitle,userId(userId of user to whom this list belongs to)
    app.post(`${baseUrl}/create`,authMiddleware.isAuthorized, listController.createList);
    /**
     * @apiGroup list
     * @apiVersion  1.0.0
     * @api {post} /api/v1/list/create api for creating list.
     *
     * @apiParam {string} listTitle title of new list. (body params) (required)
     * @apiParam {string} listCreatorId userId of user who create's new list. (body params) (required)
     * @apiParam {string} userId userId of user. (body params) (required)
     * @apiParam {string} authToken authToken of user. (body/query/header params) (required)

     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "new list created",
            "status": 200,
            "data":{
                "userId":"skfj9s9",
                "listId":"df8fs9",
                "listTitle":"new tite of list",
                "creatorId":"skfj9s9",
                "modifierId":"",
                "createdOn":"2021-09-12T26:42:58.000Z",
                "modifiedOn":"",
                "items":[]
            }
        }
    */

    //edit route for list
    //body param--listTitle
    app.put(`${baseUrl}/:listId/editTitle`,authMiddleware.isAuthorized,listController.editListTitle);
    /**
     * @apiGroup list
     * @apiVersion  1.0.0
     * @api {put} /api/v1/list/:listId/editTitle api for editing list .
     *
     * @apiParam {string} listId id of list being edited. (query params) (required)
     * @apiParam {string} listTitle title of new edited list. (body params) (required)
     * @apiParam {string} authToken authToken of user. (body/query/header params) (required)

     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "list updated",
            "status": 200,
            "data":{
                "userId":"skfj9s9",
                "listId":"df8fs9",
                "listTitle":"new edited tite of list",
                "creatorId":"skfj9s9",
                "modifierId":"",
                "createdOn":"2021-09-12T26:42:58.000Z",
                "modifiedOn":"",
                "items":[]
            }
        }
    */

    //route for getting all the list of a user
    //only params is auth
    app.get(`${baseUrl}/:userId/view/all`,authMiddleware.isAuthorized,listController.getAllListOfUser);
     /**
     * @apiGroup list
     * @apiVersion  1.0.0
     * @api {get} /api/v1/list/:userId/view/all api for getting all list of user .
     *
     * @apiParam {string} userId id of user. (query params) (required)
     * @apiParam {string} listTitle title of new edited list. (body params) (required)
     * @apiParam {string} authToken authToken of user. (body/query/header params) (required)

     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "All list of user found",
            "status": 200,
            "data":[{
                "userId":"skfj9s9",
                "listId":"df8fs9",
                "listTitle":"new edited tite of list",
                "creatorId":"skfj9s9",
                "modifierId":"",
                "createdOn":"2021-09-12T26:42:58.000Z",
                "modifiedOn":"",
                "items":[]
            }]
        }
    */

    //route for deleting list
    app.post(`${baseUrl}/:listId/delete`,authMiddleware.isAuthorized, listController.deleteList);
    /**
     * @apiGroup list
     * @apiVersion  1.0.0
     * @api {post} /api/v1/list/:listId/delete api for deleting list .
     *
     * @apiParam {string} listId id of list. (query params) (required)
     * @apiParam {string} authToken authToken of user. (body/query/header params) (required)

     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "list deleted",
            "status": 200,
            "data":{}
        }
    */

    //route to get single list by listId
    app.get(`${baseUrl}/:listId/view`,authMiddleware.isAuthorized,listController.getListById);
    /**
     * @apiGroup list
     * @apiVersion  1.0.0
     * @api {get} /api/v1/list/:listId/view api for getting single list.
     *
     * @apiParam {string} listId id of list. (query params) (required)
     * @apiParam {string} authToken authToken of user. (body/query/header params) (required)

     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "list found",
            "status": 200,
            "data":{
                "userId":"skfj9s9",
                "listId":"df8fs9",
                "listTitle":"new edited tite of list",
                "creatorId":"skfj9s9",
                "modifierId":"",
                "createdOn":"2021-09-12T26:42:58.000Z",
                "modifiedOn":"",
                "items":[]
            }
        }
    */

}

module.exports={
    setRouter
}