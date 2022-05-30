const router = require('koa-router')()

module.exports = router

router.post('/api/login', async (ctx, next) => {

    var result = {};
    var jbody = ctx.request.body;

    if(jbody.account)
    {
        if(!global.users[jbody.account])
        {
            global.users[jbody.account] = {
                cards: []
            };
        }
        result.code = 0;
        result.msg = "";
        result.data = {
            "x-token": global.session_cnt.toString()
        }
        global.sessions[global.session_cnt] = {};
        global.sessions[global.session_cnt].user_id = jbody.account;
        global.session_cnt += 1;
    }
    else
    {
        result.code = -1;
        result.msg = "account error!";
    }

    ctx.response.body = result;
});
