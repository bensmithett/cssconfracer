import dispatcher from "dispatcher";
import Immutable from "immutable";
import {ActionTypes, EventTypes} from "config/constants";
import {createStore} from "utils/store_utils";

let users = Immutable.Map({});

const ActionHandlers = {
  [ActionTypes.SET_USERNAME] (action) {
    users = users.setIn([action.userId, "username"], action.username);
  },

  [ActionTypes.CREATE_USER_SUCCESS] (action) {
    users = users.set(action.userId, Immutable.Map({
      "id": action.userId,
      "username": "default-username",
    }));
  },
};

const registeredCallback = function registeredCallback (payload) {
  const action = payload.action;

  if (typeof ActionHandlers[action.type] === "function") {
    ActionHandlers[action.type](action);
    UserStore.emitChange();
  }

  return true;
};

const UserStore = createStore({
  dispatcherToken: dispatcher.register(registeredCallback),

  get (id) {
    return users.get(id);
  },
});

export default UserStore;
