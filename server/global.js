const utils = require('./utils/utils.js')
const models = require('./model/models.js')

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

global.sessions = {};
global.session_cnt = 0;