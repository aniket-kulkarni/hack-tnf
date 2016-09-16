var React = require('react');
var css = require('./home1.css');
var {browserHistory} = require('react-router');

class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    goDashboard() {
        browserHistory.replace('/dashboard');
    }

    render() {
        return (
            <div className={css.root}>
                <a href="/login"> <img src="../images/marketing.jpg" alt=""/> </a>
            </div>
        );
    }

}

module.exports = Home;
