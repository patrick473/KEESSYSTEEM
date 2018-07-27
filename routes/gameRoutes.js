const GroupMethods = require("../models/Group");
const Group = GroupMethods.GroupClass;
const groups = GroupMethods.Groups;


module.exports = (client, io) => {
    //create gamegroup
  
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
  