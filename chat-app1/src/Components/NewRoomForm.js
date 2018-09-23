import React,{ Component } from 'react';

class NewRoomForm extends Component {
	constructor() {
		super();
		this.state = {
			roomName: ''
		}
	}

	onChange(data) {
		this.setState({
			roomName: data.target.value
		})
	}

	onSubmit(data) {
		data.preventDefault()
		this.props.createRoom(this.state.roomName);
		this.setState({roomName: ''})
	}

	render(){
		return(
			<div className='formwidth0'>
				<form onSubmit={(data) => this.onSubmit(data)}>
					<input
						className='bottom-bar'
						onChange={(data) => this.onChange(data)}
						value={this.state.roomName}
						type="text" placeholder="Create Room with a '#'tag." required/>
					<button className='sendbutton' type="submit">+</button>
				</form>
			</div>
		)
	}
}

export default NewRoomForm