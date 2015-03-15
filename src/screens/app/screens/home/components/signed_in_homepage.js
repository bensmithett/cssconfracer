import React from "react";
import {setUsername} from "actions/view_action_creators";
import {Link} from "react-router";

const SignedInHomepage = React.createClass({
  _handleUsernameChange (event) {
    setUsername(this.props.user.get("id"), event.target.value);
  },

  render () {
    return (
      <div>        
        <input
          value={this.props.user.get("username")}
          onChange={this._handleUsernameChange}
        />
        <Link to={this.props.nextPath || "waiting"}>
          Race!
        </Link>
      </div>
    );
  },
});

export default SignedInHomepage;
