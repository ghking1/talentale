const router = require('koa-router')()

module.exports = router


router.get('/api/querycv', async (ctx, next) => {

    var result = {};
    var jbody = ctx.request.body;

    var current_user_id = ctx.session.user_id;

    if(global.cards[current_user_id])
    {
        result.code = 0;
        result.msg = "";
        result.data = global.cards[current_user_id].info;
    }
    else
    {
        result.code = 1;
        result.msg = "need mint first!";
    }

    ctx.response.body = result;
});


router.post('/api/fillcv', async (ctx, next) => {

    var result = {};
    var jbody = ctx.request.body;

    var current_user_id = ctx.session.user_id;

    
    /*如果是首次创建该名片，则需要做一些额外工作*/
    if(global.cards[current_user_id] == undefined)
    {
        global.cards[current_user_id] = { };
        if(global.users[current_user_id] == undefined)
        {
            global.users[current_user_id] = { };
        }
        if(global.users[current_user_id].cards == undefined)
        {
            global.users[current_user_id].cards = [ ];
        }
        global.users[current_user_id].cards = [ ];
        global.users[current_user_id].cards.push([current_user_id, 1000]);
    }

    global.cards[current_user_id].creator = current_user_id;
    global.cards[current_user_id].info = jbody;
    global.cards[current_user_id].sell = [];

    result.code = 0;
    result.msg = "";
    ctx.response.body = result;
});
