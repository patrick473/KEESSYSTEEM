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
    //join group, creator already joined

    Group.findOneAndUpdate(
      { accessCode: data.toLowerCase() },
      { $push: { users: { socketID: client.id } } },
      { new: true },
      (err, group) => {
        if (err) {
          return handleError(err);
        }
        if (!group) {
          io.to(client.id).emit("chatMessage", "group not found.");
        }
        message = "you have joined a group with the id :" + group.id;
        io.to(group.owner).emit("chatMessage", "A user has joined your group.");
        io.to(client.id).emit("chatMessage", message);
      }
    );
  });
};
