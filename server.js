const mc = require('./manychat.js');
const http = require("http");
var port = process.env.PORT || 3000;
function choice1(data){

    var msg =mc.message_create();
    mc.message_add_text(msg,"You chose " + data);
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
    switch (data.type)
    {
        case "choice1" : msg = choice1(data.cereals);break;
        
    }
    response.writeHead(200);
    response.write(JSON.stringify(msg));
    response.end();
}