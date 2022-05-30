const router = require('koa-router')()

module.exports = router

router.get('/api/carddetail', async (ctx, next) => {

    var card_id = ctx.request.query.card_id;

    var result = {};

    var current_user_id = ctx.session.user_id;

    if(card_id != undefined)
    {
        if(global.users[current_user_id] && global.users[current_user_id].cards)
        {
            for(iidx=0; iidx<global.users[current_user_id].cards.length; ++iidx)
            {
                if(card_id == global.users[current_user_id].cards[iidx][0])
                {
                    result.code = 0;
                    result.msg = "";
                    result.data = {
                        name: global.cards[card_id].info.name,
                        contact: global.cards[card_id].info.contact,
                    };
                    ctx.response.body = Jresult;
                    return;
                }
            }
        }
    }

    result.code = -1;
    result.msg = "not own!";
    ctx.response.body = result;
});
