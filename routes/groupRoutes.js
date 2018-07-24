groups =[];
currentGroupID = 1;

module.exports = (client,io) => {
    
    client.on('createGroup',(data) =>{
        
        group = {
            groupID : currentGroupID,
            name : data,
        }
        groups.push(group);
        currentGroupID++;
        message = "you have created group "+ group.name+ " with id :"+ group.groupID;
        io.to(client.id).emit('chat message', message);
        console.log(groups);
    }) 
    client.on('joinGroup',(data) =>{
        

        io.to(client.id).emit('chat message', 'for your eyes only');
    }) ;
   
  };
  