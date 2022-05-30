const router = require('koa-router')()

module.exports = router

router.post('/api/transfer', async (ctx, next) => {

    var iidx;
    var result = {};
    var jbody = ctx.request.body;

    var from = jbody.from;
    var to = jbody.to ;
    var card_id = jbody.card_id;
    var num = jbody.num;
    var price = jbody.price; 

    for(iidx=0; iidx<global.users[from].cards.length; ++iidx)
    {
        if((global.users[from].cards[iidx][0] == card_id) && (global.users[from].cards[iidx][1] > 0))
        {
            global.users[from].cards[iidx][1] -= num;
            break;
        }
    }
    if(iidx==global.users[from].cards.length)
    {
        result.code = -1;
        result.msg = "not own this card";
        ctx.response.body = result;
        return
    }

    for(iidx=0; iidx<global.users[to].cards.length; ++iidx)
    {
        if(global.users[to].cards[iidx][0] == card_id)
        {
            global.users[to].cards[iidx][1] += num;
            break;
        }
    }
    if(iidx==global.users[to].cards.length)
    {
        global.users[to].cards.push([card_id, 1]);
    }

    var lowest_iidx = -1;
    var lowest_price = 999999999;
    if(global.cards[card_id] && global.cards[card_id].sell)
    {
        for(iidx=0; iidx<global.cards[card_id].sell.length; ++iidx)
        {
            if(    (global.cards[card_id].sell[iidx][0] == from) 
                && (global.cards[card_id].sell[iidx][1] == 1) 
                && (global.cards[card_id].sell[iidx][2] == price) 
                )
            {
                global.cards[card_id].sell.remove(iidx);
                --iidx;
                break;
            }
            if((global.cards[card_id].sell[iidx][0] == from) && (global.cards[card_id].sell[iidx][2] < lowest_price))
            {
                lowest_iidx = iidx;
                lowest_price = global.cards[card_id].sell[iidx][2];
            }
        }
        if((iidx==global.cards[card_id].sell.length) && (lowest_iidx!=-1))
        {
            global.cards[card_id].sell.remove(lowest_iidx);
        }
    }

    if(global.jobs[to] && global.jobs[to].match)
    {
        for(iidx=0; iidx<global.jobs[to].match.length; ++iidx)
        {
            if(global.jobs[to].match[iidx][1] == card_id)
            {
                global.jobs[to].match.remove(iidx);
                --iidx;
            }
        }
    }

    result.code = 0;
    result.msg = "";
    ctx.response.body = result;
});
