import {createUserSuccess} from "actions/server_action_creators";

const ApiUtils = {
  createUser () {
    // create a new user with a blank username on firebase
    setTimeout(function () {
      createUserSuccess(1);
    }, 2000);
  },

  saveRaceResult (raceId, userId, time) {
    console.log("Saving...", raceId, userId, time);
  },
};

export default ApiUtils;
