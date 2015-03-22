import React from "react";
import Router, {RouteHandler, Link} from "react-router";
import UserStore from "stores/user_store";
import {unauth} from "actions/view_action_creators";

module.exports = React.createClass({
  render () {
    return (
      <div>
        <header>
          <ul>
            <li><Link to="app">Home</Link></li>
            <li><Link to="waiting">Waiting</Link></li>
            <li><Link to="race">Race</Link></li>
            <li><Link to="result">Result</Link></li>
            <li><button onClick={unauth}>Unauth</button></li>
          </ul>
        </header>

        <RouteHandler {...this.props} />
      </div>
    );
  },
});
