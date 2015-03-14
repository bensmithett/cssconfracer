var React = require("react");

module.exports = React.createClass({
  render () {
    setTimeout(function () {
      this.props.transitionTo("race");
    }.bind(this), 2000);

    return (
      <div>home</div>
    );
  }
});
