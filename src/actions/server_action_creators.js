import dispatcher from "dispatcher";
import {ActionTypes} from "config/constants";

module.exports = {
  createUserSuccess (userId) {
    dispatcher.handleServerAction({
      type: ActionTypes.CREATE_USER_SUCCESS,
      userId: userId,
    });
  },

  receiveRace (raceId, raceResponse) {
    dispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_RACE,
      raceId: raceId,
      raceResults: "santized: " + raceResponse,
    });
  },
};
