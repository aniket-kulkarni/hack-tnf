var BASE_URL = 'http://ec2-52-27-11-189.us-west-2.compute.amazonaws.com:443';
var UserStore = require('./store/UserStore');

function login(model) {
	var url = BASE_URL + '/api/auth/login';
	var params = {
		method : 'POST',
		body : JSON.stringify(model),
		headers: new Headers({
		    'Content-Type': 'application/json',
		    Accept: 'application/json',
		})
	};

	return (
		ajax(url,params,true)
	);
}

function logout(token) {
	var url = BASE_URL + '/api/auth/logout';
	var params = {
		method : 'POST',
		body : JSON.stringify({}),
		headers: new Headers({
			token,
		    'Content-Type': 'application/json',
		    Accept: 'application/json',
		})
	};

	return (
		ajax(url,params,true)
	);
}

function register(model) {
	var url = BASE_URL + '/api/auth/register';
	var headers = {};
	headers['Content-Type'] = 'application/json'; 
	var params = {
		method : 'POST',
		body : JSON.stringify(model),
		headers: new Headers({
		    'Content-Type': 'application/json',
		    Accept: 'application/json',
		})
	};

	return (
		ajax(url,params,true).
			then((response) => {
				console.log(response);
			})	
			.catch((err) => {
				console.log(err);
			})		
	);
}

function uploadPhotos(photos) {

	var url = BASE_URL + '/api/data/upload/image';

	var params = {
		method : 'POST',
		body : photos,
		headers: new Headers({
		    'token': UserStore.getToken()
		})
	};

	return (
		ajax(url,params,true)
	);	
}

function submitRecord(state) {

	var url = BASE_URL + '/api/data/metadata';
	var metadata = {
		metadata : state
	};

	var params = {
		method : 'POST',
		body : JSON.stringify(metadata),
		headers: new Headers({
		    'Content-Type': 'application/json',
		    Accept: 'application/json',
		    'token': UserStore.getToken()
		})
	};

	return (
		ajax(url,params,true).
			then((response) => {
				console.log(response);
			})	
			.catch((err) => {
				console.log(err);
			})		
	);	
}

function downloadPDF(url) {
	
	var url = BASE_URL + '/api/data/getPdf/1';
	var metadata = {
		url : url
	};

	var params = {
		method : 'POST',
		body : JSON.stringify(metadata),
		headers: new Headers({
		    'Content-Type': 'application/json',
		    Accept: 'application/json',
		    'token': UserStore.getToken()
		})
	};

	return (
		ajax(url,params,false)
	);
}

function ajax(url,params,acceptJSON) {

	return new Promise(function(resolve,reject) {
		
		fetch(url,params)
			.then((response) => {

				let status = response.status;

				if (status === 204) {
				    resolve();
				}
				    
				else if (status >= 200 && status < 300) {

					if (response.headers.get('Content-Type').includes('text/pdf')) {
						response.blob().then((blob) => {
				            resolve(blob);
				        })
				        .catch((err) => {
				            resolve(err);
				        });
					}

				    else if(acceptJSON) {
				        response.json().then((data) => {
				            resolve(data);
				        })
				        .catch((err) => {
				            resolve(err);
				        });
				    } else {
				        response.text().then((data) => {
				            resolve(data);
				        })
				        .catch((err) => {
				            resolve(err);
				        });
				    }
				}
				else {

				    response.json().then((error) => {
				        
				        if (status === 401 && error.invalid_token === true) {
				           // alt.dispatcher.dispatch({action : AuthActions.FORCE_LOGOUT});
				        }
				        else {
				            if (!error.message) {
				                error.message = 'Something is Wrong';
				            }
				            reject({status,error});    
				        }
				        
				    })
				    .catch(() => {
				        var error = {message : 'Something is Wrong'};
				        reject({status,error});
				    });
				}
			})
			.catch((rejection) => {
				alert('Something is Wrong');
			})

	});

	
}

module.exports = {
	register,
	login,
	logout,
	uploadPhotos,
	submitRecord,
	downloadPDF
}
