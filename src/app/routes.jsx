var React = require('react'); // eslint-disable-line no-unused-vars
var {Route,IndexRoute} = require('react-router');
var app = require('./app');

var routes = (
    <Route path='/' component={app}>
        <IndexRoute component={require('./home/home')}/>
        <Route path='view2' component={require('./view2/view2')}/>
        <Route path='register' component={require('./authentication/register')}/>
    </Route>
);

module.exports = routes;
