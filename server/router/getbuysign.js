const router = require('koa-router')()

module.exports = router

router.post('/api/getbuysign', async (ctx, next) => {

    var iidx;
    var result = {};
    var jbody = ctx.request.body;

    var card_id = jbody.card_id;

    var current_user_id = ctx.session.user_id;

    result.code = 0;
    result.msg = "";

    if(global.cards[card_id] && global.cards[card_id].sell && global.cards[card_id].sell.length>0)
    {
        result.data = {};

        var lowest_iidx = -1;
        var lowest_price = 999999999;

        for(iidx=0; iidx<global.cards[card_id].sell.length; ++iidx)
        {
            if(global.cards[card_id].sell[iidx][2] < lowest_price)
            {
                lowest_iidx = iidx;
                lowest_price = global.cards[card_id].sell[iidx][2];
            }
        }

        result.data.from = global.cards[card_id].sell[lowest_iidx][0];
        result.data.to = current_user_id;
        result.data.card_id = card_id;
        result.data.num = 1;
        result.data.price = (lowest_price == 999999999) ? 0 : lowest_price;
        result.data.connector = null;

        if(global.jobs[current_user_id] && global.jobs[current_user_id].match && global.jobs[current_user_id].match.length>0)
        {
            for(iidx=0; iidx<global.jobs[current_user_id].match.length; ++iidx)
            {
                if(global.jobs[current_user_id].match[iidx][1] == card_id)
                {
                    result.data.connector = global.jobs[current_user_id].match[iidx][0];
                }
            }
        }
    }
    else
    {
        result.code = -1;
        result.msg = "card_id not sell!";
    }

    ctx.response.body = result;
});
