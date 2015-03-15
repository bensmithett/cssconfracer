import React from "react";
import UserStore from "stores/user_store";
import AuthStore from "stores/auth_store";
import createStoreMixin from "mixins/create_store_mixin";
import {State as StateMixin} from "react-router";
import SignedInHomepage from "./components/signed_in_homepage";
import SignedOutHomepage from "./components/signed_out_homepage";
import {requestUserCreation} from "actions/view_action_creators";

const HomePage = React.createClass({
  mixins: [
    createStoreMixin(UserStore, AuthStore),
    StateMixin,
  ],

  getStateFromStores (props) {
    const signedInUser = AuthStore.getSignedInUser();
    return {
      user: signedInUser ? UserStore.get(signedInUser) : null
    };
  },

  componentDidMount () {
    if (!this.state.user) {
      requestUserCreation();
    }
  },

  render () {
    // setTimeout(function () {
    //   this.props.transitionTo("race");
    // }.bind(this), 2000);

    const Page = this.state.user ? SignedInHomepage : SignedOutHomepage;

    return (
      <div>
        <h1>Home</h1>
        <Page
          user={this.state.user}
          nextPath={this.getQuery().nextPath}
        />
      </div>
    );
  }
});

export default HomePage;
