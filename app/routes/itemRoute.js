const authMiddleware = require('../middleware/authMiddleware');
const itemController = require('../controller/itemController')

let setRouter = (app) => {
    //route for adding item to a list
    //params-->listId
    //body-->itemTitle
    app.put(`${baseUrl}/:listId/addItem`, authMiddleware.isAuthorized, itemController.addItemToList);
}

module.exports={
    setRouter
}
