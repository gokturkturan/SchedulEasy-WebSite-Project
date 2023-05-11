import {
  get,
  getDatabase,
  child,
  ref,
  update,
  set,
  onValue,
} from "firebase/database";

export class SocialHandler {
  static database = getDatabase();

  static async getFriend(userId,recieverUid) {
    return (await get(ref(this.database, "friends/" + userId + "/" + recieverUid))).val();
  }

  static async getFriendRequests(username) {
    return  (await get(ref(this.database, "friendRequests/" + username))).val();
  }

  static async getFriends(username) {
    var res = (await (get(ref(this.database,`friends/${username}`)))).val()
    if(res != null){
      return res
    }else{
      return []
    }
  }

  static async sendFriendRequest(senderUsername, recieverUsername) {
    set(
      ref(
        this.database,
        "friendRequests/" + recieverUsername + "/" + senderUsername
      ),
      true
    );
  }
  static removeFriendRequest(username,senderUsername){
    set(ref(this.database,"friendRequests/"+username + "/"+senderUsername),{});
  }
  static acceptFriend(username,senderUsername){
      this.removeFriendRequest(username,senderUsername)
      set(ref(this.database,"friends/"+username + "/"+senderUsername),true);
      set(ref(this.database,"friends/"+senderUsername + "/"+username),true);
  }

  static async getUsername(username){
    return  (await get(ref(this.database,"userNames/"+username))).val()
  }

  static sendMessage(eventId, userInfo, message) {
    set(
      ref(this.database, "eventComments/" + eventId + "/" + `${+new Date()}`),
      { username: userInfo.userName, message: message }
    );
  }

  static listenMessagges(eventId, setState) {
    onValue(ref(this.database, "eventComments/" + eventId), (snapshot) => {
      const data = snapshot.val();

      setState(data);
    });
  }
}
