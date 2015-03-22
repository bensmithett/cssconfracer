import React from "react";
import AuthStore from "stores/auth_store";
import {updatedUsername} from "actions/view_action_creators";
import {Link} from "react-router";

const validate = (username) => (username !== "") && (username.indexOf(" ") === -1);

const SignedInHomepage = React.createClass({
  getInitialState () {
    return {
      valid: validate(this.props.user)
    };
  },

  componentWillReceiveProps (nextProps) {
    this.setState({
      valid: validate(nextProps.user)
    });
  },

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

        {
          this.state.valid ?
          <Link to="waiting">Race!</Link>
          :
          "Invalid username"
        }
      </div>
    );
  },
});

export default SignedInHomepage;
