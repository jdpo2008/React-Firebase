import React, { Component } from 'react';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

import appConfig from '../config/app.config';

const ConditionalDisplay = ({ condition, children }) => (condition ? children : <div />);

const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

export default class LoginUI extends Component {
	constructor(props) {
		super(props);
		this.state = { username: '', password: '', displayName: '', isGoing: false, isAccept: false, errors: {
			displayName: '',
			email: '',
			password: '',
		}};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		let errors = this.state.errors;

		switch (name) {
			case 'displayName': 
			  errors.displayName = 
				value.length < 5
				  ? 'Full Name must be 5 characters long!'
				  : '';
			  break;
			case 'username': 
			  errors.username = 
				value.length > 1
				  ? ''
				  : 'El Email es requerido';
			break;  
			case 'username': 
			  errors.username = 
				validEmailRegex.test(value)
				  ? ''
				  : 'Email is not valid!';
			  break;
			case 'password': 
			  errors.password = 
				value.length < 8
				  ? 'Password must be 8 characters long!'
				  : '';
			  break;
			default:
			  break;
		}
		this.setState({errors, [name]: value}, ()=> {})
	}

	handleSubmit(event) {
		this.props.authenticate(this.state.username, this.state.password, this.state.displayName);
		event.preventDefault();
	}

	render() {
		const isInvalidLogin =
			this.state.password === '' ||
			this.state.username === '';

		const isInvalidRegister =
			this.state.password === '' ||
			this.state.displayName === '' ||
			this.state.username === '';

		const {errors} = this.state;

		return (
			<div>
				<div className="container">
					<div className="row justify-content-center align-self-center">
						<div className="col-md-4">
							<div className="card mt-2">
								<div className="text-center mt-2">
									<h5 className="text-info">
										{this.props.isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}
									</h5>
								</div>
								{this.props.showGoogleLogin()}
								<div className="card-body">
									{this.props.isRegister ? (
										<form onSubmit={this.handleSubmit}>
											<div className="form-group">
												<div className="input-group">
													<div className="input-group-prepend">
														<span className="input-group-text">
															<i className="fal fa-user" />
														</span>
													</div>
													<input
														className="form-control"
														name="displayName"
														type="text"
														placeholder="Nombre"
														value={this.state.displayName}
														onChange={this.handleInputChange}
													/>
												</div>
											</div>
											<div className="form-group">
												<div className="input-group">
													<div className="input-group-prepend">
														<span className="input-group-text">
															<i className="fal fa-user" />
														</span>
													</div>
													<input
														className="form-control"
														name="username"
														type="mail"
														placeholder="Correo"
														value={this.state.username}
														onChange={this.handleInputChange}
													/>
												</div>
											</div>
											<div className="form-group">
												<div className="input-group">
													<div className="input-group-prepend">
														<span className="input-group-text">
															<i className="fal fa-unlock-alt" />
														</span>
													</div>
													<input
														className="form-control"
														name="password"
														type="password"
														placeholder="Password"
														value={this.state.password}
														onChange={this.handleInputChange}
													/>
												</div>
											</div>
											<div className="form-group mt-2">
												<label>
													<BootstrapSwitchButton
														checked={this.state.isGoing}
														onlabel="Si"
														offlabel="No"
														size="xs"
														onstyle="success"
														offstyle="danger"
														onChange={(checked) => {
															this.setState({ isAccept: checked });
														}}
													/>
													<span className="text-info" style={{ fontSize: '.9em' }}>
														<strong> Acepto las Condiciones</strong>
													</span>
												</label>
											</div>
											<div className="form-group mt-2">
												<input
													type="submit"
													className="btn btn-block btn-primary"
													value="Submit"
													disabled= {(isInvalidRegister || this.state.isAccept)}
												/>
											</div>
											<ConditionalDisplay condition={appConfig.adminConfig.allowRegistration}>
												<div style={{ textAlign: 'center' }}>
													<a
														onClick={() => {
															this.props.changeIsLogin(true);
														}}
														role="button"
														className="text-info"
													>
														<strong>Ya tienes Cuenta?</strong> Inicia Sesión!
													</a>
												</div>
											</ConditionalDisplay>
										</form>
									) : (
										<form onSubmit={this.handleSubmit}>
											<div className="form-group">
												<div className="input-group">
													<div className="input-group-prepend">
														<span className="input-group-text">
															<i className="fal fa-user" />
														</span>
													</div>
													<input
														className="form-control"
														name="username"
														type="email"
														placeholder="Correo"
														value={this.state.username}
														onChange={this.handleInputChange}
														required
													/>
												</div>
												{this.state.errors.username != '' && <span className='error'>{errors.username}</span>}
											</div>
											<div className="form-group">
												<div className="input-group">
													<div className="input-group-prepend">
														<span className="input-group-text">
															<i className="fal fa-unlock-alt" />
														</span>
													</div>
													<input
														className="form-control"
														name="password"
														type="password"
														placeholder="Password"
														value={this.state.password}
														onChange={this.handleInputChange}
														required
													/>
												</div>
											</div>
											<div className="form-group d-flex mt-2">
												<label>
													<BootstrapSwitchButton
														checked={this.state.isGoing}
														onlabel="Si"
														offlabel="No"
														size="xs"
														onstyle="success"
														offstyle="danger"
														onChange={(checked) => {
															this.setState({ isGoing: checked });
														}}
													/>
													<span className="text-info" style={{ fontSize: '.9em' }}>
														<strong> Recordarme</strong>
													</span>
												</label>
												<a href="#" className="text-info" style={{ fontSize: '.9em' }}>
													<strong>Olvidó su Contraseña?</strong>
												</a>
											</div>
											<div className="form-group mt-2">
												<input
													type="submit"
													className="btn btn-block btn-primary"
													value="Submit"
													disabled= {isInvalidLogin}
												/>
											</div>
											<ConditionalDisplay condition={appConfig.adminConfig.allowRegistration}>
												<div style={{ textAlign: 'center' }}>
													<a
														onClick={() => {
															this.props.changeIsLogin(false);
														}}
														role="button"
														className="text-info"
													>
														<strong>No tienes una Cuenta?</strong>
													</a>
												</div>
											</ConditionalDisplay>
										</form>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
