// This store holds information about the current race for the signed in user.
// It primarily responds to actions dispatched by RaceMarshalUtils (a glorified timer).
// http://en.wikipedia.org/wiki/Motorsport_marshal
// (I thought it was a pretty good metaphor...)

import dispatcher from "dispatcher";
import Immutable from "immutable";
import {ActionTypes} from "config/constants";
import {createStore} from "utils/store_utils";

let raceMarshal = Immutable.Map({
  currentRace: null,
});

const ActionHandlers = {
  [ActionTypes.TIMING_EVENT] (action) {
    // Update raceMarshal to reflect the world.
    // Prooobably have a handler for different types of timing event.
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
    return raceMarshall;
  },
});

export default RaceMarshalStore;
