import React from 'react';
import ReactDOM from 'react-dom';

import Login from './Login';
import App from './App';
import * as FirebaseSDK from 'firebase';

import appConfig from './config/app.config';

import firebase from './config/database';

firebase.app = FirebaseSDK.initializeApp(appConfig.firebaseConfig);
FirebaseSDK.analytics();

checkLoginStatus();

//AUTHENTICATION
var loggedIn = false;

function checkLoginStatus() {
	if (appConfig.firebaseConfig.apiKey) {
		firebase.app.auth().onAuthStateChanged(function(user) {
			if (user) {
				console.log('User is signed in ' + user.email);
				ReactDOM.render(<App />, document.getElementById('root'));
			} else {
				console.log('No user is signed in ');
				ReactDOM.render(<Login />, document.getElementById('root'));
			}
		});
	} else {
		console.log('No user is signed in, step 1 ');
		ReactDOM.render(<Login />, document.getElementById('root'));
	}
}
