const mongoose = require('mongoose');
const shortid = require('shortid')
const timeLib = require('../libs/timeLib');
const logger = require('../libs/loggerLib');
const response = require('../libs/responseLib');
const checkLib = require('../libs/checkLib')

const historiesModel = mongoose.model('histories');

let apiResponse;

let addHistory = (req, res) => {
    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.userId && req.body.category) {
                resolve(req)
            } else {
                logger.error('Field Missing while adding history', 'HistoryController: addHistoryFunctio()', 5)
                apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate user input

    let addingHistory = () => {
        return new Promise((resolve, reject) => {
            let newHistory = new historiesModel({
                historyId: shortid.generate(),
                userId: req.body.userId,
                listId: req.body.listId,
                category: req.body.category,
                createdOn: timeLib.now(),
                itemId: req.body.itemId,
                subItemId: req.body.subItemId,
                message: req.body.message
            })

            newHistory.save((err, result) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'HistoryController: addingHistory', 10)
                    apiResponse = response.generate(true, 'Failed to add history Item', 500, null)
                    reject(apiResponse)
                } else {
                    logger.info('history created');
                    //console.log(result)
                    apiResponse = response.generate(false, 'history created :', 200, result.toObject())
                    resolve(apiResponse)
                }
            })

        })
    }// end addinghistory promise

    validateUserInput(req, res)
        .then(addingHistory)
        .then((resolve) => {
            res.send(resolve)
        })
        .catch((err) => {
            res.send(err)
        })
}//

let getAllHistoryOfUser = (req, res) => {
    let validateInput = () => {
        return new Promise((resolve, reject) => {
            if (req.params.userId) {
                resolve(req)
            }
            else {
                logger.error('userId is missing ', 'gethistoryofalluser', 10);
                apiResponse = response.generate(true, 'userId is missing', 400, null);
                reject(apiResponse)
            }
        })
    }//end of validate input

    let getHistories = () => {
        return new Promise((resolve, reject) => {
            historiesModel.find({ 'userId': req.params.userId }).select('-_id -__v')
                .exec((err, result) => {
                    if (err) {
                        logger.error(err.message, 'HistoryController: getHistroies', 10)
                        apiResponse = response.generate(true, 'Failed to get histroies of user', 500, null)
                        reject(apiResponse)
                    }
                    else if (checkLib.isEmpty(result)) {
                        logger.error("user doesn't have any histories", 'historycontroller', 5);
                        apiResponse = response.generate(true, "user doesn't have any history", 404, null);
                        reject(apiResponse)
                    }
                    else {
                        logger.info('history created');
                        //console.log(result)
                        apiResponse = response.generate(false, 'histories found', 200, result)
                        resolve(apiResponse)
                    }
                })
        })
    }

    validateInput(req, res)
        .then(getHistories)
        .then((resolve) => {
            res.send(resolve)
        })
        .catch((err) => {
            res.send(err)
        })
}//end of getting all histories of user

//deleting history of user

let deleteHistoryOfUser = (req, res) => {

    let validateInput = () => {
        return new Promise((resolve, reject) => {
            if (req.params.userId) {
                resolve(req)
            }
            else {
                logger.error('userId is missing ', 'gethistoryofalluser', 10);
                apiResponse = response.generate(true, 'userId is missing', 400, null);
                reject(apiResponse)
            }
        })
    }//end of validate input

    // check if history is present or not
    let findHistory = () => {
        return new Promise((resolve, reject) => {
            historiesModel.findOne({ 'userId': req.params.userId }).sort({ $natural: -1 })
                .select()
                .lean()
                .exec((err, HistoryDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'History Controller: v', 10)
                        let apiResponse = response.generate(true, 'Failed To Find Item Details', 500, null)
                        reject(apiResponse)
                    } else if (checkLib.isEmpty(HistoryDetails)) {
                        logger.info('No Histoy Found', 'History  Controller:findHistory')
                        let apiResponse = response.generate(true, 'No History Found', 404, null)
                        reject(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'History Found', 200, HistoryDetails)
                        resolve(HistoryDetails)
                    }
                })
        })
    }// end findHistory

    let deleteHistory = (HistoryDetails) => {
        return new Promise((resolve, reject) => {

            historiesModel.findOneAndRemove({ 'historyId': HistoryDetails.historyId }).exec((err, result) => {
                if (err) {
                    logger.error(err.message, 'historycontroller: deletehistory', 10)
                    apiResponse = response.generate(true, 'Failed To delete Item', 500, null)
                    reject(apiResponse)
                } else if (checkLib.isEmpty(result)) {
                    logger.info('No history found', 'history Controller: deletehistory')
                    apiResponse = response.generate(true, 'No history Found', 404, null)
                    reject(apiResponse)
                } else {

                    apiResponse = response.generate(false, 'History Deleted', 200, HistoryDetails)
                    resolve(apiResponse)
                }
            });// end find and remove

        })
    }// end delete function

    validateInput(req,res)
    .then(findHistory)
    .then(deleteHistory)
    .then((resolve)=>
    {
        res.send(resolve)
    })
    .catch((err)=>
    {
        res.send(err)
    })
}

module.exports =
    {
        addHistory,
        getAllHistoryOfUser,
        deleteHistoryOfUser
    }