import React from "react";
import AuthStore from "stores/auth_store";
import {updatedUsername} from "actions/view_action_creators";
import {Link} from "react-router";

const SignedInHomepage = React.createClass({
  _handleUsernameChange (event) {
    updatedUsername(AuthStore.getSignedInUser(), event.target.value);
  },

  render () {
    return (
      <div>        
        <input
          value={this.props.user}
          onChange={this._handleUsernameChange}
        />
        <Link to="waiting">
          Race!
        </Link>
      </div>
    );
  },
});

export default SignedInHomepage;
