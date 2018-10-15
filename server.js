const mc = require('./manychat.js');
const http = require("http");
var port = process.env.PORT || 3000;
function choice1(data){

    var msg =mc.message_create();
    mc.message_add_text(msg,"You chose " + data);
    return msg;
}

function content(data){

    var msg =mc.message_create();
    var btn = [];
    btn[0]=mc.new_button_node("cereals","Send Message #2");
    btn[1]=mc.new_button_node("maggi","Send Message #2");

    mc.message_add_text(msg,"Hi there "  + data + "\nChoose one",btn);
   
    return msg;
}

function send_kitten() {
    var msg = mc.message_create();
    mc.message_add_image(msg,'https://placekitten.com/305/294');
    return msg;
}

function house_of_cards() {
	// both the buttons and card params are always arrays
    var msg = mc.message_create();
    var buttons = [], cards = [];
    buttons[0] = new_button_url("More like this!",'https://www.realestate.com.au/property-unit-nsw-liverpool-424281258');
    card[0] = mc.new_card("3 bed/bathroom house in Cabramatta","Price: $790,000",buttons);
    mc.message_add_cards(msg,cards);
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
        // case "content" : msg = content(data.firstName);break;
        // case "choice1" : msg = choice1(data.cereals);break;
        case "kitten" : msg = send_kitten();
        break;
        case "cards" : msg = house_of_cards();
        break;
    }
    response.writeHead(200);
    response.write(JSON.stringify(msg));
    response.end();
}