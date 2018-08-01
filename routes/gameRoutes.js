const mongoose = require("mongoose");
const _ = require("lodash");
const Group = mongoose.model("groups");
mongoose.Promise = Promise;

module.exports = (client, io) => {
  //create gamegroup

  client.on("startGame", data => {
    Group.findByIdAndUpdate(
      data,
      { gameRunning: true },
      { new: true },
      (err, group) => {
        if (err) {
          io.to(client.id).emit("chatMessage", "group not found.");
        } else {
          group.users.forEach(user => {
            io.to(user.socketID).emit(
              "chatMessage",
              "game started with group:" + group.id
            );
          });
          sendReaction(group.id);
        }
      }
    );
  });

  client.on("reactGame", data => {
    Group.findById(data, (err, group) => {
      if (err) {
        io.to(client.id).emit("chatMessage", "group not found.");
      } else {
        //console.log(client.id);
        let { reactableUser } = group;
        reactableUser = convertreactableUser(reactableUser);

        if (reactableUser.socketID == client.id) {
          sendReaction(data);
        } else {
          io.to(client.id).emit("chatMessage", "you shouldnt be reacting");
        }
      }
    });
  });

  client.on("stopGame", data => {
    Group.findByIdAndUpdate(
      data,
      {
        gameRunning: false,
        reactableUser: ""
      },
      { new: true },
      (err, group) => {
        if (err) {
          io.to(client.id).emit("chatMessage", "group not found.");
        } else {
          group.users.forEach(user => {
            io.to(user.socketID).emit(
              "chatMessage",
              "game ended with group:" + group.id
            );
          });
        }
      }
    );
  });

  function convertreactableUser(reactableUser) {
    reactableUser = reactableUser.replace("_id:", '"_id":"');
    reactableUser = reactableUser.replace(",", '",');
    reactableUser = reactableUser.replace(/'/g, '"');
    reactableUser = reactableUser.replace("socketID", '"socketID"');

    reactableUser = JSON.parse(reactableUser);
    return reactableUser;
  }

  async function sendReaction(id) {
    Group.findById(id, (err, group) => {
      if (err) {
        io.to(client.id).emit("chatMessage", "group not found");
      } else {
        randomUser = _.sample(group.users);
        group.reactableUser = randomUser;
        group.save(function(err, group) {
          if (err) {
            io.to(client.id).emit("group not found");
          } else {
            let { reactableUser } = group;
            //convert to json
            reactableUser = convertreactableUser(reactableUser);

            io.to(reactableUser.socketID).emit(
              "reactGame",
              "please react, user:" + group.reactableUser
            );
          }
        });
      }
    });
  }
};
