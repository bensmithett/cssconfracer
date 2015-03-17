// This store holds information about the current race for the signed in user.
// It primarily responds to actions dispatched by RaceMarshalUtils (a glorified timer).
// http://en.wikipedia.org/wiki/Motorsport_marshal
// (I thought it was a pretty good metaphor...)

import dispatcher from "dispatcher";
import Immutable from "immutable";
import {ActionTypes} from "config/constants";
import {createStore} from "utils/store_utils";

let raceMarshal = Immutable.Map({
  raceId: null,
  status: null,
});

const ActionHandlers = {
  [ActionTypes.RACE_STATUS_UPDATE] (action) {
    raceMarshal = raceMarshal.merge({
      raceId: action.raceId,
      status: action.status,
    });
  },
};

const registeredCallback = function registeredCallback (payload) {
  const action = payload.action;

  if (typeof ActionHandlers[action.type] === "function") {
    ActionHandlers[action.type](action);
    RaceMarshalStore.emitChange();
  }

  return true;
};

const RaceMarshalStore = createStore({
  dispatcherToken: dispatcher.register(registeredCallback),

  getStatus () {
    return raceMarshal.get("status");
  },

  getRaceId () {
    return raceMarshal.get("raceId");
  },
});

export default RaceMarshalStore;
