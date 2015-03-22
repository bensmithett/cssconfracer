import React from "react";
import createStoreMixin from "mixins/create_store_mixin";
import UserStore from "stores/user_store";
import AuthStore from "stores/auth_store";
import RaceStore from "stores/race_store";
import AuthMixin from "mixins/auth_mixin";

const ResultPage = React.createClass({
  mixins: [
    AuthMixin,
    createStoreMixin(UserStore, RaceStore),
  ],

  getStateFromStores (props) {
    const userId = AuthStore.getSignedInUser();
    return {
      username: UserStore.get(userId),
      raceResults: RaceStore.getRace(this.props.query.raceId),
    };
  },

  render () {
    return (
      <div>
        <h1>Results</h1>
        <p>You are {this.state.username}</p>
        <p>Results for race ID: {this.props.query.raceId}</p>
        <p>Results: {this.state.raceResults || "Loading results..."}</p>
      </div>
    );
  },
});

export default ResultPage;
