var React = require("react");
var Router = require("react-router");
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

module.exports = (
  <Route name="app" path="/" handler={require("screens/app")}>
    <Route name="waiting" handler={require("screens/app/screens/waiting")} />
    <Route name="race" handler={require("screens/app/screens/race")} />
    <Route name="result" handler={require("screens/app/screens/result")} />
    <DefaultRoute handler={require("screens/app/screens/home")} />
  </Route>
);
