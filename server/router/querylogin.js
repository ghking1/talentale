const router = require('koa-router')()

module.exports = router

router.get('/api/querylogin', async (ctx, next) => {

    var result = {};

    result.code = 0;
    result.msg = "";
    result.data = {
        account: ctx.session.user_id
    }

    ctx.response.body = result;
});
