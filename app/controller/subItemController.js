const logger = require('../libs/loggerLib')
const response = require('../libs/responseLib');
const shortId = require('shortid')
const timeLib = require('../libs/timeLib');
const mongoose = require('mongoose');
const checkLib = require('../libs/checkLib')

const subItemModel = mongoose.model('subItem');
const listModel = mongoose.model('List')

let apiResponse;

let addSubItem = (req, res) => {
    //validating user input
    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.params.itemId && req.body.subItemTitle) {
                resolve(req)
            }
            else {
                logger.error('One or more parameters are missing', 'subitemcontroller:addsubitem', 10);
                apiResponse = response.generate(true, 'one or more parameters are missing', 400, null);
                reject(apiResponse)
            }
        })
    }//end of validating user input

    //check if item with provide itemId is present or not,user should only be able to create subitem ,
    //if item is already created
    let validateItemId = (req, res) => {
        return new Promise((resolve, reject) => {
            listModel.findOne({ "items": { $elemMatch: { itemId: req.params.itemId } } })
                .exec((err, result) => {
                    if (err) {
                        logger.error('error while validating itemId', 'subitemcontroller:validateitemId', 10);
                        apiResponse = response.generate(true, 'error while validating itemId', 500, null)
                        reject(apiResponse)
                    }
                    else if (checkLib.isEmpty(result)) {
                        logger.error('itemId not found', 'subitemcontroller:validateItemId', 5);
                        apiResponse = response.generate(true, 'itemId not found', 404, null)
                        reject(apiResponse)
                    }
                    else {
                        resolve(req)
                    }
                })
        })

    }

    //adding subitem after validating
    let addingSubitem = () => {
        return new Promise((resolve, reject) => {
            let subItem =
            {
                subItemId: shortId.generate(),
                subItemTitle: req.body.subItemTitle,
                subItemCreatorId: req.user.userId,
                subItemCreatedOn: timeLib.now()
            }

            let option =
            {
                $push: {
                    subItems: {
                        $each: [subItem]
                    }
                }
            };

            option.itemId = req.params.itemId

            console.log(option);

            //if subitem with given itemId is present,then update subitemmodel with new subitem,
            //if not ,than create new()
            subItemModel.findOne({ 'itemId': req.params.itemId }).exec((err, result) => {
                if (err) {
                    logger.error('error while finding itemId on subitem model', 'subitemcontroller:addingsubitem', 10);
                    apiResponse = response.generate(true, 'error while finding subItem', 400, null);
                    reject(apiResponse)
                }
                else if (checkLib.isEmpty(result)) {
                    //given itemId doesn't have any subitem yet,create new subitem
                    let data = new subItemModel({
                        itemId: req.params.itemId,
                        subItems: {
                            subItemId: shortId.generate(),
                            subItemTitle: req.body.subItemTitle,
                            subItemCreatorId: req.user.userId,
                            subItemCreatedOn: timeLib.now()
                        }
                    })

                    data.save((err, result) => {
                        if (err) {
                            logger.error('Error while creating new subitem', 'subitemcontroller:addingsubitem', 10);
                            apiResponse = response.generate(true, 'error while creating new subitem', 400, null);
                            reject(apiResponse)
                        }
                        else {
                            logger.info('new subitem created', 'subitemcontroller:addingsubitem', 5);

                            // passing data as null because it has two possibilities by creating and updating
                            apiResponse = response.generate(false, 'New subitem created', 200, null);
                            resolve(apiResponse)
                        }
                    })//end of creating new subitem
                }
                else {
                    //if subitem is already created ,than update subitem
                    subItemModel.updateOne({ 'itemId': req.params.itemId }, option).exec((err, result) => {
                        if (err) {
                            logger.error('error while creating subitem', 'subitemcontroller:addingsubitem', 10)
                            apiResponse = response.generate(true, 'error while creating subitem', 400, null);
                            reject(apiResponse)
                        }
                        else {
                            logger.info('subitem created', 'subitemcontroller:addingsubitem', 5);
                            // passing data as null because it has two possibilities by creating and updating
                            apiResponse = response.generate(false, 'subitem created', 200, null);
                            resolve(apiResponse)
                        }
                    })
                }
            })

        });
    }//end of adding subitem promise

    validateUserInput(req, res)
        .then(validateItemId)
        .then(addingSubitem)
        .then((resolve) => {
            res.send(resolve)
        })
        .catch((err) => {
            res.send(err)
        })
}//end of adding subitem controller function

