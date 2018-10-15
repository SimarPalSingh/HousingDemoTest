const mc = require('./manychat.js');
const http = require("http");
var port = process.env.PORT || 3000;
function hello_world(){

    var msg =mc.message_create();
    mc.message_add_text(msg,"Hello, World");
    console.log(msg);
    return msg;
}

function bye(){

    var msg =mc.message_create();
    mc.message_add_text(msg,"Bye");
    console.log(msg);
    return msg;
}

http.createServer(function(request,response) {
    response.setHeader('Access-Control-Allow-Origin','*');
    body = '';
    if (request.method == 'POST') {
        request.on('data',function(data) {
            body += data;
            if (body.length > 1e6) {
                request.connection.destroy();
            }
        });
        request.on('end',function() {
            return generate_response(body,response);
        });
    }

}).listen(port);

function generate_response(body,response){
    data= JSON.parse(body);
    switch (data)
    {
        case "hello world" : msg = hello_world();
        case "bye"         : msg =bye();
    }
    response.writeHead(200);
    response.write(JSON.stringify(msg));
    repsonse.end();
}