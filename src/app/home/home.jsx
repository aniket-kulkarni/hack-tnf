var React = require('react');
var css = require('./home.css');
var cx = require('classnames');
var ajax = require('../ajax');

var {browserHistory} = require('react-router');

import FormsyText from 'formsy-material-ui/lib/FormsyText';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FontIcon from 'material-ui/FontIcon';

var UserStore = require('../store/UserStore');

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            canSubmitLogin : false,
            canSubmitRegister : false
        };
    }

    componentDidMount() {
    }

    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }

    enableLoginSubmitButton = () => {
        this.setState({
            canSubmitLogin : true
        });
    }

    disableLoginSubmitButton = () => {
        this.setState({
            canSubmitLogin : false
        });
    }

    login = () => {
        var model = this.refs.loginForm.getModel();
        ajax.login(model)
            .then((response) => {
                UserStore.setUser(response);
                browserHistory.replace('/dashboard');
            })
            .catch((err) => {
                alert(err);
            });
    }

    enableRegisterSubmitButton = () => {
        this.setState({
            canSubmitRegister : true
        });
    }

    disableRegisterSubmitButton = () => {
        this.setState({
            canSubmitRegister : false
        });
    }

    register = () => {
        var model = this.refs.registerForm.getModel();
        ajax.register(model);
    }

    render() {

        var loginLabel = 'Login';
        var registerLabel = 'Register';

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
                </header>
                <hr/>
                <section className={css.content}>
                    <div className={css.main}>
                        <div className={css.leftMain}>
                            
                            <section>
                                <h2 className={css.cardHeading}>Lets talk Product</h2>
                                <p>
                                    This is the paragraph where you can write more details about your product. Keep you user engaged by providing meaningful information. Remember that by this time, the user is curious, otherwise he wouldn't scroll to get here. Add a button if you want the user to see more.
                                </p>
                            </section>

                            <section className={css.attract}>
                                <div className={css.attractItem}>
                                    <div className={css.icon}>
                                        <FontIcon color="#424242" style={{fontSize:'48px'}} 
                                            className="material-icons">create
                                        </FontIcon>
                                    </div>
                                    <p>
                                        Chocolate cake pastry cake cake macaroon croissant chocolate lemon drops candy canes. Halvah dessert tootsie roll cake sweet roll cookie biscuit cake. 
                                    </p>
                                </div>
                                <div className={css.attractItem}>
                                    <div className={css.icon}>
                                        <FontIcon color="#3b94d9" style={{fontSize:'48px'}} 
                                            className="material-icons">language
                                        </FontIcon>
                                    </div>
                                    <p>
                                        Chocolate cake pastry cake cake macaroon croissant chocolate lemon drops candy canes. Halvah dessert tootsie roll cake sweet roll cookie biscuit cake. 
                                    </p>
                                </div>
                                <div className={css.attractItem}>
                                    <div className={css.icon}>
                                        <FontIcon color="#5D4037" style={{fontSize:'48px'}} 
                                            className="material-icons">weekend
                                        </FontIcon>
                                    </div>

                                    <p>
                                        Chocolate cake pastry cake cake macaroon croissant chocolate lemon drops candy canes. Halvah dessert tootsie roll cake sweet roll cookie biscuit cake. 
                                    </p>
                                </div>
                            </section>
                        </div>
                        <div className={css.rightMain}>
                            <div className={css.loginBox}>
                                <div className={css.loginHeading}>Existing user? Sign in</div>
                                <div className={css.loginBody}>

                                    <Formsy.Form onValid={this.enableLoginSubmitButton} ref="loginForm"
                                        onInvalid={this.disableLoginSubmitButton} onValidSubmit={this.login}>

                                        <FormsyText
                                            name="emailId"
                                            ref="emailId"
                                            validations="isEmail"
                                            validationError="Invalid Email"
                                            required
                                            hintText="Email"
                                            floatingLabelText="Email"
                                            style={{marginTop : -15}} 
                                            inputStyle={{fontSize : '15px'}}                               
                                            hintStyle={{fontSize : '15px'}} 
                                            fullWidth={true}                              
                                        />

                                        <br/>

                                        <FormsyText
                                            name="password"
                                            ref="password"
                                            type="password"
                                            validations="minLength:3"
                                            validationError="Password should be min 6 characters"
                                            required
                                            hintText="Password"
                                            floatingLabelText="Password" 
                                            style={{marginTop : -15}} 
                                            hintStyle={{fontSize : '15px'}}                               
                                            inputStyle={{fontSize : '15px'}} 
                                            fullWidth={true}                              
                                        />

                                        <br/>

                                        <RaisedButton
                                            type="submit"
                                            ref="submit"
                                            label={loginLabel}
                                            style={{marginTop : 10}}
                                            secondary={true} 
                                            disabled={!this.state.canSubmitLogin}
                                        />

                                    </Formsy.Form>
                                    
                                </div>
                            </div>

                             <div className={cx(css.loginBox,css.registerBox)}>
                                <div className={css.loginHeading}>New user? Create an Account </div>
                                <div className={css.loginBody}>

                                    <Formsy.Form onValid={this.enableRegisterSubmitButton} ref="registerForm"
                                        onInvalid={this.disableRegisterSubmitButton} onValidSubmit={this.register}>

                                        <FormsyText
                                            name="name"
                                            ref="name"
                                            validations="isAlpha"
                                            validationError="Invalid Name"
                                            required
                                            hintText="Name"
                                            floatingLabelText="Name"
                                            style={{marginTop : -15}} 
                                            inputStyle={{fontSize : '15px'}}                               
                                            hintStyle={{fontSize : '15px'}} 
                                            fullWidth={true}                              
                                        />

                                        <br/> 

                                        <FormsyText
                                            name="emailId"
                                            ref="emailId"
                                            validations="isEmail"
                                            validationError="Invalid Email"
                                            required
                                            hintText="Email"
                                            floatingLabelText="Email"
                                            style={{marginTop : -15}} 
                                            fullWidth={true}                              
                                            inputStyle={{fontSize : '15px'}}                               
                                            hintStyle={{fontSize : '15px'}}                               
                                        />

                                        <br/>

                                        <FormsyText
                                            name="password"
                                            ref="password"
                                            type="password"
                                            validations="minLength:6"
                                            validationError="Password should be min 6 characters"
                                            required
                                            hintText="Password"
                                            floatingLabelText="Password" 
                                            style={{marginTop : -15}} 
                                            fullWidth={true}                              
                                            hintStyle={{fontSize : '15px'}}                               
                                            inputStyle={{fontSize : '15px'}}                               
                                        />

                                        <br/>

                                        <FormsyText
                                            name="confirmPassword"
                                            ref="confirmPassword"
                                            type="password"
                                            validations="equalsField:password"
                                            validationError="Should be same as Password"
                                            required
                                            hintText="Confirm Password"
                                            floatingLabelText="Confirm Password"
                                            fullWidth={true}                              
                                            style={{marginTop : -15}} 
                                            hintStyle={{fontSize : '15px'}}                               
                                            inputStyle={{fontSize : '15px'}} 
                                        />

                                        <br/>

                                        <RaisedButton
                                            type="submit"
                                            ref="submit"
                                            label={registerLabel}
                                            style={{marginTop : 10}}
                                            secondary={true} 
                                            disabled={!this.state.canSubmitRegister}
                                        />

                                    </Formsy.Form>
                                    
                                </div>
                            </div>


                        </div>
                    </div>

                     <section className={css.services}>
                                <h2>Our Services</h2>
                                <p className={css.servicesDesc}>
                                    We are driven by perfectionism and the urge to create high quality WordPress themes and
                                    provide premium and dedicated support to our customers.
                                </p>
                                <div className={css.servicesList}>
                                    <div className={css.serviceItem}>
                                        <div className={css.serviceItemBullet}>

                                            <h4>Cartoon</h4>
                                            <div className={css.bulletDesc}>Your website will display beautifully and intuitively on all devices.
                                            </div>
                                        </div>
                                        <div className={css.serviceItemBullet}>

                                            <h4>Flyer</h4>
                                            <div className={css.bulletDesc}>Your website will display beautifully and intuitively on all devices.
                                            </div>
                                        </div>
                                        <div className={css.serviceItemBullet}>

                                            <h4>Video Abstract</h4>
                                            <div className={css.bulletDesc}>Your website will display beautifully and intuitively on all devices.
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className={cx(css.serviceItem,css.phoneItem)}>
                                        <img src="images/phone.png"/>
                                    </div>

                                    <div className={css.serviceItem}>
                                        <div className={css.serviceItemBullet}>

                                            <h4>Poster</h4>
                                            <div className={css.bulletDesc}>Your website will display beautifully and intuitively on all devices.
                                            </div>
                                        </div>
                                        <div className={css.serviceItemBullet}>

                                            <h4>Landing Page</h4>
                                            <div className={css.bulletDesc}>Your website will display beautifully and intuitively on all devices.
                                            </div>
                                        </div>
                                        <div className={css.serviceItemBullet}>

                                            <h4>Power Points </h4>
                                            <div className={css.bulletDesc}>Your website will display beautifully and intuitively on all devices.
                                            </div>
                                         </div>
                                    </div>
                                </div>

                            </section>
                </section>
            </div>
        );
    }

}

Home.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};


module.exports = Home;
