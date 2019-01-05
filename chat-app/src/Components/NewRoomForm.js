import React,{ Component } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

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
			<div className='form0'>
				<form onSubmit={(data) => this.onSubmit(data)}>
					<input
						className='bottom-bar'
						onChange={(data) => this.onChange(data)}
						value={this.state.roomName}
						type="text" placeholder="Create Room with a '#'tag." required/>
					<Button mini={true} className='sendbutton' type="submit">
						<AddIcon />
					</Button>
				</form>
			</div>
		)
	}
}

export default NewRoomForm