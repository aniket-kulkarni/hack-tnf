class PublishStore {

	constructor() {
		this.abstract = '';
		this.conclusion = '';
		this.findings = [];
	}

	setMetadata(abstract,conclusion,findings) {
		this.abstract = abstract;
		this.conclusion = conclusion;
		this.findings = findings;
	}

	getMetadata() {
		return {
			abstract : this.abstract,
			conclusion : this.conclusion,
			findings : this.findings
		};
	}

	resetMetadata() {
		this.abstract = '';
		this.conclusion = '';
		this.findings = [];
	}
}

var publishStore = new PublishStore();
module.exports = publishStore;
