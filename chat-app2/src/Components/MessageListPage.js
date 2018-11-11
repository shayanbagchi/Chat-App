import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';

class MessageListPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			messages: [],
		}
	}

	componentWillUpdate() {
		const node = ReactDOM.findDOMNode(this);
		this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
	}

	componentDidUpdate() {
		if (this.shouldScrollToBottom) {
			const node = ReactDOM.findDOMNode(this);
			node.scrollTop = node.scrollHeight
		}

	}

	onMessage(){
		this.setState({
			messages: this.state.messages
		})
	}

	render(){
		if(!this.props.roomId){
			return(
				<div>
					<h2 className='tc'>Join a Room!</h2>
				</div>
			)
		}
		return (
			<div className='content'>
				<div className='messages'>
					{this.props.injectedmessages.map((message, index) => {
						return(
							<Message key={index} username={message.senderId} text={message.text}/>
						);
					})}
				</div>
			</div>
		);
	}
}

export default MessageListPage