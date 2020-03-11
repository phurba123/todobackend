
let setRouter = (app)=>
{
    app.get('/hello',(req,res)=>res.send('hello'));
}

module.exports={
    setRouter:setRouter
}