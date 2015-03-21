import dispatcher from "dispatcher";
import {ActionTypes} from "config/constants";

module.exports = {
  createUserSuccess (user) {
    dispatcher.handleServerAction({
      type: ActionTypes.CREATE_USER_SUCCESS,
      user: user,
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
