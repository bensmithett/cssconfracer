// This store holds information about the current race for the signed in user.
// It primarily responds to actions dispatched by RaceMarshalUtils (a glorified timer).
// http://en.wikipedia.org/wiki/Motorsport_marshal
// (I thought it was a pretty good metaphor...)

import dispatcher from "dispatcher";
import Immutable from "immutable";
import {ActionTypes} from "config/constants";
import {createStore, createRegisteredCallback} from "utils/store_utils";

let raceMarshal = Immutable.Map({
  raceId: null,
  status: null,
  nextRaceId: null,
});

const ActionHandlers = {
  [ActionTypes.RACE_STATUS_UPDATE] (action) {
    raceMarshal = raceMarshal.merge({
      raceId: action.raceId,
      status: action.status,
      nextRaceId: action.nextRaceId,
    });
  },

  all () {
    RaceMarshalStore.emitChange();
  },
};

const RaceMarshalStore = createStore({
  dispatcherToken: dispatcher.register(createRegisteredCallback(ActionHandlers)),

  getStatus () {
    return raceMarshal.get("status");
  },

  getRaceId () {
    return raceMarshal.get("raceId");
  },

  getNextRaceId () {
    return raceMarshal.get("nextRaceId");
  },
});

export default RaceMarshalStore;
