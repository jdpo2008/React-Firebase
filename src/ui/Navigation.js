import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import appConfig from '../config/app.config';
import firebase from '../config/database';

var md5 = require('md5');
const ConditionalDisplay = ({ condition, children }) => (condition ? children : <div />);

export default class Navigation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: {}
		};

		this.createUserView = this.createUserView.bind(this);
		this.checkIsSuperAdmin = this.checkIsSuperAdmin.bind(this);
	}

	componentDidMount() {
		this.authListener();
	}

	authListener() {
		const setUser = (user) => {
			this.setState({ user: user });
		};

		//Now do the listner
		firebase.app.auth().onAuthStateChanged(function(user) {
			if (user) {
				setUser(user);
				// User is signed in.
				console.log('User has Logged  in Master');
				console.log(user.email);
			} else {
				// No user is signed in.
				console.log('User has logged out Master');
			}
		});
	}

	createUserView() {
		if (this.props.user) {
			var userPhoto = this.props.user.photoURL
				? this.props.user.photoURL
				: 'http://www.gravatar.com/avatar/' + md5(this.props.user.email + '') + '?s=512';
		}

		return (
			<li className="nav-item dropdown">
				<a
					href="#"
					className="nav-link dropdown-toggle"
					data-toggle="dropdown"
					id="navbarDropdown"
					role="button"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false"
				>
					<img alt="" className="img-circle img-responsive" src={userPhoto} />
					{this.getFirstName(this.state.user.displayName)}
				</a>
				{this.checkIsSuperAdmin()}
			</li>
		);
	}

	checkIsSuperAdmin() {
		var isSuperAdmin = false;
		if (appConfig.adminConfig.adminUsers) {
			appConfig.adminConfig.adminUsers.map((user) => {
				if (firebase.app.auth().currentUser.email === user) {
					isSuperAdmin = true;
				}
			});
		}
		if (isSuperAdmin)
			return (
				<div className="dropdown-menu" role="menu" aria-labelledby="navbarDropdown">
					<li>
						<Link className="dropdown-item" to="/account">
							Account'
						</Link>
					</li>
					<li>
						<Link className="dropdown-item" to="settings/rab_saas_site">
							Settings
						</Link>
					</li>
					<li className="divider" />
					<li role="button">
						<a className="dropdown-item" onClick={this.handleLogout}>
							Logout
						</a>
					</li>
				</div>
			);
		else
			return (
				<div className="dropdown-menu" role="menu" aria-labelledby="navbarDropdown">
					<li>
						<Link className="dropdown-item" to="/account">
							Account
						</Link>
					</li>
					<div class="dropdown-divider" />
					<li role="button">
						<a className="dropdown-item" onClick={this.handleLogout}>
							Logout'
						</a>
					</li>
				</div>
			);
	}

	handleLogout(e) {
		e.preventDefault();

		console.log('The link was clicked.');
		firebase.app.auth().signOut();
	}

	getFirstName(userDisplayName) {
		if (userDisplayName) {
			var splitUserName = userDisplayName.split(' ');
			return <span style={{ color: '#e91e63' }}>{splitUserName[0]}</span>;
		}
	}

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item active">
							<a className="nav-link" href="#">
								Dashboard <span class="sr-only">(current)</span>
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">
								Link
							</a>
						</li>
						{/* <ConditionalDisplay condition={this.state.user.displayName}>
							<li className="nav-item" style={{ paddingTop: '10px' }}>
								<Link
									className="nav-link"
									to="/account"
									style={{ paddingLeft: '73px', paddingRight: '2px' }}
								>
									Hello, {this.getFirstName(this.state.user.displayName)}
								</Link>
							</li>
						</ConditionalDisplay> */}
						{this.createUserView()}
					</ul>
					{this.props.search ? (
						<form className="form-inline my-2 my-lg-0" role="search" style={{ paddingTop: '13px' }}>
							<div className="form-group form-search is-empty">
								<input
									type="search"
									onChange={this.props.onChange}
									className="form-control mr-sm-2"
									value={this.props.filter}
									placeholder="Search apps"
								/>
							</div>
						</form>
					) : (
						<div />
					)}
				</div>
			</nav>
		);
	}
}
