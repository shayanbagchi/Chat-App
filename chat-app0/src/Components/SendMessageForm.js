import React,{Component} from 'react';

class SendMessageForm extends Component {

	constructor(){
		super()
		this.state = {
			message: ''
		}
	}

	onChange(data){
		this.setState({
			message: data.target.value
		})
	}

	onSubmit(data) {
		data.preventDefault()
		this.props.sendMessage(this.state.message)
		this.setState({
			message: ''
		})
	}

	render(){
		return(
			<div className='formwidth1'>
				<form
				onSubmit={(data) => this.onSubmit(data)} // skipping the "bind" method.!
				>
					<input
					className='bottom-bar'
					disabled={this.props.disabled}
					onChange={(data) => this.onChange(data)} // skipping the "bind" method.!
					value={this.state.message}
					placeholder="write your message."
					type="text"/>
					<button className='sendbutton' type="submit">+</button>
				</form>
			</div>
		);
	}
}

export default SendMessageForm