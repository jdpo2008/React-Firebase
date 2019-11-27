import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from './ui/Navigation';

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Router>
				<Navigation />
				{/* <Route path="/" component={Billing} /> */}
				{/* <Route path="/billing" component={Billing} />
				<Route path="/translation/preview" component={Translations} />
				<Route path="/translations" loadedPath="/translations/" component={Fireadmin} />
				<Route path="/translations/:sub" loadedPath="/translations/" component={Fireadmin} />
				<Route path="/settings" loadedPath="/settings/" component={Fireadmin} /> */}
			</Router>
		);
	}
}

export default App;
