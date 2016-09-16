var React = require('react');
var css = require('./publish.css');
var UserStore = require('../store/UserStore');
var ajax = require('../ajax');
var PublishStore = require('./publish-store');
var {browserHistory} = require('react-router');
import RaisedButton from 'material-ui/RaisedButton';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class Publish extends React.Component {

    constructor(props) {
        super(props);
        
        var type = props.location.query.type;

        this.state = {
            abstract : '',
            conclusion : '',
            findings : [
                {value : '',locations : []}
            ],
            isLoading : false,
            type : type
        };
    }

    componentDidMount() {
    }

    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }

    addNewFinding = () => {
        var findings = this.state.findings;
        findings.push({value : '',locations : []});
        this.setState({findings});
    }

    updateAbstract = (e) => {
        this.setState({
            abstract : e.target.value
        });
    }

    updateConclusion = (e) => {
        this.setState({
            conclusion : e.target.value
        });
    }

    updateFinding = (e) => {
        var findings = this.state.findings;
        var index = e.target.dataset.index;
        findings[index].value = e.target.value;
        this.setState({findings});
    }

    uploadImages = (e) => {
        var target = e.target.parentNode;
        var data  = new FormData(target);
        var index = target.dataset.index;
        //data.append("photos", target.files);
        ajax.uploadPhotos(data)
            .then((response) => {
                var findings = this.state.findings;
                response.forEach((responseItem) => {
                    findings[index].locations.push(responseItem.location);
                });
                this.setState({
                    isLoading : false
                });
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    isLoading : false
                });
            })
        this.setState({
            isLoading : true
        });
    }

    submit = () => {
        ajax.submitRecord(this.state)
            .then((response) => {
                alert('Submitted');
                var {abstract,conclusion,findings} = this.state;
                PublishStore.setMetadata(abstract,conclusion,findings);
                browserHistory.push('/preview/type/'+this.state.type)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    preview = () => {
        var {abstract,conclusion,findings} = this.state;
        PublishStore.setMetadata(abstract,conclusion,findings);
        browserHistory.push('/preview/type/'+this.state.type)
    }

    render() {
        return (
            <div className={css.root}>
                {this.state.isLoading && 
                    <div className={css.loadingWrap}>
                        <div className={css.loadingText}> Uploading Images ...</div>
                    </div>
                }
                <header className={css.header}>
                    <div className={css.logoWrap}>
                       <div className={css.logoWrap}>
                            <a href="/dashboard"> <img src="../images/logo.png" alt=""/></a>
                       </div>
                    </div>
                </header>
                <section className={css.content}>
                    <div className={css.abstract}>
                        <div className={css.abstractTitle}>
                            Abstract
                        </div>

                        <div className={css.abstractText}>
                            <textarea
                                onChange={this.updateAbstract} value={this.state.abstract} 
                            />
                        </div>
                
                    </div>


                    <div className={css.findings}>
                        <h2>Findings</h2>
                        <div className={css.addNewFinding}>
                            <RaisedButton
                                type="submit"
                                ref="submit"
                                label="Add New"
                                secondary={true} 
                                onClick={this.addNewFinding}
                            />
                        </div>

                        <div className={css.findingsList}>
                            {this.state.findings.map((finding,i) => {
                                return (
                                    
                                    <div key={i} className={css.findingItemItem}>
                                        <textarea data-index={i} 
                                            onChange={this.updateFinding} value={finding.value} />
                                        <br/>

                                        <div className={css.findingItem}>
                                            <form method="post" encType="multipart/form-data" data-index={i}>
                                                <input onChange={this.uploadImages} multiple type="file" name="photos"/>
                                            </form>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>


                    <div className={css.conclusion}>
                        <div className={css.abstractTitle}>
                            Conclusion
                        </div>

                        <div className={css.abstractText}>
                            <textarea
                                onChange={this.updateConclusion} value={this.state.conclusion} 
                            />
                        </div>
                    </div>

                    <div className={css.submitWrap}>

                        <RaisedButton
                            type="submit"
                            ref="submit"
                            label="Submit"
                            primary={true} 
                            onClick={this.submit}
                        />

                        <RaisedButton
                            type="preview"
                            ref="preview"
                            label="Preview"
                            primary={true} 
                            style={{marginLeft : '15px'}}
                            onClick={this.preview}
                        />
                       
                    </div>
                </section>
            </div>
        );
    }

}


Publish.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

module.exports = Publish;
