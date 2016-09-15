class UserStore {
	
	constructor() {
		var storage = localStorage.getItem('response');

		this.user = {};
		this.token = '';

		if (storage) {
			var response = JSON.parse(storage);
			this.user = response.user;
			this.token = response.token;	
		}
	}

	setUser(response) {
		localStorage.setItem('response',JSON.stringify(response));
		this.user = response.user;
		this.token = response.token;
	}

	removeUser() {

		this.user = {};
		this.token = '';
	}

	getToken() {
		return this.token;
	}

	getUserName() {
		return this.user.name;
	}

}

var exportsModule = new UserStore();
window.aniket = exportsModule;
module.exports = exportsModule;