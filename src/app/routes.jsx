var React = require('react'); // eslint-disable-line no-unused-vars
var {Route,IndexRoute} = require('react-router');
var app = require('./app');

var routes = (
    <Route path='/' component={app}>
        <IndexRoute component={require('./home/home1')}/>
        <Route path='login' component={require('./home/home')}/>
        <Route path='dashboard' component={require('./dashboard/dashboard')}/>
        <Route path='publish' component={require('./publish/publish')}/>
        <Route path='preview/type/:type' component={require('./publish/preview')}/>
    </Route>
);

module.exports = routes;
