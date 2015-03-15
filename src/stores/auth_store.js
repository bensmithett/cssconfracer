import dispatcher from "dispatcher";
import Immutable from "immutable";
import {ActionTypes} from "config/constants";
import {createStore} from "utils/store_utils";

let store = Immutable.Map({
  signedInUser: null,
});

const ActionHandlers = {
  [ActionTypes.CREATE_USER_SUCCESS] (action) {
    store = store.set("signedInUser", action.userId);
    // Maybe this doesn't need to emit a change?
    // It's not really useful until the user is also in UserStore.
  },
};

const registeredCallback = function registeredCallback (payload) {
  const action = payload.action;

  if (typeof ActionHandlers[action.type] === "function") {
    ActionHandlers[action.type](action);
    AuthStore.emitChange();
  }

  return true;
};

const AuthStore = createStore({
  dispatcherToken: dispatcher.register(registeredCallback),

  getSignedInUser () {
    return store.get("signedInUser");
  },
});

export default AuthStore;
