import dispatcher from "dispatcher";
import {ActionTypes} from "config/constants";
import Api from "utils/api_utils";

module.exports = {
  updatedUsername (userId, username) {
    Api.setUsername(userId, username);
    dispatcher.handleViewAction({
      type: ActionTypes.SET_USERNAME,
      username: username,
      userId: userId,
    });
  },

  requestUserCreation () {
    Api.createUser("starter-username");
  },

  registerRaceParticipation (raceId, userId, username) {
    Api.registerRaceParticipation(raceId, userId, username);
  },

  requestCurrentRaceResults (raceId) {
    Api.fetchRace(raceId);
  },

  progressed (raceId, userId, progress) {
    Api.saveProgress(raceId, userId, progress);
  },

  completedRace (raceId, userId, time) {
    Api.saveRaceResult(raceId, userId, time);
  },

  unauth () {
    Api.unauth();
  },
};
