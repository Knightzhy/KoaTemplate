log4js = require('log4js');
logger = log4js.getLogger('businesslog');
logger.level = 'info';
module.exports = async function (query, body, headers, ctx) {
    try {
        return {code:0, message:'ok, lily.id:' + query.id};
    } catch(error) {
        return {code:1, message:'程序异常' + error};
    }
}
