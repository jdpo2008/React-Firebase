import React, { Component} from 'react';
import SweetAlert from 'sweetalert2-react';

class Notification extends Component {
	constructor(props) {
		super(props);
		this.state = { show: true };
	}
	render() {
		if (this.state.show) {
			return (
				<SweetAlert
                    show={this.state.show}
                    type={this.props.type}
					title={this.props.title}
					text={this.props.text}
					onConfirm={() => this.setState({ show: false })}
				/>
			);
		} else {
			return <div />;
		}
	}
}

export default Notification;
