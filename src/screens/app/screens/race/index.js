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

  componentWillUpdate (nextProps, nextState) {
    if (nextState.progress > 10) {
      this.transitionTo("result");
    }
  },

  getStateFromStores (props) {
    const signedInUser = AuthStore.getSignedInUser();
    return {
      user: UserStore.get(signedInUser),
      marshalStatus: RaceMarshalStore.getStatus(),
      marshalRaceId: RaceMarshalStore.getRaceId(),
      progress: 0,
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
        <p>Status: {this.state.marshalStatus}</p>
        <p>Race ID: {this.state.marshalRaceId}</p>
        <p>Progress: {this.state.progress}</p>

        <button onClick={this._increment}>Go</button>
      </div>
    );
  },
});

export default RacePage;
