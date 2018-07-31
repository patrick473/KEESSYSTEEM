const mongoose = require('mongoose');
const _ = require("lodash");
const Group = mongoose.model('groups');



module.exports =  (client, io) => {
  //create gamegroup

   client.on("createGroup", async data => {
     const group = await new Group({
      owner: client.id

    }).save();
    console.log(group);
    
    //later return group object
    message =
      
     
      " you have created a group with accesscode :" +
      group.accessCode.toUpperCase();

    io.to(client.id).emit("chatMessage",{}, message);
    
  });

  client.on("joinGroup",  data => {
    
    //join group, creator already joined
    
   
    
   Group.findOneAndUpdate({accessCode: data.toLowerCase()},
   {"$push":{'users':{id:client.id} } },{new:true},(err,group)=>{
        
        if(err){
       
         return handleError(err);
        }
      
       
        console.log(group);
        })
      });
     
    //check if group is found if so return message to user and groupleader
    //otherwise send message to user that accesscode is invalid

   /*
      message =
        "you have joined group  with id :" + group.id
      io.to(group.owner).emit("chatMessage", "A user has joined your group.");
      io.to(client.id).emit("chatMessage", message);
     */
  


  client.on("startGame", data => {
    groupID = groups.findIndex(x => x.name == data);
    groups[groupID].gameRunning = true;
    users = groups[groupID].users;
    users.forEach(user => {
      io.to(user).emit("chatMessage", "game started with group:" + group.name);
    });

    sendReaction(groupID);
  });
  client.on("reactGame", data => {
    groupID = groups.findIndex(x => x.name == data);
    console.log(groups[groupID]);
    if (client.id == groups[groupID].reactableUser) {
      sendReaction(groupID);
    }
  });

  client.on("stopGame", data => {
    groupID = groups.findIndex(x => x.name == data);
    groups[groupID].gameRunning = false;
    io.to(client.id).emit(
      "chatMessage",
      "game stopped with group:" + group.name
    );
  });

  function sendReaction(id) {
    group = groups[id];
    randomUser = _.sample(users);

    groups[id].reactableUser = randomUser;

    io.to(randomUser).emit(
      "reactGame",
      "please react user:" + groups[id].reactableUser
    );
  }

};