const app = require('express')();
const mongoose = require('mongoose');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/Group');
mongoose.connect(keys.mongoURI);
    
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
            require('./routes/groupRoutes')(client,io);
            require('./routes/gameRoutes')(client,io);
        });
       

const PORT = 4999
http.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});