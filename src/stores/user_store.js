var Dispatcher = require("dispatcher");
var EventEmitter = require("events").EventEmitter;
var constants = require("config/constants");
var assign = require("object-assign");
var Immutable = require("immutable");
var ActionTypes = constants.ActionTypes;

var _store = Immutable.fromJS({
  username: null
});

var UserStore = assign({}, EventEmitter.prototype, {
  getUsername () {
    return _store.get("username");
  }
});

UserStore.dispatchToken = Dispatcher.register(function (payload) {
  var action = payload.action;

  console.log(payload);

  switch (action.type) {
    case ActionTypes.FOO:
      console.log("Do a thing");
      break;

    default:
      // do nothing
  }
});

module.exports = UserStore;