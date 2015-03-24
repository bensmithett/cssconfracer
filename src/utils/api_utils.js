import Actions from "actions/server_action_creators";

const fb = new Firebase("https://cssconfracer.firebaseio.com/");
const fbUsers = fb.child("users");
const fbRaces = fb.child("races");

const ApiUtils = {
  createUser (initialUsername) {
    const existingAuth = fb.getAuth();
    let username = localStorage.getItem("username");

    if (existingAuth) {
      Actions.createUserSuccess(existingAuth.uid, username);
    } else {
      fb.authAnonymously((err, authData) => {
        if (err) {
          console.log("Firebase user auth failed...");
        } else {
          if (!username) {
            username = initialUsername;
            localStorage.setItem("username", username);
          }
          Actions.createUserSuccess(authData.uid, username);
        }
      });
    }
  },

  setUsername (userId, username) {
    localStorage.setItem("username", username);
  },

  fetchRace (raceId) {
    fbRaces.child(raceId).on("value", (snapshot) => {
      Actions.receiveRace(raceId, snapshot.val());
    });
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

  saveProgress (raceId, userId, progress) {
    fbRaces.child(raceId).child(userId).update({
      progress: progress,
    });
  },

  saveRaceResult (raceId, userId, time) {
    fbRaces.child(raceId).child(userId).update({
      time: time,
      progress: 100,
    });
  },

  unauth () {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("user");
    fb.unauth();
  },
};

export default ApiUtils;
