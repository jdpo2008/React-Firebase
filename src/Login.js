import React, { Component } from 'react';
import * as firebaseCLASS from 'firebase';

import appConfig from './config/app.config';
import firebase from './config/database';

import LoginUI from './ui/Login';
import Notification from './components/Notification';

require('firebase/firestore');

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = { error: '', isLogin: true, show: true };
		this.authenticateLogin = this.authenticateLogin.bind(this);
		this.authenticateRegister = this.authenticateRegister.bind(this);
		this.changeIsLogin = this.changeIsLogin.bind(this);
		// this.showGoogleLogin = this.showGoogleLogin.bind(this);
	}

	changeIsLogin(isLogin) {
		this.setState({
			isLogin: isLogin
		});
	}

	authenticateLogin(username, password, displayName) {
		const displayError = (error) => {
			this.setState({ error: error });
		};
		firebase.app
			.auth()
			.signInWithEmailAndPassword(username, password)
			.then(function(data) {
				<Notification show="true" type="success" title="Bienvenido!" text="Yes, user is logged in" />;
				console.log('Yes, user is logged in');
			})
			.catch(function(error) {
				console.log(error.message);
				displayError(error.message);
			});
	}

	sendPasswordResetLink(emailAddress) {
		firebase.app
			.auth()
			.sendPasswordResetEmail(emailAddress)
			.then(function() {
				alert('Password reset email is sent on your email ' + emailAddress);
			})
			.catch(function(error) {
				alert(error.message);
			});
	}

	authenticateRegister(username, password, displayName) {
		const displayError = (error) => {
			this.setState({ error: error });
		};

		if (appConfig.adminConfig.allowRegistration) {
			firebase.app
				.auth()
				.createUserWithEmailAndPassword(username, password)
				.then(function() {
					firebase.app.auth().currentUser.updateProfile({
						displayName: displayName
					}),
						firebase.app.database().ref('users/' + firebase.app.auth().currentUser.uid).set({
							projectUser: true,
							displayName: displayName,
							numOfApps: 0,
							email: username,
							isGoogle: false
						});
				})
				.catch(function(error) {
					console.log(error.message);
					displayError(error.message);
				});
		} else {
			displayError('No se Permite registro en la aplicación');
		}
	}

	authWithGoogle() {
		// const displayError = (error) => {
		// 	this.setState({ error: error });
		// };
		var provider = new firebaseCLASS.auth.GoogleAuthProvider();
		provider.addScope('https://www.googleapis.com/auth/firebase.readonly');
		if (appConfig.adminConfig.allowGoogleAuth) {
			firebase.app
				.auth()
				.signInWithPopup(provider)
				.then(function(result) {
					var token = result.credential.accessToken;
					var url = 'https://firebase.googleapis.com/v1beta1/projects';
					request
						.get(url)
						.set('Content-Type', 'application/json')
						.set('Authorization', 'Bearer ' + token)
						.end(function(e, r) {
							console.log(r);
							console.log(e);
						});
					var usersPath = firebase.app.database().ref('/users/' + result.user.uid);
					usersPath.on('value', function(snapshot) {
						if (snapshot.val()) {
							console.log('User ' + result.user.email + ' logged in via Google');
						} else {
							usersPath.set({
								displayName: result.user.displayName,
								email: result.user.email,
								isGoogle: true
							});
						}
					});
				})
				.catch(function(error) {
					var errorMessage = error.message;
					//displayError(error.message);
					console.log(errorMessage);
				});
		} else {
			//displayError('No se Permite ingresar con google');
		}
	}

	showGoogleLogin() {
		if (appConfig.adminConfig.allowRegistration && appConfig.adminConfig.allowGoogleAuth) {
			return (
				<div className="d-flex p-1">
					<button onClick={this.authWithGoogle} className="btn btn-social btn-sm btn-google">
						<span className="fab fa-google" /> Google
					</button>
					<button className="btn  btn-social btn-sm btn-facebook">
						<span className="fab fa-facebook-f" /> Facebook
					</button>
					<button className="btn  btn-social btn-sm btn-twitter">
						<span className="fab fa-twitter" /> Twitter
					</button>
				</div>
			);
		} else {
			return <div />;
		}
	}

	render() {
		return (
			<LoginUI
				authWithGoogle={this.authWithGoogle}
				showGoogleLogin={this.showGoogleLogin}
				authenticate={this.state.isLogin ? this.authenticateLogin : this.authenticateRegister}
				error={this.state.error}
				isRegister={!this.state.isLogin}
				changeIsLogin={this.changeIsLogin}
				sendPasswordResetLink={this.sendPasswordResetLink}
			/>
		);
	}
}
