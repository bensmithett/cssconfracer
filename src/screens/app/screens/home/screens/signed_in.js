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
      <div className="container -pad -really-constrain-width">
        <p className="p u-align--center">Who are you?</p>
        <p className="p">
          <input
            className="input"
            value={this.props.user}
            onChange={this._handleUsernameChange}
          />
        </p>

        <p className="p u-margin--bottom-l">
          {
            this.state.valid ?
            <Link to="waiting" className="btn u-font-size--l">
              Go Race!
            </Link>
            :
            <button disabled={true} className="btn -is-disabled u-font-size--l">
              Nope
            </button>
          }
        </p>
      </div>
    );
  },
});

export default SignedInHomepage;
