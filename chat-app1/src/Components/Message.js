import React,{ Component } from 'react';

class Message extends Component {
	render(){
		return(
			<div >
				<ul>
					<li className='replies'>
						<h6>{this.props.username}</h6>
						<p>{this.props.text}</p>
					</li>
				</ul>
			</div>
		)
	}
}

export default Message