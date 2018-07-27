let groups = [];

class Group {
  constructor(groupID, name, owner) {
    this.groupID = groupID;
    this.name = name;
    this.owner = owner;
    this.users = [];
    this.gameRunning = false;
    this.reactableUser = "";
    this.accessCode = generateAccescode();
    this.addUser(owner);

    groups.push(this);
  }
  addUser(user) {
    if (this.users.includes(user)) {
      return false;
    } else {
      this.users.push(user);
      return true;
    }
  }
}

function generateAccescode() {
  const length = 4;
  const possible = "1234567890qwertyuiopasdfghjklzxcvbnm";
  let accessCode = "";

  for (let i = 0; i < length; i++) {
    accessCode += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return accessCode;
}
function addUserToGroup(user, accessCode) {
  console.log(accessCode);
  groupIndex = groups.findIndex(e => e.accessCode == accessCode);

  if (groupIndex >= 0) {
    success = groups[groupIndex].addUser(user);
    if (success) {
      return groups[groupIndex];
    } else {
      return "You are already in this group.";
    }
  } else {
    return "We did not recognize this access code, please try again.";
  }
}
module.exports = {
  GroupClass: Group,
  Groups: groups,
  addUserToGroup: addUserToGroup
};
