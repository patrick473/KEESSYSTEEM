const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({id: String});
const groupSchema = new Schema({
    
    owner: String,
    users: [userSchema],
    gameRunning: {type: Boolean, default: false},
    reactableUser: {type:String, default: ''},
    accessCode: String
});
groupSchema.pre('save', async function(){
   this.accessCode = generateAccescode();
   this.users = [{id:this.owner}];
})
mongoose.model('groups',groupSchema);


function generateAccescode() {
  const length = 4;
  const possible = "1234567890qwertyuiopasdfghjklzxcvbnm";
  let accessCode = "";

  for (let i = 0; i < length; i++) {
    accessCode += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return accessCode;
}