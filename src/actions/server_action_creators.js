import dispatcher from "dispatcher";
import {ActionTypes} from "config/constants";

module.exports = {
  createUserSuccess (userId, username) {
    dispatcher.handleServerAction({
      type: ActionTypes.CREATE_USER_SUCCESS,
      userId: userId,
      username: username,
    });
  },

  receiveRace (raceId, raceSnapshot) {
    dispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_RACE,
      raceId: raceId,
      raceResults: raceSnapshot,
    });
  },
};
