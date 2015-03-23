import React from "react";

import {MarshalStatus} from "config/constants";

import {completedRace, progressed} from "actions/view_action_creators";

import UserStore from "stores/user_store";
import AuthStore from "stores/auth_store";
import RaceMarshalStore from "stores/race_marshal_store";
import RaceStore from "stores/race_store";

import createStoreMixin from "mixins/create_store_mixin";
import AuthMixin from "mixins/auth_mixin";
import {Navigation as NavigationMixin} from "react-router";

import {start, stop} from "utils/stopwatch_utils";

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

  componentDidUpdate (prevProps, prevState) {
    if (prevState.progress !== this.state.progress) {
      progressed(this.state.currentRaceId, this.state.userId, this.state.progress);
    }
  },

  getStateFromStores (props) {
    const userId = AuthStore.getSignedInUser();

    return {
      userId: userId,
      username: UserStore.get(userId),
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
      start();
      RaceMarshalStore.removeChangeListener(this._raceMarshalDidUpdate);
      // TODO: Also need to remove this callback when this component unmounts
    }
  },

  _increment () {
    // Instead of reading the current user's progress from the shared Race store, treat this component's state as the source
    // of truth for progress & just broadcast it to other users.
    this.setState({
      progress: this.state.progress + 1,
    });
  },

  _handleRaceCompletion () {
    completedRace(this.state.currentRaceId, this.state.userId, stop());
    this.transitionTo("result", null, {raceId: this.state.currentRaceId});
  },

  render () {
    const disabled = this.state.currentStatus === MarshalStatus.ENGINE_STARTED;
    const top = 100 - (this.state.progress * 10);

    return (
      <div className="racing">
        <div className="racing__track">
          <div className="racing__car-path">
            <div
              className="racing__car"
              style={{
                top: top + "%",
              }}
            />
          </div>

        </div>

        <div className="racing__grid">
          start here, high as car
        </div>

        <div className="racing__btn">
          <p className="p">
            <button
              className={"btn u-font-size--l" + (disabled ? " -is-disabled" : "")}
              onClick={this._increment}
              disabled={disabled}
            >
              Drive!
            </button>
          </p>
        </div>
      </div>
    );
  },
});

export default RacePage;


// <h1>Now Racing!</h1>
// <p>Username: {this.state.username}</p>
// <p>Marshal Status: {this.state.marshalStatus}</p>
// <p>Marshal Race ID: {this.state.marshalRaceId}</p>
// <p>Current Status: {this.state.currentStatus}</p>
// <p>Current Race ID: {this.state.currentRaceId}</p>
// <p>Progress: {this.state.progress}</p>
