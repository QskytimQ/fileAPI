var fs = require('fs');
var request = require('request');
request.post({
    url: 'http://localhost:3000/upload',
    formData: {
        file: fs.createReadStream('1.png'),
        filetype: 'png',
        filename: 'samplefilename',
    },
}, function(error, response, body) {
    console.log('body');
    console.log(body);
    if(error) throw error;
});
