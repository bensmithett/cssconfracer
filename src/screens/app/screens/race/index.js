import React from "react";

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
    // We only care about race ID you hit the page with, not subsequent updates from the Marshal
    this.setState({
      currentRaceId: RaceMarshalStore.getRaceId(),
      progress: 0,
      
      // TODO: This will need to be an object that starts timing upon race start & has a getFinalTime() method we can grab upon completion
      // Or maybe just subtract 2 times that you get from MarshalUtils...
      timer: null,
    });
  },

  componentWillUpdate (nextProps, nextState) {
    if (nextState.progress > 10) {
      this.transitionTo("result", null, {raceId: this.state.currentRaceId});
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

  _increment () {
    this.setState({
      progress: this.state.progress + 1,
    });
  },

  render () {
    return (
      <div>
        <h1>Now Racing!</h1>
        <p>Username: {this.state.user.get("username")}</p>
        <p>Marshal Status: {this.state.marshalStatus}</p>
        <p>Marshal Race ID: {this.state.marshalRaceId}</p>
        <p>This Race ID: {this.state.currentRaceId}</p>
        <p>Progress: {this.state.progress}</p>

        <button onClick={this._increment}>Go</button>
      </div>
    );
  },
});

export default RacePage;
