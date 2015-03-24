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
    registerRaceParticipation(this.state.nextRaceId, this.state.userId, this.state.username);
  },

  componentWillUpdate (nextProps, nextState) {
    if (this.state.status === MarshalStatus.WAITING && nextState.status === MarshalStatus.ENGINE_STARTED) {
      this.replaceWith("race");
    }
  },

  getStateFromStores (props) {
    const userId = AuthStore.getSignedInUser();
    const nextRaceId = RaceMarshalStore.getNextRaceId();

    return {
      userId: userId,
      username: UserStore.get(userId),
      nextRaceId: nextRaceId,
      timeUntilNextRace: RaceMarshalStore.getTimeUntilNextRace(),
      status: RaceMarshalStore.getStatus(),
      participants: RaceStore.getRace(nextRaceId),
    };
  },

  render () {
    return (
      <div>
        <h1 className="h4 u-align--center u-pad--top-l">Next race</h1>
        <p className="h1 u-align--center">{this.state.timeUntilNextRace}</p>

        <h2 className="h3 u-align--center">The Lineup...</h2>
        {
          this.state.participants ?
          <ParticipantList participants={this.state.participants} userId={this.state.userId} />
          :
          <p className="p u-align--center">Loading lineup...</p>
        }
      </div>
    );
  },
});

export default WaitingPage;
