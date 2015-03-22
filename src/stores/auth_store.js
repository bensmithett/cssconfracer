import dispatcher from "dispatcher";
import Immutable from "immutable";
import {ActionTypes} from "config/constants";
import {createStore, createRegisteredCallback} from "utils/store_utils";

let store = Immutable.Map({
  signedInUser: null,
});

const ActionHandlers = {
  [ActionTypes.CREATE_USER_SUCCESS] (action) {
    store = store.set("signedInUser", action.userId);
  },

  all () {
    AuthStore.emitChange();
  },
};

const AuthStore = createStore({
  dispatcherToken: dispatcher.register(createRegisteredCallback(ActionHandlers)),

  getSignedInUser () {
    return store.get("signedInUser");
  },
});

export default AuthStore;
