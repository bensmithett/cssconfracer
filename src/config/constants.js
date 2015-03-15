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
    START_YOUR_ENGINES: null,
  }),

  EventTypes: keymirror({
    CHANGE: null,
  })
};

export default Constants;
