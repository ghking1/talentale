
module.exports = async function(ctx, next) {

    var result = { };
    var x_tolen;

	if(ctx.request.url == "/api/login")
	{
    	await next();
	}
    else
    {
        x_tolen = ctx.request.headers["x-token"];
        if((!x_tolen) || (!global.sessions[x_tolen]) || (!global.sessions[x_tolen].user_id))
        {
            result.code = -9999;
            result.msg = "please login!";
            ctx.response.body = result;
            return;
        }

        ctx.session = global.sessions[x_tolen];
        await next();
    }
};