const router = require('koa-router')()

module.exports = router

router.get('/api/print', async (ctx, next) => {

    var result = {};

    console.log("\nusers:")
    console.log(JSON.stringify(global.users, null, 4))

    console.log("\ncards:")
    console.log(JSON.stringify(global.cards, null, 4))

    console.log("\njobs:")
    console.log(JSON.stringify(global.jobs, null, 4))

    result.code = 0;
    result.msg = "";
    result.data = {
        users: global.users,
        cards: global.cards,
        jobs: global.jobs,
        matches: global.matches,
    }
    ctx.response.body = result;
});
