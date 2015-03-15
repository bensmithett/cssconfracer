// Borrowed from
// https://github.com/gaearon/flux-react-router-example/blob/137ed781d130a963ad8475f0bd014fed3ac44d31/scripts/mixins/createStoreMixin.js
// A mixin that allows components to tune in to Stores they're interested in, e.g. mixins: [createStoreMixin(UserStore)].
// Requires you to define a `getStateFromStores` method on the component.

const createStoreMixin = function createStoreMixin (...stores) {
  const StoreMixin = {
    getInitialState () {
      return this.getStateFromStores(this.props);
    },

    componentDidMount () {
      stores.forEach(store =>
        store.addChangeListener(this.handleStoresChanged)
      );

      this.setState(this.getStateFromStores(this.props));
    },

    componentWillUnmount () {
      stores.forEach(store =>
        store.removeChangeListener(this.handleStoresChanged)
      );
    },

    handleStoresChanged () {
      if (this.isMounted()) {
        this.setState(this.getStateFromStores(this.props));
      }
    },
  };

  return StoreMixin;
};

export default createStoreMixin;
