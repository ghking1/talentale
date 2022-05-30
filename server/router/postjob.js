const router = require('koa-router')()

module.exports = router


router.get('/api/queryjob', async (ctx, next) => {

    var result = {};
    var jbody = ctx.request.body;

    var current_user_id = ctx.session.user_id;

    if(global.jobs[current_user_id])
    {
        result.code = 0;
        result.msg = "";
        result.data = global.jobs[current_user_id].info;
    }
    else
    {
        result.code = 0;
        result.msg = "";
        result.data = { };
    }

    ctx.response.body = result;
});


router.post('/api/postjob', async (ctx, next) => {

    var result = {};
    var jbody = ctx.request.body;

    var current_user_id = ctx.session.user_id;

    if(global.jobs[current_user_id] == undefined)
    {
        global.jobs[current_user_id] = { };
    }

    global.jobs[current_user_id].creator = current_user_id;
    global.jobs[current_user_id].info = jbody;
    global.jobs[current_user_id].match = [];

    result.code = 0;
    result.msg = "";
    ctx.response.body = result;
});
