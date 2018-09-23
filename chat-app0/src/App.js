import React,{ Component } from 'react';
import MessageListPage from './Components/MessageListPage';
import RoomList from './Components/RoomList';
import SendMessageForm from './Components/SendMessageForm';
import NewRoomForm from './Components/NewRoomForm';
import Chatkit from '@pusher/chatkit';
import './App.css';

import { instanceLocator, tokenUrl } from './config';

class App extends Component {

	constructor(props){
		super(props);
		this.state = {
			roomId: null,
			messages: [],
			joinableRooms: [],
			joinedRooms: []
		}
	}

	componentDidMount(){
		const chatManager = new Chatkit.ChatManager({
			instanceLocator,
			userId: 'sb',
			tokenProvider: new Chatkit.TokenProvider({
				url: tokenUrl
			})
		})

		chatManager.connect()
		.then(currentUser => {
			this.currentUser = currentUser
			this.getRooms();
		})
		.catch(err => console.log('error on connecting: ', err));
	}

	getRooms() {
		this.currentUser.getJoinableRooms()
			.then(joinableRooms => {
				this.setState({
					joinableRooms,
					joinedRooms: this.currentUser.rooms
				})
			})
		.catch(err => console.log('error joining rooms: ', err));
	}

	subscribeToRoom(roomId) {
		this.setState({ messages: []})
		this.currentUser.subscribeToRoom({
			roomId: roomId,
			hooks: {
				onNewMessage: message => {
					this.setState({
						messages: [...this.state.messages, message]
					})
				}
			}
		})
		.then(room => {
			this.setState({
				roomId: room.id
			})
			this.getRooms()
		})
		.catch(err => console.log('error subscribing rooms.', err));
	}

	sendMessage(text){
		this.currentUser.sendMessage({
			text: text,
			roomId: this.state.roomId
		})
	}

	createRoom(roomName){
		this.currentUser.createRoom({
			name: roomName
		})
		.then(room => this.subscribeToRoom(room.id))
		.catch(err => console.log(err));
	}

	render() {
	    return (
	    	<div>
		      <div className="frame">
		      	<RoomList
			      	roomId={this.state.roomId}
			      	rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
			      	subscribeToRoom={(roomId) => this.subscribeToRoom(roomId)}/>
		      	<MessageListPage
			      	roomId={this.state.roomId}
			      	injectedmessages={this.state.messages}
			      	currentUser={this.props.currentUser}/>
		      </div>
		      <div className="formframe">
		      	<NewRoomForm createRoom={(data) => this.createRoom(data)}/>
		      	<SendMessageForm
			      	disabled={!this.state.roomId}
			      	sendMessage={(roomName) => this.sendMessage(roomName)}/>
		      </div>
		    </div>
	    );
	}
}

export default App;