let editSubItemTitle = (req, res) => {
    //
}

let deleteSubItemById = (req, res) => {
    //validating user input
    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.params.subItemId) {
                resolve(req)
            }
            else {
                logger.error('One or more parameters are missing', 'subitemcontroller:deletesubitem', 10);
                apiResponse = response.generate(true, 'one or more parameters are missing', 400, null);
                reject(apiResponse)
            }
        })
    }//end of validating user input

    let deleteSubItemById = () => {

        let options = {
            $pull: {
                subItems: {
                    subItemId: req.params.subItemId
                }
            }
        }
        return new Promise((resolve, reject) => {
            subItemModel.update({ 'itemId': req.body.itemId },options)
                .exec((err, result) => {
                    if (err) {
                        logger.error('error while deleting subitem', 'deletesubitem', 10);
                        apiResponse = response.generate(true, 'error while deleting subitem', 400, null);
                        reject(apiResponse)
                    }
                    else if (checkLib.isEmpty(result)) {
                        logger.error('parameters provided are not valid', 'deletesubitem', 5);
                        apiResponse = response.generate(true, 'parameters provided are not valid or not found', 404, null);
                        reject(apiResponse)
                    }
                    else {
                        apiResponse = response.generate(false, 'subitem deleted', 200, result);
                        resolve(apiResponse)
                    }
                })
        })
    }

    validateUserInput(req, res)
        .then(deleteSubItemById)
        .then((resolve) => {
            res.send(resolve)
        })
        .catch((err) => {
            res.send(err)
        })

}//end of deleting subitem

//getting subitems by item id
let getSubItemsofItem = (req, res) => {
    //validate user input
    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.params.itemId) {
                resolve(req)
            }
            else {
                logger.error('itemId is missing', 'subitemcontroller:validateUserInput', 10);
                apiResponse = response.generate(true, 'itemId is missing in params', 400, null)
                reject(apiResponse)
            }
        })
    }//end of validate user input

    let gettingSubItems = () => {
        return new Promise((resolve, reject) => {
            subItemModel.findOne({ 'itemId': req.params.itemId })
                .select('-_id -__v')
                .exec((err, result) => {
                    if (err) {
                        logger.error('error while finding itemId', 'subitemcontroller:gettingSubItems', 10);
                        apiResponse = response.generate(true, 'error while finding itemId', 400, null);
                        reject(apiResponse)
                    }
                    else if (checkLib.isEmpty(result)) {
                        logger.error('no subitem present with given itemId', 'subitemcontroller:gettingSubItems', 5);
                        apiResponse = response.generate(true, 'no subitems present', 404, null);
                        reject(apiResponse)
                    }
                    else {
                        logger.info('Subitems found', 'subitemcontroller:gettingSubItems', 5);
                        apiResponse = response.generate(false, 'subitems found', 200, result);
                        resolve(apiResponse)
                    }
                })
        })
    }//end of getting subitems

    validateUserInput(req, res)
        .then(gettingSubItems)
        .then((resolve) => {
            res.send(resolve)
        })
        .catch((err) => {
            res.send(err)
        })
}

let getAllSubItems = (req, res) => {
    //all sub items
}

module.exports =
    {
        addSubItem,
        editSubItemTitle,
        deleteSubItemById,
        getSubItemsofItem,
        getAllSubItems
    }