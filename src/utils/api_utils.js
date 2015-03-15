import {createUserSuccess} from "actions/server_action_creators";

const ApiUtils = {
  createUser () {
    // create a new user with a blank username on firebase
    setTimeout(function () {
      createUserSuccess(1);
    }, 2000);
  }
};

export default ApiUtils;
