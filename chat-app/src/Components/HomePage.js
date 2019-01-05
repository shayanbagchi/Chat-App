import React,{ Component } from 'react';
import MessageListPage from './MessageListPage';
import RoomList from './RoomList';
import SendMessageForm from './SendMessageForm';
import NewRoomForm from './NewRoomForm';

import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import { instanceLocator, tokenUrl } from '../config';

import '../App.css';
import Grid from '@material-ui/core/Grid';

class HomePage extends Component {
	constructor(props){
		super(props);
		this.state = {
			roomId: null,
			messages: [],
			joinableRooms: [],
			joinedRooms: []
		}
	}

	componentWillReceiveProps (data) {
	  if (data !== this.props.Username) {
	    this.fetchdata(data.Username);
	  }
	}

	componentDidMount(){
		this.fetchdata("test");
	}

	fetchdata(props) {
		const chatManager = new ChatManager({
	      instanceLocator: instanceLocator,
	      userId: props,
	      tokenProvider: new TokenProvider({
	        url: tokenUrl
	      }),
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
				onMessage: message => {
					this.setState({
						messages: [...this.state.messages, message]
					});
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

	render(){
		return(
			<div id="fullheight">
            	<Grid container className="frame">
					<Grid item xs={3} className='sidepanel'>
						<RoomList
							roomId={this.state.roomId}
							rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
							subscribeToRoom={(roomId) => this.subscribeToRoom(roomId)}/>
					</Grid>
					<Grid item xs={9}>
						<MessageListPage
							roomId={this.state.roomId}
							injectedmessages={this.state.messages}
							currentUser={this.props.currentUser}/>
					</Grid>
				</Grid>
				<Grid>
					<Grid container className="formframe">
						<Grid item xs={3}>
							<NewRoomForm createRoom={(data) => this.createRoom(data)}/>
						</Grid>
						<Grid item xs={9}>
							<SendMessageForm
								disabled={!this.state.roomId}
								sendMessage={(roomName) => this.sendMessage(roomName)}/>
						</Grid>
					</Grid>
				</Grid>
          	</div>
		);
	}
}

export default HomePage;