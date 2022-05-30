const router = require('koa-router')()

module.exports = router

router.get('/api/mycards', async (ctx, next) => {

    var result = {};
    var cards = [];
    var card;
    var iidx;
    var card_id;

    var current_user_id = ctx.session.user_id;

    if(global.users[current_user_id] && global.users[current_user_id].cards)
    {
        for(iidx=0; iidx<global.users[current_user_id].cards.length; ++iidx)
        {
            card_id = global.users[current_user_id].cards[iidx][0];
            if((global.cards[card_id]) && (global.users[current_user_id].cards[iidx][1] > 0))
            {
                card = {
                    card_id: card_id,
                    info: global.cards[card_id].info,
                    ownership: true,
                };
                cards.push(card);
            }
        }
    }

    result.code = 0;
    result.msg = "";
    result.data = {"list": cards};
    ctx.response.body = result;
});
