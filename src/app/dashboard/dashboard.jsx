var React = require('react');
var css = require('./dashboard.css');
var UserStore = require('../store/UserStore');
var cx = require('classnames');
var ajax = require('../ajax');
var {browserHistory} = require('react-router');
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconButton from 'material-ui/IconButton';

const iconStyles = {
  marginRight: 24,
};

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }

    logout = () => {
        ajax.logout(UserStore.token)
            .then(() => {
                UserStore.removeUser();
                browserHistory.replace('/');
            })
            .catch((err) => {
                UserStore.removeUser();
                browserHistory.replace('/');
            });
    }

    publish = (e) => {
        var type = e.target.dataset.type;
        browserHistory.push('/publish?type='+type);
    }

    render() {
        return (
            <div className={css.root}>
               <header className={css.header}>
                    <div className={css.logoWrap}>
                        <div className={css.logo}>
                            <span className={css.logoStrong}>Author</span>
                            <span  className={css.logoNormal}>Services</span>
                        </div>
                        <div className={css.slogan}>
                            Supporting Taylor & Francis authors
                        </div>
                    </div>

                    <div className={css.headerActions}>
                        <a href="#" onClick={this.logout}>Logout</a>
                    </div>
                </header>
                <hr/>
                <section className={css.content}>
                    <div className={css.left}>
                        <div className={cx(css.welcome,css.card)}>
                            Welcome, <b>{UserStore.user.name}</b>
                            <p>
                                View your personalized dashboard below to see results so far.
                            </p>
                            <p>
                                Why not try some of the suggested ideas to sahre your work with other audiences.
                            </p>
                        </div>
                        <div className={cx(css.activity,css.card)}>
                            <div className={css.recentActivity}>
                                <div>
                                    <h2>
                                        Recent Activity
                                    </h2> 
                                </div>
                                <hr />
                                <div className={css.recentActivityIcons} >
                                    <div className={css.recentActivityIcon} >
                                        <div className= {css.recentActivityIconLeft}>
                                            <FontIcon color="#3b94d9" style={{fontSize:'48px'}} className="material-icons">videocam
                                            </FontIcon>
                                        </div>
                                        <div className= {css.recentActivityIconRight}>
                                            <p>20</p>
                                            <p>Video Views</p>
                                        </div>
                                    </div>
                                    <div className={css.recentActivityIcon} >
                                        <div className= {css.recentActivityIconLeft}>
                                            <FontIcon color="#3b94d9" style={{fontSize:'48px'}} className="material-icons">assignment_turned_in
                                            </FontIcon>
                                        </div>
                                        <div className= {css.recentActivityIconRight}>
                                            <p>55</p>
                                            <p>Altmetric Score</p>
                                        </div>
                                    </div>
                                    <div className={css.recentActivityIcon} >
                                        <div className= {css.recentActivityIconLeft}>
                                            <FontIcon color="#3b94d9" style={{fontSize:'48px'}} className="material-icons">cloud_download
                                            </FontIcon>
                                        </div>
                                        <div className= {css.recentActivityIconRight}>
                                            <p>1270</p>
                                            <p>Article Downloads</p>
                                        </div>
                                    </div>
                                    <div className={css.recentActivityIcon} >
                                        <div className= {css.recentActivityIconLeft}>
                                            <FontIcon color="#3b94d9" style={{fontSize:'48px'}} className="material-icons">format_quote
                                            </FontIcon>
                                        </div>
                                        <div className= {css.recentActivityIconRight}>
                                            <p>33</p>
                                            <p>Citations</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={css.services}>
                                <div className={css.servicesWrap}>
                                    <h2>
                                        Services
                                    </h2> 
                                </div>
                                <hr />

                                <div className={css.servicesIcons}>
                                        <div className={css.activityLink} data-type="cartoon" onClick={this.publish}>
                                            Cartoon
                                            <IconButton tooltip="Font Icon" 
                                                style={{position : 'absolute',left : 0,top : '-20px',width : '100%'}}>
                                            </IconButton>
                                        </div>
                                    
                                    <div className={css.activityLink} data-type="poster" onClick={this.publish}>
                                        Poster
                                        <IconButton tooltip="Font Icon" 
                                                style={{position : 'absolute',left : 0,top : '-20px',width : '100%'}}>
                                        </IconButton>
                                    </div>
                                    <div className={css.activityLink} data-type="flyer" onClick={this.publish}>
                                        Flyer
                                        <IconButton tooltip="Font Icon" 
                                                style={{position : 'absolute',left : 0,top : '-20px',width : '100%'}}>
                                        </IconButton>
                                    </div>
                                    <div className={css.activityLink} data-type="video" onClick={this.publish}>
                                        Video Abstract
                                        <IconButton tooltip="Font Icon" 
                                                style={{position : 'absolute',left : 0,top : '-20px',width : '100%'}}>
                                        </IconButton>
                                    </div>
                                    <div className={css.activityLink} data-type="landing" onClick={this.publish}>
                                        Landing Page
                                        <IconButton tooltip="Font Icon" 
                                                style={{position : 'absolute',left : 0,top : '-20px',width : '100%'}}>
                                        </IconButton>
                                    </div>
                                    <div className={css.activityLink} data-type="powerpoint" onClick={this.publish}>
                                        Powerpoints
                                        <IconButton tooltip="Font Icon" 
                                                style={{position : 'absolute',left : 0,top : '-20px',width : '100%'}}>
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={css.right}>
                        <div className={cx(css.welcome,css.card)}>Ad PlaceHoler</div>
                        <div className={cx(css.activity,css.card), css.tweetBox}>
                            <a className="twitter-timeline"  href="https://twitter.com/search?q=%40tandfauthorserv" data-widget-id="776496587132526593">Tweets about @tandfauthorserve</a>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

}

Dashboard.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};


module.exports = Dashboard;
