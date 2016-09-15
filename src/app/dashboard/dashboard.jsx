var React = require('react');
var css = require('./dashboard.css');
var UserStore = require('../store/UserStore');
var cx = require('classnames');
var ajax = require('../ajax');
var {browserHistory} = require('react-router');

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
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
                            <div className={css.recentActivity}></div>
                            <div className={css.newActivity}>
                                <div className={css.activityLink} data-type="cartoon" onClick={this.publish}>Cartoon</div>
                                <div className={css.activityLink} data-type="poster" onClick={this.publish}>Poster</div>
                                <div className={css.activityLink} data-type="flyer" onClick={this.publish}>Flyer</div>
                                <div className={css.activityLink} data-type="video" onClick={this.publish}>Video Abstract</div>
                                <div className={css.activityLink} data-type="landing" onClick={this.publish}>Landing Page</div>
                                <div className={css.activityLink} data-type="powerpoint" onClick={this.publish}>Powerpoints</div>
                            </div>
                        </div>
                    </div>
                    <div className={css.right}>
                        <div className={cx(css.welcome,css.card)}>Ad PlaceHoler</div>
                        <div className={cx(css.activity,css.card)}>
                            <a className="twitter-timeline"  href="https://twitter.com/search?q=%40tandfauthorserv" data-widget-id="776496587132526593">Tweets about @tandfauthorserve</a>
                        </div>
                        
                    </div>
                </section>
            </div>
        );
    }

}

module.exports = Dashboard;
