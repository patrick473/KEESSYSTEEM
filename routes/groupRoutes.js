const mongoose = require("mongoose");
const _ = require("lodash");
const Group = mongoose.model("groups");

module.exports = (client, io) => {
  //create gamegroup

  client.on("createGroup", async data => {
    console.log('BEEL');
    const group = await new Group({
      owner: client.id
    }).save();

    //later return group object
    
    io.to(client.id).emit("createGroup", group);
  });

  client.on("joinGroup", data => {

    Group.findOneAndUpdate(
      { accessCode: data.toLowerCase() },
      { $push: { users: { socketID: client.id } } },
      { new: true },
      (err, group) => {
        if (err || !group) {
          io.to(client.id).emit("joinGroupFailed", "group not found");
        }else{
        
        io.to(group.owner).emit("joinGroup", "A user has joined your group.");
        io.to(client.id).emit("joinGroup", group);
        }
      }
    );
  });
};
