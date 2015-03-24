import React from "react";
import AuthStore from "stores/auth_store";
import {updatedUsername} from "actions/view_action_creators";
import {Navigation as NavigationMixin} from "react-router";

const validate = (username) => (username !== "") && (username.indexOf(" ") === -1);

const SignedInHomepage = React.createClass({
  mixins: [NavigationMixin],

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

  _handleSubmit (event) {
    event.preventDefault();
    this.replaceWith("waiting");
  },

  render () {
    return (
      <div className="container -pad -really-constrain-width">
        <form onSubmit={this._handleSubmit}>
          <p className="p u-align--center u-pad--top-l">Who are you?</p>
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
              <button type="submit" className="btn u-font-size--l">
                Go Race!
              </button>
              :
              <button type="submit" disabled={true} className="btn -is-disabled u-font-size--l">
                Nope
              </button>
            }
          </p>
        </form>
      </div>
    );
  },
});

export default SignedInHomepage;
