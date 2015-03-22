import dispatcher from "dispatcher";
import Immutable from "immutable";
import {ActionTypes} from "config/constants";
import {createStore, createRegisteredCallback} from "utils/store_utils";

let users = Immutable.Map({});

const ActionHandlers = {
  [ActionTypes.SET_USERNAME] (action) {
    users = users.set(action.userId, action.username);
  },

  [ActionTypes.CREATE_USER_SUCCESS] (action) {
    users = users.set(action.userId, action.username);
  },

  all () {
    UserStore.emitChange();
  },
};

const UserStore = createStore({
  dispatcherToken: dispatcher.register(createRegisteredCallback(ActionHandlers)),

  get (id) {
    return users.get(id);
  },
});

export default UserStore;
