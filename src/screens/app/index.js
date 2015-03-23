import React from "react";

import {RouteHandler} from "react-router";
import Debug from "./components/debug";

import UserStore from "stores/user_store";

const debug = false;

module.exports = React.createClass({
  render () {
    return (
      <div className="container -constrain-width">
        {debug ? <Debug /> : null}

        <RouteHandler {...this.props} />
      </div>
    );
  },
});
