const mongoose = require('mongoose')
const logger = require('../libs/loggerLib');
const response = require('../libs/responseLib');
const shortId = require('shortid');
const timeLib = require('../libs/timeLib');
const checkLib = require('../libs/checkLib')

const listModel = mongoose.model('List')

let apiResponse;

let createList = (req, res) => {

    //checking if listTitle is provided,if not ,then reject it
    let validateInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.listTitle && req.body.listCreatorId && req.body.userId) {
                resolve(req)
            }
            else {
                apiResponse = response.generate(true, 'one or more parameter is missing', 400, null);
                reject(apiResponse)
            }
        })
    }//end of validate input

    //saving new list on db after validation
    let saveList = () => {
        return new Promise((resolve, reject) => {
            let newList = new listModel({
                userId:req.body.userId,
                listId: shortId.generate(),
                listTitle: req.body.listTitle,
                listCreatorId: req.body.listCreatorId,
                listCreatedOn: timeLib.now()
            });

            //mongoose save function
            newList.save((err, result) => {
                if (err) {
                    logger.error('error while creating new list', 'createList:saveList', 10);
                    apiResponse = response.generate(true, 'Error while creating new list', 500, null);
                    reject(apiResponse)
                }
                else {
                    //converting mongoose object to javascript object to delete _id and __v from mongoose
                    let resultObj = result.toObject();

                    delete resultObj._id;
                    delete resultObj.__v;

                    apiResponse = response.generate(false, 'New list created', 200, resultObj);
                    resolve(apiResponse)
                }
            })
        })
    }//end of saving new list

    validateInput(req, res)
        .then(saveList)
        .then((resolve) => {
            res.send(resolve)
        })
        .catch((error) => {
            res.send(error)
        })

}//end of creating new list

//controller to edit list
let editListTitle = (req, res) => {

    //checking if list with provided list id is present or not
    let findListDetails = () => {
        return new Promise((resolve, reject) => {
            listModel.findOne({ 'listId': req.params.listId })
                .exec((err, ListDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'List Controller: findListDetails', 10)
                        apiResponse = response.generate(true, 'Failed To Find List Details', 500, null)
                        reject(apiResponse)
                    } else if (checkLib.isEmpty(ListDetails)) {
                        logger.info('No List Found', 'List  Controller:findListDetails')
                        apiResponse = response.generate(true, 'No List Found', 404, null)
                        reject(apiResponse)
                    } else {
                        resolve(req)
                    }
                })
        })
    }// end findListdetails

    //now edit list
    let editListAfterValidation = () => {
        return new Promise((resolve, reject) => {
            let options = req.body;
            options.listModifiedOn = timeLib.now();
            options.listModifierId = req.user.userId;//userid of modifier

            listModel.update({ 'listId': req.params.listId }, options, (err, res) => {
                if (err) {
                    logger.error('error while updating list Title', 'ListController:editListAfterValidation', 10);
                    apiResponse = response.generate(true, 'Error while updating list Title', 500, null);
                    reject(apiResponse)
                }
                else {
                    apiResponse = response.generate(false, 'List Title updated', 200, res);
                    resolve(apiResponse)
                }
            })
        })
    }

    //promises
    findListDetails(req, res)
        .then(editListAfterValidation)
        .then((resolve) => {
            res.send(resolve)
        })
        .catch((error) => {
            res.send(error)
        })//end of promises
}//end of edit list controller

//controller function for getting all list
let getAllListOfUser = (req, res) => {
    let validateInput = () => {
        return new Promise((resolve, reject) => {
            if (req.params.userId) {
                resolve(req)
            }
            else {
                logger.error('userid is not provided', 'listcontroller:getalllistofuser', 10);
                apiResponse = response.generate(true, 'userid is not provided', 400, null)
                reject(apiResponse)
            }
        })

    }

    let getAllList = () => {
        return new Promise((resolve, reject) => {
            listModel.find({ 'userId': req.params.userId })
                .select('-_id -__v')
                .exec((err, result) => {
                    if (err) {
                        logger.error(true, 'ListController:getAllListOfUser', 10)
                        apiResponse = response.generate(true, 'failed to find list of user', 500, null);
                        reject(apiResponse)
                    }
                    else if (checkLib.isEmpty(res)) {
                        logger.info('no list found', 'ListController:getAllListOfUser', 1);
                        apiResponse = response.generate(true, 'No list Found', 404, result);
                        reject(apiResponse)
                    }
                    else {
                        apiResponse = response.generate(false, 'All list of user found', 200, result);
                        resolve(apiResponse)
                    }
                })
        })
    }

    validateInput(req, res)
        .then(getAllList)
        .then((resolve) => {
            res.send(resolve)
        })
        .catch((err) => {
            res.send(err)
        })

}

let deleteList = (req, res) => {
    //validate list id 
    let validateListId = () => {
        return new Promise((resolve, reject) => {
            if (req.params.listId) {
                //if listId is present than resolve req
                resolve(req)
            }
            else {
                logger.error('listId not provided', 'ListController:deleteList', 10);
                apiResponse = response.generate(true, 'listId not provided', 400, null);
                reject(apiResponse)
            }
        })
    }//end of validateListId

    //delete list with given listId
    let deleteListAfterValidation = () => {
        return new Promise((resolve, reject) => {
            listModel.findOneAndRemove({ 'listId': req.params.listId }, (err, result) => {
                if (err) {
                    logger.error('Error while deleting list', 'Listcontroller:deleteList', 10);
                    apiResponse = response.generate(true, 'error while deleting list', 400, null);
                    reject(apiResponse)
                }
                else if (checkLib.isEmpty(result)) {
                    logger.error('No list found', 'ListController:deleteList', 5);
                    apiResponse = response.generate(true, 'No list found', 404, null);
                    reject(apiResponse)
                }
                else {
                    logger.info('list deleted', 'listController:deleteList', 5);
                    apiResponse = response.generate(false, 'list deleted', 200, result);
                    resolve(apiResponse)
                }
            })
        })
    }

    validateListId(req, res)
        .then(deleteListAfterValidation)
        .then((resolve) => {
            res.send(resolve)
        })
        .catch((err) => {
            res.send(err)
        })
}

//get list by id
let getListById = (req, res) => {
    //validate list id 
    let validateListId = () => {
        return new Promise((resolve, reject) => {
            if (req.params.listId) {
                //if listId is present than resolve req
                resolve(req)
            }
            else {
                logger.error('listId not provided', 'ListController:deleteList', 10);
                apiResponse = response.generate(true, 'listId not provided', 400, null);
                reject(apiResponse)
            }
        })
    }//end of validateListId

    //getting list with provided listId
    let getList = () => {
        return new Promise((resolve, reject) => {
            listModel.findOne({ 'listId': req.params.listId })
                .select('-_id -__v')
                .exec((err, result) => {
                    if (err) {
                        logger.error('Error while getting list', 'Listcontroller:getListById', 10);
                        apiResponse = response.generate(true, 'error while getting list', 400, null);
                        reject(apiResponse)
                    }
                    else if (checkLib.isEmpty(result)) {
                        logger.error('No list found', 'ListController:getListById', 5);
                        apiResponse = response.generate(true, 'No list found', 404, null);
                        reject(apiResponse)
                    }
                    else {
                        logger.info('list found', 'listController:getListById', 5);
                        apiResponse = response.generate(false, 'list found', 200, result);
                        resolve(apiResponse)
                    }
                })
        })
    }

    validateListId(req, res)
        .then(getList)
        .then((resolve) => {
            res.send(resolve)
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports = {
    createList,
    editListTitle,
    getAllListOfUser,
    deleteList,
    getListById
}