const mongoose = require('mongoose')
const logger = require('../libs/loggerLib');
const response = require('../libs/responseLib');
const shortId = require('shortid');
const timeLib = require('../libs/timeLib');
const checkLib = require('../libs/checkLib')

let listModel = mongoose.model('List');

let apiResponse;

//controller for adding item to a list
let addItemToList = (req, res) => {
    //validate provided listId as a urlParams
    let validateListId = () => {
        return new Promise((resolve, reject) => {
            listModel.findOne({ 'listId': req.params.listId }, (err, result) => {
                if (err) {
                    logger.error('error while valildating list id', 'addItemToList', 10);
                    apiResponse = response.generate(true, 'Error while validating listId', 400, null);
                    reject(apiResponse)
                }
                else if (checkLib.isEmpty(result)) {
                    apiResponse = response.generate(true, 'no list found for given listId', 404, null);
                    reject(apiResponse)
                }
                else {
                    //if list found than resolve req with listId
                    resolve(req)
                }
            })
        })
    }//end of validate ListId

    //validate item title,do not want to store empty item
    let validateItemTitle = () => {
        return new Promise((resolve, reject) => {
            if (checkLib.isEmpty(req.body.itemTitle)) {
                logger.error('item Title is not valid', 'validateItemTitle', 10);
                apiResponse = response.generate(true, 'item Title not valid', 400, null);
                reject(apiResponse)
            }
            else {
                resolve(req)
            }
        })
    }

    //add item to a given listId
    let addItem = () => {

        return new Promise((resolve, reject) => {

            let ItemOptions = {
                itemId: shortId.generate(),
                itemTitle: req.body.itemTitle,
                itemCreatorId: req.user.userId,
                itemCreatedOn: timeLib.now()
            }

            //using push method for inserting onto array
            let options = {
                $push: {
                    items: {
                        $each: [ItemOptions]
                    }
                }
            }

            //now add item to list
            listModel.updateOne({ 'listId': req.params.listId }, options)
                .exec((err, result) => {
                    if (err) {
                        logger.error('Error while adding item to list', 'addItemToList:addItem', 10);
                        apiResponse = response.generate(true, 'Error while adding item to list', 500, null);
                        reject(apiResponse)
                    }
                    else {
                        logger.info('item added', 'addItemToList', 5);
                        apiResponse = response.generate(false, 'item added to list', 200, result);
                        resolve(apiResponse)
                    }
                })
        })

    }

    validateListId(req, res)
        .then(validateItemTitle)
        .then(addItem)
        .then((resolve) => {
            //console.log('resolve : ', resolve)
            res.send(resolve)

        })
        .catch((error) => {
            res.send(error)
        })
}//end of adding item to a list

//editing item title by its itemId
let editItemTitle = (req, res) => {
    //validate provided itemId as a urlParams
    let validateItemId = () => {
        return new Promise((resolve, reject) => {
            listModel.findOne({ 'items.itemId': req.params.itemId }, (err, result) => {
                if (err) {
                    logger.error('error while valildating item id', 'editItemTitle', 10);
                    apiResponse = response.generate(true, 'Error while validating itemId', 400, null);
                    reject(apiResponse)
                }
                else if (checkLib.isEmpty(result)) {
                    console.log('result :: ', result)
                    apiResponse = response.generate(true, 'no item found for given itemId', 404, null);
                    reject(apiResponse)
                }
                else {
                    //if list found than resolve req with listId
                    resolve(req)
                }
            })
        })
    }//end of validate itemId  

    //now edit item
    let editItemAfterValidation = () => {
        return new Promise((resolve, reject) => {

            //To update the item in list model we will use set method of array
            let options = {
                $set: {
                    "items.$.itemTitle": req.body.itemTitle,
                    "items.$.itemModifierId": req.user.userId,
                    "items.$.itemModifiedOn": timeLib.now(),
                }
            }

            //listId associated with itemId
            listModel.update({ 'items.itemId': req.params.itemId }, options, (err, res) => {
                if (err) {
                    logger.error('error while updating item Title', 'ListController:editItemAfterValidation', 10);
                    apiResponse = response.generate(true, 'Error while updating item Title', 500, null);
                    reject(apiResponse)
                }
                else {
                    apiResponse = response.generate(false, 'item Title updated', 200, res);
                    resolve(apiResponse)
                }
            })
        })
    }//end of editItemAfterValidation

    //promises
    validateItemId(req, res)
        .then(editItemAfterValidation)
        .then((resolve) => {
            res.send(resolve)
        })
        .catch((error) => {
            res.send(error)
        })//end of promises
}//end of item title

//for deleting item in a list
let deleteItemById = (req, res) => {
    //validate itemId
    let validateInputs = () => {

        return new Promise((resolve, reject) => {
            listModel.findOne({'listId':req.body.listId ,'items.itemId': req.params.itemId }, (err, result) => {
                if (err) {
                    logger.error('error while valildating inputs', 'itemController:deleteItemById', 10);
                    apiResponse = response.generate(true, 'Error while validating inputs', 400, null);
                    reject(apiResponse)
                }
                else if (checkLib.isEmpty(result)) {
                    console.log('result :: ', result)
                    apiResponse = response.generate(true, 'no item found for given listId and itemId', 404, null);
                    reject(apiResponse)
                }
                else {
                    //if list found than resolve req with listId
                    resolve(req)
                }
            })
        })
    }//end of validate itemId  

    //delete item with given itemId
    let deleteItem = () => {
        return new Promise((resolve, reject) => {

            //To delete the item from list model we will use pull method of array

            let options = {
                $pull: {
                    items: {
                        itemId: req.params.itemId
                    }
                }
            }

            // options.listModifiedOn = time.now()
            // options.listModifierId = req.user.userId

                listModel.updateOne({ 'listId': req.body.listId }, options).exec((err, result) => {
                    if (err) {
                        console.log(err)
                        logger.error('error while deleting item', 'ItemController:deleteItem', 10)
                        apiResponse = response.generate(true, 'error while deleting item', 500, null)
                        reject(apiResponse)
                    } else if (checkLib.isEmpty(result)) {
                        logger.info('No list Found', 'ItemController:deleteItem')
                        apiResponse = response.generate(true, 'No list Found', 404, null)
                        reject(apiResponse)
                    } else {
                        apiResponse = response.generate(false, 'item deleted', 200, result)
                        resolve(apiResponse)
                    }
                });// end list model update
        })
    }

    validateInputs(req, res)
        .then(deleteItem)
        .then((resolve) => {
            console.log('resolve ',resolve)
            res.send(resolve)
        })
        .catch((err) => {
            res.send(err)
        })

}

module.exports = {
    addItemToList,
    editItemTitle,
    deleteItemById
}