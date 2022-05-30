/**
 * js 调用 dart
 * window.js2dart(param)
 * param: 参数，json字符串格式，参加下文格式
 *
 *
 *
 *
 * dart 调用 js
 * dart2js(param)
 * param: 参数，json字符串格式
 * {
 *  "method": "",
 *  "param": {
 *     "key1": "value1",
 *     "key2": "value2"
 *   } 
 * }
 * return result;// 字符串
 * 返回值参数的格式
 *{
 *    "code": 0, // 0表示成功，其他错误码表示失败
 *    "msg":"",// 成功或错误描述
 *    "data": {
 *        "key1": "value1",
 *        "key2": "value2"
 *    } 
 *}
 */


// dart 调用js 的主入口（请勿对本函数改名！！！）
function dart2js(param) {
  console.log('dart2js：' + param);
  var paramObj = JSON.parse(param);
  console.log('paramObj：');
  console.log(paramObj);
  switch (paramObj.method) {
    case 'js_test':
      jsTest();
      return return_wrap(0, 'js 返回 ', { 'jK1': 'val1', 'jK2': 'val2' });
    case 'connect_metamask':
      connect_metamask();
      break;
    case 'mint_card':
      mint_card(paramObj.param.num);
      break;
    case 'buy_card':
      buy_card(paramObj.param.from, paramObj.param.to, paramObj.param.card_id, paramObj.param.num, paramObj.param.price, paramObj.param.connector);
      break;
    case 'send_card':
      send_card(paramObj.param.from, paramObj.param.to);
      break;
    case 'post_job':
      post_job();
      break;
    case 'match':
      match();
      break;
    default:
      break;
  }
  return;
}


// 各种业务函数自行定义
function jsTest() {
  //   业务自行处理……
  window.js2dart(
    JSON.stringify({
      "method": 'js2dart',
      "param": {
        "jK1": 'val1'
      }
    })
  );
}


function return_wrap(code, msg, data) {
  return JSON.stringify({
    "code": code,
    "msg": msg,
    "data": data
  });
}

//设置dart端账户名
function js2dart_set_metamask_account(account) {
  window.js2dart(
    JSON.stringify({
      "method": 'set_metamask_account',
      "param": {
        "account": account
      }
    })
  );
}

//设置函数执行成功与否
function js2dart_set_function_result(method, code) {
  window.js2dart(
    JSON.stringify({
      "method": method,
      "param": {
        "code": code
      }
    })
  );
}

