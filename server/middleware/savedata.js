var fs=require('fs');

module.exports = async function(ctx, next) {

    await next();

    fs.writeFileSync("./model/users.json", JSON.stringify(global.users, null, 4));
    fs.writeFileSync("./model/cards.json", JSON.stringify(global.cards, null, 4));
    fs.writeFileSync("./model/jobs.json", JSON.stringify(global.jobs, null, 4));
};