import React from "react";

import UserStore from "stores/user_store";
import AuthStore from "stores/auth_store";
import RaceStore from "stores/race_store";

import AuthMixin from "mixins/auth_mixin";
import createStoreMixin from "mixins/create_store_mixin";

import ParticipantList from "./components/participant_list";

const ResultPage = React.createClass({
  mixins: [
    AuthMixin,
    createStoreMixin(UserStore, RaceStore),
  ],

  componentWillMount () {
    this.setState({
      // An artificial delay that should ensure the winner doesn't change too much due to network lag
      resultsTallied: false,
    });
  },

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        resultsTallied: true,
      });
    }, 3000);
  },

  getStateFromStores (props) {
    const userId = AuthStore.getSignedInUser();
    return {
      userId: userId,
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
        <p>Your time: {this.state.raceResults.get(this.state.userId).get("time")}</p>

        <div>
          {
            this.state.raceResults && this.state.resultsTallied ?
            <ParticipantList participants={this.state.raceResults} />
            :
            "Tallying results..."
          }
        </div>
      </div>
    );
  },
});

export default ResultPage;
