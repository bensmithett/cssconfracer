import React from "react";
import UserStore from "stores/user_store";
import AuthStore from "stores/auth_store";
import createStoreMixin from "mixins/create_store_mixin";
import SignedIn from "./screens/signed_in";
import SignedOut from "./screens/signed_out";
import {requestUserCreation} from "actions/view_action_creators";
import {start} from "utils/race_marshal_utils";

const HomePage = React.createClass({
  mixins: [
    createStoreMixin(UserStore, AuthStore),
  ],

  getStateFromStores (props) {
    const signedInUser = AuthStore.getSignedInUser();
    return {
      user: signedInUser ? UserStore.get(signedInUser) : null,
    };
  },

  componentDidMount () {
    if (!this.state.user) {
      requestUserCreation();
    }
    start();
  },

  render () {
    const Page = this.state.user ? SignedIn : SignedOut;

    return (
      <div>
        <h1>Home</h1>
        {
          this.state.user ?
          <SignedIn user={this.state.user} />
          :
          <SignedOut />
        }
      </div>
    );
  }
});

export default HomePage;
