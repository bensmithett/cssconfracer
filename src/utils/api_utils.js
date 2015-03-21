import {createUserSuccess, receiveRace} from "actions/server_action_creators";

const fb = new Firebase("https://cssconfracer.firebaseio.com/");
const fbUsers = fb.child("users");
const fbRaces = fb.child("races");

const ApiUtils = {
  createUser (username) {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      createUserSuccess(JSON.parse(localUser));
    } else {
      let newUser = {username};
      newUser.id = fbUsers.push(newUser).key();
      localStorage.setItem("user", JSON.stringify(newUser));
      createUserSuccess(newUser);
    }
  },

  setUsername(userId, username) {
    const fbUser = fbUsers.child(userId);
    fbUser.update({username});
    localStorage.setItem("user", JSON.stringify({
      id: userId,
      username,
    }));
  },

  saveRaceResult (raceId, userId, time) {
    console.log("Saving...", raceId, userId, time);
    const raceResponse = "some response";
    setTimeout(function () {
      receiveRace(raceId, raceResponse);
    }, 2000);
  },
};

export default ApiUtils;
