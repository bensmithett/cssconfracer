import dispatcher from "dispatcher";
import Immutable from "immutable";
import {ActionTypes} from "config/constants";
import {createStore, createRegisteredCallback} from "utils/store_utils";

let store = Immutable.Map({});

const ActionHandlers = {
  [ActionTypes.RECEIVE_RACE] (action) {
    store = store.set(action.raceId, action.raceResults);
  },

  all () {
    RaceStore.emitChange();
  },
};

const RaceStore = createStore({
  dispatcherToken: dispatcher.register(createRegisteredCallback(ActionHandlers)),

  getRace (raceId) {
    return store.get(raceId);
  },
});

export default RaceStore;
