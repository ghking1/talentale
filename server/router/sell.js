const router = require('koa-router')()

module.exports = router

router.post('/api/sell', async (ctx, next) => {

    var result = {};
    var jbody = ctx.request.body;

    var card_id = jbody.card_id;
    var price = jbody.price;
    var num = 1;

    var current_user_id = ctx.session.user_id;


    all_sell_num = num;
    if(global.cards[card_id] && global.cards[card_id].sell)
    {
        for(iidx=0; iidx<global.cards[card_id].sell.length; ++iidx)
        {
            if(current_user_id == global.cards[card_id].sell[iidx][0])
            {
                all_sell_num += global.cards[card_id].sell[iidx][1];
            }
        }
    }

    if(global.users[current_user_id] && global.users[current_user_id].cards)
    {
        for(iidx=0; iidx<global.users[current_user_id].cards.length; ++iidx)
        {
            if(card_id == global.users[current_user_id].cards[iidx][0])
            {
                if((global.cards[card_id]) && (global.users[current_user_id].cards[iidx][1] >= all_sell_num))
                {
                    if(global.cards[card_id].sell == undefined)
                    {
                        global.cards[card_id].sell = [];
                    }
                    global.cards[card_id].sell.push([current_user_id, num, price]);
                    result.code = 0;
                    result.msg = "";
                    ctx.response.body = result;
                    return;
                }
                else
                {
                    result.code = -1;
                    result.msg = "card num exceed!";
                    ctx.response.body = result;
                    return;
                }
            }
        }
    }

    result.code = -1;
    result.msg = "card_id not own!";
    ctx.response.body = result;
});
