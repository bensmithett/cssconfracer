import Actions from "actions/server_action_creators";

const fb = new Firebase("https://cssconfracer.firebaseio.com/");
const fbUsers = fb.child("users");
const fbRaces = fb.child("races");

const ApiUtils = {
  createUser (username) {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      Actions.createUserSuccess(JSON.parse(localUser));
    } else {
      let newUser = {username};
      newUser.id = fbUsers.push(newUser).key();
      localStorage.setItem("user", JSON.stringify(newUser));
      Actions.createUserSuccess(newUser);
    }
  },

  setUsername (userId, username) {
    const fbUser = fbUsers.child(userId);
    fbUser.update({username});
    localStorage.setItem("user", JSON.stringify({
      id: userId,
      username,
    }));
  },

  registerRaceParticipation (raceId, userId, username) {
    const fbUser = fbRaces.child(raceId).child(userId);
    fbUser.set({
      username,
      progress: 0,
      finalTime: null,
    });
    fbRaces.child(raceId).on("value", (snapshot) => {
      Actions.receiveRace(raceId, snapshot.val());
    });
  },

  saveRaceResult (raceId, userId, time) {
    console.log("Saving...", raceId, userId, time);
    const raceResponse = "some response";
    setTimeout(function () {
      Actions.receiveRace(raceId, raceResponse);
    }, 2000);
  },
};

export default ApiUtils;
