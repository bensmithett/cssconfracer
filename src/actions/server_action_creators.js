import dispatcher from "dispatcher";
import {ActionTypes} from "config/constants";

module.exports = {
  createUserSuccess (userId) {
    dispatcher.handleViewAction({
      type: ActionTypes.CREATE_USER_SUCCESS,
      userId: userId,
    });
  }
};
