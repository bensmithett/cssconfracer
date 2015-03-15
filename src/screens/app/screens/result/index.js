import React from "react";
import createStoreMixin from "mixins/create_store_mixin";
import UserStore from "stores/user_store";
import AuthStore from "stores/auth_store";
import AuthMixin from "mixins/auth_mixin";

const ResultPage = React.createClass({
  mixins: [
    AuthMixin,
    createStoreMixin(UserStore),
  ],

  getStateFromStores (props) {
    const signedInUser = AuthStore.getSignedInUser();
    return {
      user: UserStore.get(signedInUser)
    };
  },

  render () {
    return (
      <div>
        <h1>Results</h1>
        You are {this.state.user.get("username")}
      </div>
    );
  },
});

export default ResultPage;
