import React from "react";
import {setUsername} from "actions/view_action_creators";

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
        <button>Race!</button>
      </div>
    );
  },
});

export default SignedInHomepage;
