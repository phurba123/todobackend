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
            if (req.body.listTitle) {
                resolve(req)
            }
            else {
                apiResponse = response.generate(true, 'Title not provided', 400, null);
                reject(apiResponse)
            }
        })
    }//end of validate input

    //saving new list on db after validation
    let saveList = () => {
        return new Promise((resolve, reject) => {
            let newList = new listModel({
                listId: shortId.generate(),
                listTitle: req.body.listTitle,
                listCreatorId: req.body.userId,
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

module.exports = {
    createList
}