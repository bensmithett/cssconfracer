var React = require("react");
var Router = require("react-router");
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

// Screen components
var App = require("screens/app");
var Inbox = require("screens/app/screens/inbox");
var Outbox = require("screens/app/screens/outbox");
var Home = require("screens/app/screens/home");

module.exports = (
  <Route name="app" path="/" handler={App}>
    <Route name="inbox" handler={Inbox} />
    <Route name="outbox" handler={Outbox} />
    <DefaultRoute handler={Home} />
  </Route>
);
