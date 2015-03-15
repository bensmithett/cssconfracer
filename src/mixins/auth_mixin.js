import AuthStore from "stores/auth_store";

const AuthMixin = {
  statics: {
    willTransitionTo (transition) {
      const nextPath = transition.path;
      if (!AuthStore.getSignedInUser()) {
        transition.redirect("/", {}, {"nextPath": nextPath});
      }
    },
  },
};

export default AuthMixin;
