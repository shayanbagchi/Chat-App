import React,{ Component } from 'react';
import MessageListPage from './Components/MessageListPage';
import RoomList from './Components/RoomList';
import SendMessageForm from './Components/SendMessageForm';
import NewRoomForm from './Components/NewRoomForm';
import Navigation from './Components/Navigation';
import Register from './Components/Register';
import SignIn from './Components/SignIn';
import Chatkit from '@pusher/chatkit';

import { instanceLocator, tokenUrl } from './config';

import './App.css';
import Grid from '@material-ui/core/Grid';


class App extends Component {

	constructor(props){
		super(props);
		this.state = {
			roomId: null,
			messages: [],
			joinableRooms: [],
			joinedRooms: [],

			route: 'signin',
			isSignedIn: false,
			users:
				{
					id: '',
					firstname: '',
					lastname: '',
					email: '',
					password: '',
					joined: ''
			}
		}
	}

	loadUser = (user) => {
		this.setState({
			user: {
				username: 'user.username',
				firstname: 'user.firstname',
				lastname: 'user.lastname',
				email: 'user.email',
				password: 'user.password',
				joined: 'user.joined'
			}
		})
	}

	onRouteChange = (route) => {
      if (route === 'signout'){
        this.setState({isSignedIn: false})
      } else if (route === 'home') {
         this.setState ({isSignedIn: true});
      }
        this.setState ({route: route});
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
	    	<div id="container">
	    		<Navigation isSignedIn = {this.state.isSignedIn} onRouteChange = {this.onRouteChange} />
	    		{ this.state.route === 'home'
	    			? <div id="fullheight">
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
          			: (
				        this.state.route === 'signin'
				        ? <SignIn onRouteChange = {this.onRouteChange}/>
				        : ( this.state.route === 'signout'
				          ? <SignIn onRouteChange = {this.onRouteChange}/>
				          : <Register loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
				        )
				    )
				}
		    </div>
	    );
	}
}

export default App;