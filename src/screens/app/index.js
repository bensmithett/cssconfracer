var React = require("react");
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var UserStore = require("stores/user_store");

module.exports = React.createClass({
  render () {
    return (
      <div>
        <header>
          <ul>
            <li><Link to="app">Home</Link></li>
            <li><Link to="waiting">Waiting</Link></li>
            <li><Link to="race">Race</Link></li>
            <li><Link to="result">Result</Link></li>
          </ul>
        </header>

        <RouteHandler {...this.props} />
      </div>
    );
  },
});
