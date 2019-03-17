import React,{ Component } from 'react';
import MessageListPage from './MessageListPage';
import RoomList from './RoomList';
import SendMessageForm from './SendMessageForm';
import NewRoomForm from './NewRoomForm';

import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import { instanceLocator, tokenUrl } from '../config';

import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import '../App.css';

const styles = theme => ({
  root: {
    display: 'flex',
    height: 'calc(100% - 64px)',
    width: '100%',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: '25%',
      flexShrink: 0,
      height: '100%',
    },
  },
  typo: {
  	paddingTop: '32px',
  	paddingLeft: '12px',
  },
  height: {
  	height: '100%',
  	width: '100%',
  },
  drawerSize: {
  	height: '100%',
  	width: '100%',
  },
  drawerHidden: {
  	height: '100%',
  	width: '100%',
  },
  drawerPaper: {
  	background: '#2c3e50',
  	color: '#f5f5f5',
  	[theme.breakpoints.down('sm')]: {
      width: '70%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '100%',
    },
    width: '100%',
  	height: '100%',
    position: 'relative',
  },
  content: {
  	background: '#E6EAEA',
    flexGrow: 1,
    height: '100%',
    position: 'relative',
  },
});

class HomePage extends Component {
	constructor(props){
		super(props);
		this.state = {
			roomId: null,
			messages: [],
			messageLimit: 25,
			joinableRooms: [],
			joinedRooms: [],
			username: '',
			scrollToBottom: false,
		}
		this.msgRef = React.createRef();
	}

	static getDerivedStateFromProps(nextProps, prevState){
	   if(nextProps.Username !== prevState.Username){
	    return { username: nextProps.Username};
	   }
	   const node = this.msgRef.current;
	   if(node.scrollTop + node.clientHeight + 60 >= node.scrollHeight){
	   		this.setState({ scrollToBottom: true });
	   }
	   else return null;
	}

	componentDidMount(){
		if (this.state.username){
			this.fetchdata(this.state.username);
		} else{
			this.fetchdata("test");
		}
	}

	componentDidUpdate(prevProps, prevState){
		if(prevProps.Username !== this.props.Username){
		    this.setState({username: prevProps.Username});
		    this.fetchdata(this.state.username);
		}
		if( this.msgRef.current !== null && this.state.scrollToBottom){
			const node = this.msgRef.current;
			node.scrollTop = node.scrollHeight
		}
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
						messages: [...this.state.messages, message],
					});
				}
			},
			messageLimit: 25,
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
		const { classes, theme } = this.props;

		const drawer = (
	      <div className={classes.drawerSize}>
		    	<Divider />
		    	<div height='64px'>
		    		<div className={classes.typo}>
			    		<Typography variant="headline" color="inherit" fontWeight="fontWeightMedium" >
			              Rooms:
			            </Typography>
		    		</div>
		    	</div>
		        <Divider />
				    <RoomList
						roomId={this.state.roomId}
						rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
						subscribeToRoom={(roomId) => this.subscribeToRoom(roomId)}
					/>
					<NewRoomForm createRoom={(data) => this.createRoom(data)}/>
	      </div>
	    );

	return(
      	<div className={classes.root}>
      		<CssBaseline />
      		<nav className={classes.drawer} >
		          <Hidden smUp implementation="css" className={classes.drawerHidden}>
		            <Drawer
		              container={this.props.container}
		              variant="temporary"
		              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
		              open={this.props.mobileOpen}
		              onClose={() => this.props.handleDrawerToggle()}
		              className={classes.height}
		              classes={{
		                paper: classes.drawerPaper,
		              }}
		            >
		              {drawer}
		            </Drawer>
		          </Hidden>
		          <Hidden xsDown implementation="css" className={classes.drawerHidden}>
		            <Drawer
		              className={classes.height}
		              classes={{
		                paper: classes.drawerPaper,
		              }}
		              variant="permanent"
		              open={false}
		            >
		              {drawer}
		            </Drawer>
		          </Hidden>
		        </nav>
		        <main className={classes.content}>
						<MessageListPage
							roomId={this.state.roomId}
							injectedmessages={this.state.messages}
							currentUser={this.props.currentUser}
							msgRef={this.msgRef}
						/>
						<SendMessageForm
							disabled={!this.state.roomId}
							sendMessage={(roomName) => this.sendMessage(roomName)}
						/>
		        </main>
		      </div>
		);
	}
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(HomePage);