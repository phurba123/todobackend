const appConfig = require('../../appConfig');

let setRouter = (app)=>
{
    let baseUrl = appConfig.apiVersion+'/user';

    // app.get('/hello',(req,res)=>res.send('hello'));
    app.post(`${baseUrl}/signup`)
}

module.exports={
    setRouter:setRouter
}