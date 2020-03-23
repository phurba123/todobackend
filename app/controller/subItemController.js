const logger = require('../libs/loggerLib')
const response = require('../libs/responseLib')

let apiResponse;

let addSubItem = (req,res)=>
{
    //validating user input
    let validateUserInput  = ()=>
    {
        return new Promise((resolve,reject)=>
        {
            if(req.params.itemId && req.body.subItemTitle)
            {
                resolve(req)
            }
            else
            {
                logger.error('One or more parameters are missing','subitemcontroller:addsubitem',10);
                apiResponse = response.generate(true,'one or more parameters are missing',400,null);
                reject(apiResponse)
            }
        })
    }//end of validating user input

    //adding subitem after validating
    let addingSubitem = ()=>
    {
        return new Promise((resolve,reject)=>
        {

        })
    }
}

let editSubItemTitle = (req,res)=>
{
    //
}

let deleteSubItemById = (req,res)=>
{
    //
}

module.exports=
{
    addSubItem,
    editSubItemTitle,
    deleteSubItemById
}