import dispatcher from "dispatcher";
import {ActionTypes} from "config/constants";
import {createUser, saveRaceResult} from "utils/api_utils";

module.exports = {
  setUsername (userId, username) {
    dispatcher.handleViewAction({
      type: ActionTypes.SET_USERNAME,
      username: username,
      userId: userId,
    });
  },

  requestUserCreation () {
    createUser();
  },

  completedRace (raceId, userId, time) {
    saveRaceResult(raceId, userId, time);
  },
};
