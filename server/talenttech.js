var fs=require('fs');
const path = require('path')
const Koa = require('koa');
const render = require('koa-ejs')
const logger = require('koa-logger')
const onerror = require('koa-onerror')
const json = require('koa-json')
const staticfile = require('koa-static')
const body = require('koa-body')
const session = require('koa-session');
const cors = require('@koa/cors');

//加载全局环境依赖
require("./global.js");

//创建Koa应用
const app = new Koa();

//ejs
render(app, {
  root: path.join(__dirname, 'views'),
  viewExt: 'ejs',
  layout: false,
  cache: true,
  debug: false
});

// error handler
onerror(app);

// session
//app.keys = ['bravespaceman'];
//const session_config = {
//    key: 'koa:bsm', /**  cookie的key。 (默认是 koa:sess) */
//    maxAge: 604800000,   /**  session 过期时间，以毫秒ms为单位计算 。*/
//    autoCommit: true, /** 自动提交到响应头。(默认是 true) */
//    overwrite: true, /** 是否允许重写 。(默认是 true) */
//    httpOnly: true, /** 是否设置HttpOnly，如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，这样能有效的防止XSS攻击。  (默认 true) */
//    signed: true, /** 是否签名。(默认是 true) */
//    rolling: true, /** 是否每次响应时刷新Session的有效期。(默认是 false) */
//    renew: false, /** 是否在Session快过期时刷新Session的有效期。(默认是 false) */
//};
//app.use(session(session_config, app));

// bodyparser 
//app.use(bodyparser({
//  enableTypes: ['json', 'form'],
//  extendTypes: {
//    text: ['text/xml', 'application/xml']
//  }
//}))

//body
app.use(body());

//cors
app.use(cors());

//json
//app.use(json())

//logger
app.use(logger())

//staticfile
app.use(staticfile(path.join(__dirname, './static')));

//login
app.use(require("./middleware/login.js"));

//savedata
app.use(require("./middleware/savedata.js"));

//load routers recursively
(function(){

   loadRouters("./router");

   function loadRouters(router_path)
   {
      //if router_path is a directory, then call loadRouters for each of it's items
      if(fs.lstatSync(router_path).isDirectory())
      {  
         var items=fs.readdirSync(router_path); 
         items.forEach(function(item, index, array){
            loadRouters(router_path + '/' + item);
         });
      }
      //if router_path is js file, then load it as router
      else if(router_path.slice(-3) == '.js')
      {  
         var router_handler = require(router_path); 
         if(router_handler.routes != undefined)
         {
            app.use(router_handler.routes(), router_handler.allowedMethods());
         }
         else
         {
            console.log('[alert]: cann\'t load router ' + router_path);
         }
      }
      //it's neither a directory or js file
      else
      {  
         console.log('[alert]: router skip file ' + router_path);
      }
   }
})();

app.listen(8090);
