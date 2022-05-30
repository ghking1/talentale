var fs=require('fs');

try{
    global.users = JSON.parse(fs.readFileSync("./model/users.json"));
}
catch(e)
{
    global.users = {};
}
/*
{ 
    user_id: {
        cards: [
            [card_id, num],
            ...
        ],
    },
    ...
};
*/


try{
    global.cards = JSON.parse(fs.readFileSync("./model/cards.json"));
}
catch(e)
{
    global.cards = {};
}
/*
{
    card_id: {
        creator: user_id, //创建者
        info: { //简历信息
            name: string,
            contact: string,
            ...
        },
        sell: [ //挂单列表
            [user_id, num, price],  //[挂单者, 数量, 单价]
            ...
        ]
    },
    ...
};
*/


try{
    global.jobs = JSON.parse(fs.readFileSync("./model/jobs.json"));
}
catch(e)
{
    global.jobs = {};
}
/*
{
    job_id: {
        creator: user_id, //创建者
        info: { //工作信息
            ...
        },
        match: [ //推荐列表
            [user_id, card_id], //[推荐者, 名片]
        ]
    }
};
*/
