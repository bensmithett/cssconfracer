import dispatcher from "dispatcher";
import {ActionTypes} from "config/constants";

const RaceMarshalActionCreators = {
  raceStatusUpdate (raceId, status) {
    dispatcher.handleRaceMarshalAction({
      type: ActionTypes.RACE_STATUS_UPDATE,
      raceId: raceId,
      status: status,
    });
  }
};

export default RaceMarshalActionCreators;
