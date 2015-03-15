import { EventEmitter } from 'events';
import assign from 'object-assign';
import { EventTypes } from "config/constants";

const CHANGE_EVENT = EventTypes.CHANGE_EVENT;

export function createStore (spec) {
  var store = assign({
    emitChange () {
      this.emit(CHANGE_EVENT);
    },

    addChangeListener (callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener (callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },
  }, spec, EventEmitter.prototype);

  return store;
};
