var React = require('react');
var css = require('./preview.css');
var PublishStore = require('./publish-store');
var cx = require('classnames');

class Preview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        	metadata : PublishStore.getMetadata()
        };
    }

    componentDidMount() {
    }

    render() {

    	var {metadata} = this.state;

    	var className = metadata.findings.length === 1 ? css.single : css.multiple;

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
