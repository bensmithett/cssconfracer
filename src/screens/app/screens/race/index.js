import React from "react";

import {MarshalStatus} from "config/constants";

import {completedRace} from "actions/view_action_creators";

import UserStore from "stores/user_store";
import AuthStore from "stores/auth_store";
import RaceMarshalStore from "stores/race_marshal_store";

import createStoreMixin from "mixins/create_store_mixin";
import AuthMixin from "mixins/auth_mixin";
import {Navigation as NavigationMixin} from "react-router";

const RacePage = React.createClass({
  mixins: [
    AuthMixin,
    NavigationMixin,
    createStoreMixin(UserStore, RaceMarshalStore),
  ],

  componentWillMount () {
    this.setState({
      currentStatus: RaceMarshalStore.getStatus(),
      currentRaceId: RaceMarshalStore.getRaceId(),
      progress: 0,
      
      // TODO: This will need to be an object that starts timing upon race start & has a getFinalTime() method we can grab upon completion
      // Or maybe just subtract 2 times that you get from MarshalUtils...
      timer: null,
    });
  },

  componentDidMount () {
    RaceMarshalStore.addChangeListener(this._raceMarshalDidUpdate);
  },

  componentWillUpdate (nextProps, nextState) {
    if (nextState.progress > 10) {
      this._handleRaceCompletion();
    }
  },

  getStateFromStores (props) {
    const signedInUser = AuthStore.getSignedInUser();

    return {
      user: UserStore.get(signedInUser),
      marshalStatus: RaceMarshalStore.getStatus(),
      marshalRaceId: RaceMarshalStore.getRaceId(),
    };
  },

  _raceMarshalDidUpdate () {
    // We only care about the first transition to RACING, we don't want to go back to ENGINE_STARTED in this race
    // just because the marshal did for the next race
    const status = RaceMarshalStore.getStatus();
    if (this.state.currentStatus === MarshalStatus.ENGINE_STARTED && status === MarshalStatus.RACING) {
      this.setState({
        currentStatus: status,
      });
      RaceMarshalStore.removeChangeListener(this._raceMarshalDidUpdate);
    }
  },

  _increment () {
    this.setState({
      progress: this.state.progress + 1,
    });
  },

  _handleRaceCompletion () {
    completedRace(this.state.currentRaceId, this.state.user.get("id"), "some time");
    this.transitionTo("result", null, {raceId: this.state.currentRaceId});
  },

  render () {
    return (
      <div>
        <h1>Now Racing!</h1>
        <p>Username: {this.state.user.get("username")}</p>
        <p>Marshal Status: {this.state.marshalStatus}</p>
        <p>Marshal Race ID: {this.state.marshalRaceId}</p>
        <p>Current Status: {this.state.currentStatus}</p>
        <p>Current Race ID: {this.state.currentRaceId}</p>
        <p>Progress: {this.state.progress}</p>

        <button onClick={this._increment}>Go</button>
      </div>
    );
  },
});

export default RacePage;
