var React = require("react");
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var MenuActionCreators = require("actions/menu_action_creators");
var UserStore = require("stores/user_store");

module.exports = React.createClass({
  getInitialState () {
    return {
      username: UserStore.getUsername()
    };
  },

  _handleClick () {
    MenuActionCreators.setUsername("foo");
  },

  render () {
    return (
      <div>
        <header>
          <ul>
            <li><Link to="app">Home</Link></li>
            <li><Link to="inbox">Inbox</Link></li>
            <li><Link to="outbox">Outbox</Link></li>
          </ul>
          <strong>{this.state.username}</strong>
          <button onClick={this._handleClick}>Do an action</button>
        </header>

        <RouteHandler />
      </div>
    );
  },
});
