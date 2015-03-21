import keymirror from "keymirror";

const Constants = {
  PayloadSources: keymirror({
    VIEW_ACTION: null,
    SERVER_ACTION: null,
    RACE_MARSHAL_ACTION: null,
  }),

  ActionTypes: keymirror({
    CREATE_USER_SUCCESS: null,
    SET_USERNAME: null,
    RACE_STATUS_UPDATE: null,
    RECEIVE_RACE: null,
  }),

  EventTypes: keymirror({
    CHANGE: null,
  }),

  MarshalStatus: keymirror({
    ENGINE_STARTED: null,
    RACING: null,
    WAITING: null,
  })
};

export default Constants;
