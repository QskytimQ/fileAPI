var fs = require('fs');
// var request = require('request');
var http = require('http');
var file = fs.createWriteStream('2.png');
var request = http.get('http://localhost:3000/file',function(response){
    response.pipe(file);
})
// request.get({
//     url: 'http://localhost:3000/file',
// }, function(error, response, body) {
//     // const buffer = Buffer.from(body,'binary');
//     // fs.writeFileSync('2.png',buffer);
//     // console.log('response:'+JSON.stringify(response));
//     response.pipe(file,'binary',{end:true});
//     if(error) throw error;
// });
