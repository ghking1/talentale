const router = require('koa-router')()

module.exports = router

router.get('/api/getcards', async (ctx, next) => {

    var result = {};
    var cards = [];
    var card;
    var iidx;

    var current_user_id = ctx.session.user_id;

    for(var card_id in global.cards)
    {
        card = {
            card_id: card_id,
            info: global.cards[card_id].info
        };

        //暂时先不隐藏
        //card.info.name = null; 
        //card.info.contact = null;

        card.ownership = false;
        if(global.users[current_user_id] && global.users[current_user_id].cards)
        {
            for(iidx=0; iidx<global.users[current_user_id].cards.length; ++iidx)
            {
                if((global.users[current_user_id].cards[iidx][0] == card_id) && (global.users[current_user_id].cards[iidx][1] > 0))
                {
                    card.ownership = true;
                }
            }
        }

        var lowest_iidx = -1;
        var lowest_price = 999999999;
        if(global.cards[card_id] && global.cards[card_id].sell)
        {
            for(iidx=0; iidx<global.cards[card_id].sell.length; ++iidx)
            {
                if(global.cards[card_id].sell[iidx][2] < lowest_price)
                {
                    lowest_iidx = iidx;
                    lowest_price = global.cards[card_id].sell[iidx][2];
                }
            }
        }
        card.floor_price = (lowest_price == 999999999) ? 0 : lowest_price;

        cards.push(card);
    }

    result.code = 0;
    result.msg = "";
    result.data = {"list": cards};
    ctx.response.body = result;
});
