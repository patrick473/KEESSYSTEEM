const _ = require('lodash');

groups =[];
newGroupID = 1;

module.exports = (client,io) => {
    //create gamegroup

    client.on('createGroup',(data) =>{
        
        group = {
            groupID : newGroupID,
            name : data,
            owner: [client.id],
            users: [client.id],
            gameRunning: false,
            //user that needs to react
            reactableUser: '',
        }
        groups.push(group);
        newGroupID++;
        message = "you have created group "+ group.name+ " with id :"+ group.groupID;
        
        io.to(client.id).emit('chatMessage', message);
        console.log(groups);
    }) 
    client.on('joinGroup',(data) =>{
        //join group, creator already joined
        groupID = groups.findIndex(x => x.name == data);
        groups[groupID].users.push(client.id);
        group = groups[groupID];
        message = "you have joined group "+ group.name+ " with id :"+ group.groupID;
        io.to(group.owner).emit('chatMessage','A user has joined your group.');
        io.to(client.id).emit('chatMessage', message);
        console.log(groups);
    }) ;
    client.on('startGame',(data) =>{
        groupID = groups.findIndex(x => x.name == data);
        groups[groupID].gameRunning = true;
        users = groups[groupID].users;
        users.forEach(user => {
            io.to(user).emit('chatMessage', 'game started with group:'+ group.name);
        });
        
       sendReaction(groupID);
            
        
        
    });
    client.on('reactGame',(data) =>{
        groupID = groups.findIndex(x => x.name == data);
        console.log(groups[groupID]);
        if(client.id == groups[groupID].reactableUser){
            sendReaction(groupID);
        }
    });

    client.on('stopGame',(data) =>{
        groupID = groups.findIndex(x => x.name == data);
        groups[groupID].gameRunning = false;
        io.to(client.id).emit('chatMessage', 'game stopped with group:'+ group.name);
   
    });
   
    function sendReaction(id){
        group = groups[id];
        randomUser = _.sample(users);

        groups[id].reactableUser = randomUser;

        
        
        io.to(randomUser).emit('reactGame','please react user:'+ groups[id].reactableUser)
        
    }
  };
  
    