const _ = require("lodash");
const Groupfunctions = require("../models/Group");
const Group = Groupfunctions.GroupClass;
const groups = Groupfunctions.Groups;
const addUserToGroup = Groupfunctions.addUserToGroup;

newGroupID = 1;

module.exports = (client, io) => {
  //create gamegroup

  client.on("createGroup", data => {
    group = new Group(newGroupID, data, client.id);
    newGroupID++;
    //later return group object
    message =
      "you have created group :" + group.name +
      " with accesscode :" + group.accessCode.toUpperCase();

    io.to(client.id).emit("chatMessage", message);
  });
  client.on("joinGroup", data => {
      console.log(data);
    //join group, creator already joined
    const group = addUserToGroup(client.id,data.toLowerCase());
    
    //check if group is found if so return message to user and groupleader
    //otherwise send message to user that accesscode is invalid
    
    if(group instanceof Group){

    message =
      "you have joined group " + group.name + " with id :" + group.groupID;
    io.to(group.owner).emit("chatMessage", "A user has joined your group.");
    io.to(client.id).emit("chatMessage", message);
    
    }
    else{
        io.to(client.id).emit("chatMessage",group)
    }
  });
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
