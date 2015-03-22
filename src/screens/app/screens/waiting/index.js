import React from "react";

import UserStore from "stores/user_store";
import AuthStore from "stores/auth_store";
import RaceMarshalStore from "stores/race_marshal_store";
import RaceStore from "stores/race_store";

import createStoreMixin from "mixins/create_store_mixin";
import AuthMixin from "mixins/auth_mixin";
import {Navigation as NavigationMixin} from "react-router";

import {MarshalStatus} from "config/constants";

import {registerRaceParticipation, requestCurrentRaceResults} from "actions/view_action_creators";

import ParticipantList from "./components/participant_list";

const WaitingPage = React.createClass({
  mixins: [
    AuthMixin,
    createStoreMixin(UserStore, RaceMarshalStore, RaceStore),
    NavigationMixin,
  ],

  componentDidMount () {
    if (this.state.status === MarshalStatus.WAITING) {
      registerRaceParticipation(this.state.raceId, this.state.userId, this.state.username);
    } else {
      requestCurrentRaceResults(this.state.raceId);
    }
  },

  componentWillUpdate (nextProps, nextState) {
    if (this.state.status === MarshalStatus.WAITING && nextState.status === MarshalStatus.ENGINE_STARTED) {
      this.transitionTo("race");
    }
  },

  componentDidUpdate (prevProps, prevState) {
    if (prevState.status === MarshalStatus.RACING && this.state.status === MarshalStatus.WAITING) {
      registerRaceParticipation(this.state.raceId, this.state.userId, this.state.username);
    }
  },

  getStateFromStores (props) {
    const userId = AuthStore.getSignedInUser();
    const raceId = RaceMarshalStore.getRaceId();
    return {
      userId: userId,
      username: UserStore.get(userId),
      raceId: raceId,
      status: RaceMarshalStore.getStatus(),
      raceResults: RaceStore.getRace(raceId),
    };
  },

  render () {
    return (
      <div>
        <h1>Waiting for next race</h1>
        <p>You are {this.state.username}</p>
        <p>{this.state.status === MarshalStatus.WAITING ? "Waiting for players to join..." : "Race in progress..."}</p>

        <h2>Participants in {this.state.raceId}</h2>
        {
          this.state.raceResults ?
          <ParticipantList participants={this.state.raceResults} />
          :
          "Fetching current race participants if there are any..."
        }
      </div>
    );
  },
});

export default WaitingPage;
