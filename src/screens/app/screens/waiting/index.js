import React from "react";

import UserStore from "stores/user_store";
import AuthStore from "stores/auth_store";
import RaceMarshalStore from "stores/race_marshal_store";

import createStoreMixin from "mixins/create_store_mixin";
import AuthMixin from "mixins/auth_mixin";
import {Navigation as NavigationMixin} from "react-router";

import {MarshalStatus} from "config/constants";

import {registerRaceParticipation} from "actions/view_action_creators";

const WaitingPage = React.createClass({
  mixins: [
    AuthMixin,
    createStoreMixin(UserStore, RaceMarshalStore),
    NavigationMixin,
  ],

  componentDidMount () {
    if (this.state.status === MarshalStatus.WAITING) {
      registerRaceParticipation(this.state.raceId, this.state.user.get("id"), this.state.user.get("username"));
    }
  },

  componentWillUpdate (nextProps, nextState) {
    if (this.state.status === MarshalStatus.WAITING && nextState.status === MarshalStatus.ENGINE_STARTED) {
      this.transitionTo("race");
    }
  },

  componentDidUpdate (prevProps, prevState) {
    if (prevState.status === MarshalStatus.RACING && this.state.status === MarshalStatus.WAITING) {
      registerRaceParticipation(this.state.raceId, this.state.user.get("id"), this.state.user.get("username"));
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
