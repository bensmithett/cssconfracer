var Dispatcher = require("flux/lib/Dispatcher");
var assign = require("object-assign");
var constants = require("config/constants");

module.exports = assign(new Dispatcher(), {
  handleViewAction (action) {
    this.dispatch({
      source: constants.PayloadSources.VIEW_ACTION,
      action: action,
    });
  },

  handleServerAction (action) {
    this.dispatch({
      source: constants.PayloadSources.SERVER_ACTION,
      action: action,
    });
  }
});
