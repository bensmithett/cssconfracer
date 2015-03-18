import React from "react";
import UserStore from "stores/user_store";
import AuthStore from "stores/auth_store";
import RaceMarshalStore from "stores/race_marshal_store";
import createStoreMixin from "mixins/create_store_mixin";
import {State as StateMixin} from "react-router";
import SignedInHomepage from "./components/signed_in_homepage";
import SignedOutHomepage from "./components/signed_out_homepage";
import {requestUserCreation} from "actions/view_action_creators";
import {start} from "utils/race_marshal_utils";

const HomePage = React.createClass({
  mixins: [
    createStoreMixin(UserStore, AuthStore, RaceMarshalStore),
    StateMixin,
  ],

  getStateFromStores (props) {
    const signedInUser = AuthStore.getSignedInUser();
    return {
      user: signedInUser ? UserStore.get(signedInUser) : null,
      raceId: RaceMarshalStore.getRaceId(),
      status: RaceMarshalStore.getStatus(),
    };
  },

  componentDidMount () {
    if (!this.state.user) {
      requestUserCreation();
    }
    start();
  },

  render () {
    const Page = this.state.user ? SignedInHomepage : SignedOutHomepage;

    return (
      <div>
        <h1>Home</h1>
        <p>id: {this.state.raceId}</p>
        <p>status: {this.state.status}</p>
        <Page
          user={this.state.user}
          nextPath={this.getQuery().nextPath}
        />
      </div>
    );
  }
});

export default HomePage;
