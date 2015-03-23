import dispatcher from "dispatcher";
import {ActionTypes} from "config/constants";

const RaceMarshalActionCreators = {
  raceStatusUpdate (raceId, status, nextRaceId) {
    dispatcher.handleRaceMarshalAction({
      type: ActionTypes.RACE_STATUS_UPDATE,
      raceId: raceId,
      status: status,
      nextRaceId: nextRaceId,
    });
  }
};

export default RaceMarshalActionCreators;
