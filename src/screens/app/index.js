import React from "react";

import {RouteHandler} from "react-router";
import Debug from "./components/debug";

import UserStore from "stores/user_store";

import img from "img/logo";

const debug = false;

module.exports = React.createClass({
  render () {
    return (
      <div>
        {debug ? <Debug /> : null}

        <img src={img} width="100" />
        <RouteHandler {...this.props} />
      </div>
    );
  },
});
