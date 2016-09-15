var React = require('react');
var css = require('./publish.css');
var UserStore = require('../store/UserStore');
var ajax = require('../ajax');
var PublishStore = require('./publish-store');
var {browserHistory} = require('react-router');

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
                console.log(response);
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
                            <button onClick={this.addNewFinding}>Add New</button>
                        </div>

                        <div className={css.findingsList}>
                            {this.state.findings.map((finding,i) => {
                                return (
                                    
                                    <div key={i} >
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
                        <button onClick={this.submit}>Submit</button>
                        <button onClick={this.preview}>Preview</button>
                    </div>
                </section>
            </div>
        );
    }

}

module.exports = Publish;
