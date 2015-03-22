import React from "react";
import {Link} from "react-router";
import {unauth} from "actions/view_action_creators";

const Debug = React.createClass({
  render () {
    return (
      <header>
        <ul>
          <li><Link to="app">Home</Link></li>
          <li><Link to="waiting">Waiting</Link></li>
          <li><Link to="race">Race</Link></li>
          <li><Link to="result">Result</Link></li>
          <li><button onClick={unauth}>Unauth</button></li>
        </ul>
      </header>
    );
  }
});

export default Debug;
