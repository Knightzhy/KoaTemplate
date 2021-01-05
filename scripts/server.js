const app = require('../app');
const config = require('../config/config');

app.listen(config.port, ()=>{
    console.log('koa template is starting at http://127.0.0.1:3000/');
});
