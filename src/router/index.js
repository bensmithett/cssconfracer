var routes = require("config/routes");
var Router = require("react-router");

var router = Router.create({
  routes: routes,
  location: Router.HashLocation,
});

module.exports = router;
