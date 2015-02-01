var React = require("react");
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

module.exports = React.createClass({
  render () {
    return (
      <div>
        <header>
          <ul>
            <li><Link to="app">Home</Link></li>
            <li><Link to="inbox">Inbox</Link></li>
            <li><Link to="outbox">Outbox</Link></li>
          </ul>
        </header>

        <RouteHandler />
      </div>
    );
  }
});
