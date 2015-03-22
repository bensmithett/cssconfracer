import React from "react";
import router from "router";

import "css/manifest";

router.run(function (Handler, state) {
  React.render(<Handler {...state} />, document.querySelector("#main"));
});
