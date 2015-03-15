import dispatcher from "dispatcher";
import {ActionTypes} from "config/constants";
import {createUser} from "utils/api_utils";

module.exports = {
  setUsername (userId, username) {
    dispatcher.handleViewAction({
      type: ActionTypes.SET_USERNAME,
      username: username,
      userId: userId,
    });
  },

  requestUserCreation () {
    createUser();
  },
};
