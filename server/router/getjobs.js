const router = require('koa-router')()

module.exports = router

router.get('/api/getjobs', async (ctx, next) => {

    var result = {};
    var jobs = [];
    var job;

    var current_user_id = ctx.session.user_id;

    for(var job_id in global.jobs)
    {
        job = {
            job_id: job_id,
            creator: global.jobs[job_id].creator,
            info: global.jobs[job_id].info
        };

        jobs.push(job);
    }

    result.code = 0;
    result.msg = "";
    result.data = {"list": jobs};
    ctx.response.body = result;
});
