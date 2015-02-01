keymirror = require("keymirror")

module.exports = {
  PayloadSources: keymirror({
    VIEW_ACTION: null,
    SERVER_ACTION: null,
  }),

  ActionTypes: keymirror({
    FOO: null,
  })
};
