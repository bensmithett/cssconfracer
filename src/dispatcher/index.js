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
  },

  // In addition to the usual View & Server, there's an additional entity dispatching actions in this flux app:
  // the RaceMarshal! Let's see how this goes...
  handleRaceMarshalAction (action) {
    this.dispatch({
      source: constants.PayloadSources.RACE_MARSHAL_ACTION,
      action: action,
    });
  }
});
