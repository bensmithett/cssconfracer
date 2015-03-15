import dispatcher from "dispatcher";
import {ActionTypes} from "config/constants";

const RaceMarshalActionCreators = {
  startYourEngines (raceId) {
    dispatcher.handleRaceMarshalAction({
      type: ActionTypes.START_YOUR_ENGINES,
      raceId: raceId,
    });
  }
};

export default RaceMarshalActionCreators;
