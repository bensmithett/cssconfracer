var React = require("react");
var router = require("router");

router.run(function (Handler, state) {
  React.render(<Handler {...state} />, document.querySelector("#main"));
});
