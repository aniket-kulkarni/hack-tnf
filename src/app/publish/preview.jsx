var React = require('react');
var css = require('./preview.css');
var UserStore = require('../store/UserStore');
var PublishStore = require('./publish-store');
require('../serialize.js')
var cx = require('classnames');
var ajax = require('../ajax');

class Preview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        	metadata : PublishStore.getMetadata(),
        	isLoading : true,
        	url : ''
        };
    }

    componentDidMount() {
    }

    downloadPDF = () => {
		
		var formData = new FormData();
		var content = document.body.parentElement.outerHTML;
    	var blob = new Blob([JSON.stringify(content, null, 2)], {type : 'text/html'});
    	formData.append('photos',blob);
		ajax.uploadPhotos(formData)
			.then((response) => {
				var location = response[0].location;
				//this.setState({isLoading : false,url : location});
				ajax.downloadPDF(location)
					.then((blob) => {
						//var blob=new Blob([res]);
			            var link=document.createElement('a');
			            link.href=window.URL.createObjectURL(blob);
			            link.download="Dossier_"+new Date()+".pdf";
			            link.click();
					})
					.catch((error) => {
						alert('Error='+error);
					})
			})
			.catch((err) => {
				alert('Error=' + err);
			});
    }

    render() {
		
    	var {metadata} = this.state;

    	var className = metadata.findings.length === 1 ? css.single : css.multiple;
    	var name = UserStore.getUserName();
    	var nameArr = name.split(' ');
    	var initial = '';
    	if (nameArr.length === 1) {
			initial = name;
    	} else {
	    	nameArr.forEach((init) => {
				initial = initial + init[0].toUpperCase();
	    	});
    	}
    	var tweet = initial;
                //<a href="#" onClick={this.downloadPDF}>Download PDF</a>

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

                <a className="twitter-share-button"
                  href={`https://twitter.com/intent/tweet?hashtags=MyResearchStory${tweet}`}
                  data-size="large">
                Tweet</a>

                <section className={css.content}>
					<h2 className={css.abstract}>
						{metadata.abstract}
					</h2>

					<div className={cx(css.findings,className)}>
						{
							metadata.findings.map((finding,index) => {
								return (
									<div key={index} className={css.finding}>
										<div className={css.findingWrap}>
											<img className={css.findingImage} src={finding.locations[0]} alt="location"/>
											<hr />
											<div className={css.findingText}>{finding.value}</div>
										</div>	
									</div>
								);
							})
						}
					</div>

					<div className={cx(css.conclusion,css.card)}>
						{metadata.conclusion}
					</div>
                </section>
            </div>
        );
    }

}

module.exports = Preview;
