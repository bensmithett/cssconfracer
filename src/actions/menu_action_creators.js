var Dispatcher = require("dispatcher");
var ActionTypes = require("config/constants").ActionTypes;

module.exports = {
  setUsername (username) {
    Dispatcher.handleViewAction({
      type: ActionTypes.FOO,
      username: username,
    });
  }
};
