const koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');
const serve = require('koa-static');
const koaBody = require('koa-body');
const logger = require('koa-logger');
const parse = require('await-busboy');
const fs = require('fs');
const path = require('path');
const os = require('os');
const send = require('koa-send');

const app = new koa();
const router = new Router();

router.get('/test',async function(ctx){
    return ctx.body = {
      statusCode:200,
      message:'test',  
    };
});
router.post('/upload',async function(ctx, next) {
    const file = ctx.request.files.file;
    const reader = fs.createReadStream(file.path);
    const ext = file.name.split('.').pop();
    console.log('fileName :' + file.name);
    const stream = fs.createWriteStream(path.join(__dirname, '/upload', `${file.name}`));
    reader.pipe(stream);
    console.log('uploading %s -> %s', file.name, stream.path);
    return ctx.body = {
      statusCode:200,
      message:'test',  
    };
});
router.get('/file',async function(ctx, next){
    var fileName = '1.png';
    var filePath = path.join(__dirname, '/upload/'+fileName);
    ctx.attachment('/upload/1.png');
    ctx.body = {
        statusCode:200,
        message:'test',  
    };
    var png = await send(ctx, '/upload/1.png');
    console.log(png);
    return 'ok';
});
app.use(logger());
// app.use(bodyparser());
app.use(koaBody({
    multipart: true
}));

app.use(serve(__dirname + '/upload'));
app.use(serve(__dirname + '/public'));

app.use(router.routes());
app.listen(3000, () => {
    console.log('listening port on 3000')
})
