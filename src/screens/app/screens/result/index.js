import React from "react";
import {Link} from "react-router";

import UserStore from "stores/user_store";
import AuthStore from "stores/auth_store";
import RaceStore from "stores/race_store";

import AuthMixin from "mixins/auth_mixin";
import createStoreMixin from "mixins/create_store_mixin";
import {formatScore} from "utils/race_marshal_utils";

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
      <div className="u-pad--top-l">
        <div>
          <p className="p u-align--center">Your time</p>
          <p className="h1 u-align--center">
            {formatScore(this.state.raceResults.get(this.state.userId).get("time"))}
          </p>

          {
            this.state.resultsTallied ?
            <ParticipantList participants={this.state.raceResults} userId={this.state.userId} />
            :
            <p className="p u-align--center">
              Tallying results...
            </p>
          }
        </div>

        {
          this.state.resultsTallied ?
          <div className="container -pad">
            <div className="grid -gutters u-margin--bottom-l u-pad--top-l">
              <div className="grid__col -span-6">
                <Link to="waiting" className="btn u-font-size--l">
                  Again!
                </Link>
              </div>

              <div className="grid__col -span-6">
                <Link to="/" className="btn u-font-size--l">
                  Home
                </Link>
              </div>
            </div>
          </div>
          :
          null
        }
      </div>
    );
  },
});

export default ResultPage;
