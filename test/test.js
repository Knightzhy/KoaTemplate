let url = 'http://127.0.0.1:3000/test?id=10000';
fetch(url, {
    method:'GET',
    headers:{'Context-Type':'application/json'}
}).then(resp=>{console.log(resp)});