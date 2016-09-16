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

    openInNewWindow = () => {
        var url = 'http://tandfonline.com/doi/full/10.1080/2331205X.2015.1125411';
        window.open(url,'_blank');
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

        var flyer = 'If you are on the move, a flyer is q quick and effective way to tell others about your work';

        var video = 'Videos get more views than written content. Describe your research through an animated journey';

        var poster = 'Presenting your research at a confeence or event? Use the poster creation tool to generate your visual';

        var presentation = 'Capture the essence of your research to deliver a clear & powerful presentation';

        var landing = 'Landing Page';

        var cartoon = 'Cartoon';

        return (
            <div className={css.root}>
               <header className={css.header}>
                    <div className={css.logoWrap}>
                        <img src="../images/logo.png" alt=""/>
                    </div>
                </header>
                <section className={css.content}>
                    <div className={css.left}>
                        <div className={cx(css.welcome,css.card)}>
                            Welcome, <b>{UserStore.user.name}</b>
                            <p>
                                View your personalized dashboard below to see results so far.
                            </p>
                            <p>
                                Why not try some of the suggested ideas to share your work with other audiences.
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
                                            <FontIcon color="#fffe00" style={{fontSize:'64px'}} className="material-icons">videocam
                                            </FontIcon>
                                        </div>
                                        <div className= {css.recentActivityIconRight}>
                                            <h1>20</h1>
                                            <p>Video Views</p>
                                        </div>
                                    </div>
                                    <div className={css.recentActivityIcon} >
                                        <div className= {css.recentActivityIconLeft}>
                                            <FontIcon color="#fffe00" style={{fontSize:'64px'}} className="material-icons">assignment_turned_in
                                            </FontIcon>
                                        </div>
                                        <div className= {css.recentActivityIconRight}>
                                            <h1>54</h1>
                                            <p>Altmetric Score</p>
                                        </div>
                                    </div>
                                    <div className={css.recentActivityIcon} >
                                        <div className= {css.recentActivityIconLeft}>
                                            <FontIcon color="#fffe00" style={{fontSize:'64px'}} className="material-icons">cloud_download
                                            </FontIcon>
                                        </div>
                                        <div className= {css.recentActivityIconRight}>
                                            <h1>1270</h1>
                                            <p>Article Downloads</p>
                                        </div>
                                    </div>
                                    <div className={css.recentActivityIcon} >
                                        <div className= {css.recentActivityIconLeft}>
                                            <FontIcon color="#fffe00" style={{fontSize:'64px'}} className="material-icons">format_quote
                                            </FontIcon>
                                        </div>
                                        <div className= {css.recentActivityIconRight}>
                                            <h1>3</h1>
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
                                        <div className={css.activityLink} style={{zIndex : 6}} data-type="cartoon" onClick={this.publish}>
                                            Cartoon
                                            <IconButton tooltipStyles={{fontSize : '14px',zIndex : '100000'}} tooltipPosition="bottom-right" tooltip={cartoon} 
                                                style={{position : 'absolute',left : 0,top : '-10px',width : '100%'}}>
                                            </IconButton>
                                        </div>
                                    
                                    <div className={css.activityLink} style={{zIndex : 5}} data-type="poster" onClick={this.publish}>
                                        Poster
                                        <IconButton tooltipStyles={{fontSize : '14px',zIndex : '100000'}} tooltipPosition="bottom-right" tooltip={poster}
                                                style={{position : 'absolute',left : 0,top : '-10px',width : '100%'}}>
                                        </IconButton>
                                    </div>
                                    <div className={css.activityLink} style={{zIndex : 4}} data-type="flyer" onClick={this.publish}>
                                        Flyer
                                        <IconButton tooltip={flyer} tooltipPosition="bottom-right" tooltipStyles={{fontSize : '14px',zIndex : '100000'}}
                                                style={{position : 'absolute',left : 0,top : '-10px',width : '100%'}}>
                                        </IconButton>
                                    </div>
                                    <div className={css.activityLink} style={{zIndex : 3}} data-type="video" onClick={this.publish}>
                                        Video Abstract
                                        <IconButton tooltipStyles={{fontSize : '14px',zIndex : '100000'}} tooltipPosition="bottom-right" tooltip={video}
                                                style={{position : 'absolute',left : 0,top : '-10px',width : '100%'}}>
                                        </IconButton>
                                    </div>
                                    <div className={css.activityLink} style={{zIndex : 2}} data-type="landing" onClick={this.publish}>
                                        Landing Page
                                        <IconButton tooltipStyles={{fontSize : '14px',zIndex : '100000'}} tooltipPosition="bottom-right" tooltip={landing}
                                                style={{position : 'absolute',left : 0,top : '-10px',width : '100%'}}>
                                        </IconButton>
                                    </div>
                                    <div className={css.activityLink} style={{zIndex : 1}} data-type="powerpoint" onClick={this.publish}>
                                        Powerpoints
                                        <IconButton tooltipStyles={{fontSize : '14px',zIndex : '100000'}} tooltipPosition="bottom-right" tooltip={presentation}
                                                style={{position : 'absolute',left : 0,top : '-10px',width : '100%'}}>
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={css.right}>
                        <div className={cx(css.welcomeAd,css.card)} onClick={this.openInNewWindow}>Submit your next paper to Journal of Dual Diagnosis. Publication speed of 35 days.</div>
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
