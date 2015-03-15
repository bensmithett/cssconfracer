import React from "react";
import UserStore from "stores/user_store";
import AuthStore from "stores/auth_store";
import connectToStores from "utils/connect_to_stores";
import SignedInHomepage from "./components/signed_in_homepage";
import SignedOutHomepage from "./components/signed_out_homepage";
import {requestUserCreation} from "actions/view_action_creators";

let HomePage = React.createClass({
  componentDidMount () {
    if (!this.props.user) {
      requestUserCreation();
    }
  },

  render () {
    // setTimeout(function () {
    //   this.props.transitionTo("race");
    // }.bind(this), 2000);

    const Page = this.props.user ? SignedInHomepage : SignedOutHomepage;

    return (
      <div>
        <h1>Home</h1>
        <Page user={this.props.user} />
      </div>
    );
  }
});

const getStateFromStores = function getStateFromStores (props) {
  const signedInUser = AuthStore.getSignedInUser();
  return {
    user: signedInUser ? UserStore.get(signedInUser) : null
  };
};

if (module.makeHot) { HomePage = module.makeHot(HomePage); }

export default connectToStores(HomePage,
  [UserStore, AuthStore],
  getStateFromStores
);
