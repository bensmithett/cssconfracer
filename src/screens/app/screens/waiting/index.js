import React from "react";
import createStoreMixin from "mixins/create_store_mixin";
import UserStore from "stores/user_store";
import AuthStore from "stores/auth_store";
import RaceMarshalStore from "stores/race_marshal_store";
import AuthMixin from "mixins/auth_mixin";
import {Navigation as NavigationMixin} from "react-router";
import {MarshalStatus} from "config/constants";

const WaitingPage = React.createClass({
  mixins: [
    AuthMixin,
    createStoreMixin(UserStore, RaceMarshalStore),
    NavigationMixin,
  ],

  componentWillUpdate (nextProps, nextState) {
    if (this.state.status === MarshalStatus.WAITING && nextState.status === MarshalStatus.ENGINE_STARTED) {
      this.transitionTo("race");
    }
  },

  getStateFromStores (props) {
    const signedInUser = AuthStore.getSignedInUser();
    return {
      user: UserStore.get(signedInUser),
      raceId: RaceMarshalStore.getRaceId(),
      status: RaceMarshalStore.getStatus(),
    };
  },

  render () {
    return (
      <div>
        <h1>Waiting for next race</h1>
        <p>You are {this.state.user.get("username")}</p>
        <p>{this.state.status === MarshalStatus.WAITING ? "Waiting for players to join..." : "Race in progress..."}</p>
      </div>
    );
  },
});

export default WaitingPage;
