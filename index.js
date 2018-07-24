var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const bodyParser = require('body-parser');


    
    app.use(bodyParser.json());
  


    app.get('/', function(req, res){
        res.sendFile(__dirname + '/index.html');
        });
        io.on('connection', (client) =>{  
            console.log('Client connected...');
        
            client.on('join', (data) =>{
                console.log(client.id);
            });
            client.on('disconnect', ()=>{
                console.log('client disconnected')
            });
            require('./routes/groupRoutes.js')(client,io);

        });
       

const PORT = 4999
http.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});