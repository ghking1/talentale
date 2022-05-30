const router = require('koa-router')()

module.exports = router

router.post('/api/match', async (ctx, next) => {

    var iidx;
    var result = {};
    var jbody = ctx.request.body;

    var card_id = jbody.card_id;
    var job_id = jbody.job_id;

    var current_user_id = ctx.session.user_id;

    if(global.jobs[job_id] == undefined)
    {
        result.code = -1;
        result.msg = "job_id not found!";
        ctx.response.body = result;
        return;
    }

    if(global.cards[card_id] == undefined)
    {
        result.code = -1;
        result.msg = "card_id not found!";
        ctx.response.body = result;
        return;
    }

    if(global.jobs[job_id].match == undefined)
    {
        global.jobs[job_id].match = [];
    }

    for(iidx=0; iidx<global.jobs[job_id].match.length; ++iidx)
    {
        if(global.jobs[job_id].match[iidx][1] == card_id)
        {
            result.code = -1;
            result.msg = "already matched!";
            ctx.response.body = result;
            return;
        }
    }

    global.jobs[job_id].match.push([current_user_id, card_id]);
    result.code = 0;
    result.msg = "";
    ctx.response.body = result;
});
