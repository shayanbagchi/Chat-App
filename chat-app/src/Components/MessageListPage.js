import React,{ Component } from 'react';
import Message from './Message';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root: {
    height: 'calc(100% - 90px)',
    width: '100%',
    position:'relative',
    overflow: 'auto',
  },
  onboarding:{
  	height: '82px',
  	width: '265px',
  	position:'absolute',
  	top: 'calc(50% - 41px)',
  	left: 'calc(50% - 132.5px)',
  },
  greet:{
  	position:'relative',
  	height:'50px',
  	width: 'auto',
  },
  icon:{
  	position:'absolute',
  	top: '4px',
  	float: 'left',
  	height:'50px',
  	width:'50px',
  },
});

class MessageListPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			messages: [],
		}
	}

	onMessage(){
		this.setState({
			messages: this.state.messages
		})
	}

	render(){
		const { classes } = this.props;
		if(!this.props.roomId){
			return(
				<div className={classes.root}>
					<div className={classes.onboarding}>
						<div className={classes.greet}>
							<svg className={classes.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.417 511.417"><path d="M69.141 129.507c13.383-9.343 33.521-7.552 45.525 2.362l-13.781-20.011c-11.079-15.802-7.111-32.897 8.719-43.975 15.815-11.065 37.632-7.24 48.725 8.59l125.567 178.943.995-.441L170.22 86.528c-11.179-15.958-9.074-36.182 6.884-47.374 15.957-11.15 37.973-7.296 49.152 8.69L374.45 257.195c11.179 15.971 5.703 37.845-10.254 49.024-2.716 1.906-5.646 3.214-8.632 4.252v129.835H213.34v-44.273c-2.091-1.835-13.753-10.852-15.402-13.213L60.45 178.973c-11.277-16.058-7.381-38.202 8.69-49.465" fill="#d2a077"/><path d="M38.336 245.974s-16.1-23.466 7.382-39.553c23.452-16.085 39.537 7.381 39.537 7.381l74.681 108.914c2.56-4.295 5.39-8.534 8.519-12.7L64.804 158.834s-16.085-23.453 7.381-39.538c23.453-16.1 39.538 7.368 39.538 7.368l97.507 142.18c3.626-2.973 7.325-5.931 11.165-8.846L107.371 95.16S91.286 71.71 114.74 55.624c23.452-16.1 39.537 7.367 39.537 7.367l113.039 164.821c4.152-2.546 8.262-4.765 12.374-7.082L174.059 66.674s-16.085-23.453 7.381-39.538c23.452-16.1 39.537 7.368 39.537 7.368L332.68 197.405l8.946 13.041 8.035 11.734c-70.371 48.256-77.07 139.079-36.864 197.717 8.05 11.734 19.783 3.698 19.783 3.698-48.27-70.386-33.521-149.475 36.864-197.731L348.65 122.012s-7.751-27.377 19.613-35.128 35.115 19.612 35.115 19.612l23.965 71.168c9.5 28.217 19.612 56.333 32.995 82.915 37.788 75.093 15.217 168.433-56.05 217.301-77.725 53.291-183.965 33.494-237.269-44.231-2.816-4.125-5.178-8.149-7.424-12.174l-.626.441L38.336 245.974z" fill="#f3d2a2"/><g fill="#4c4944"><path d="M170.674 455.125c-56.889 0-114.375-57.486-114.375-114.375 0-7.865-5.76-14.223-13.625-14.223s-14.82 6.358-14.82 14.223c0 85.334 57.486 142.82 142.82 142.82 7.865 0 14.222-6.955 14.222-14.82s-6.357-13.625-14.222-13.625"/><path d="M99.563 482.972c-42.667 0-71.112-28.445-71.112-71.11 0-7.866-6.357-14.223-14.222-14.223S.006 403.996.006 411.86c0 56.889 42.667 99.555 99.555 99.555 7.865 0 14.223-6.357 14.223-14.222s-6.357-14.222-14.222-14.222M341.34 27.861c-7.851 0-14.222 6.371-14.222 14.223s6.37 14.222 14.222 14.222c56.889 0 113.778 51.044 113.778 113.778 0 7.851 6.37 14.222 14.222 14.222 7.851 0 14.223-6.371 14.223-14.222 0-78.422-56.89-142.223-142.223-142.223"/><path d="M412.451 0C404.6 0 398.23 5.774 398.23 13.625c0 7.865 6.371 14.82 14.222 14.82 42.666 0 70.514 31.645 70.514 70.514 0 7.865 6.969 14.222 14.82 14.222s13.625-6.357 13.625-14.222C511.41 44.4 469.34 0 412.451 0"/></g>
							</svg>
							<Typography  style={{ paddingTop: '0px', paddingLeft: '54px',fontSize: '3rem', fontWeight: 200 }}>
					              Welcome!
					        </Typography>
						</div>
						<Typography style={{ paddingTop: '6px',fontSize: '1.4rem', fontWeight: 300 }}>
				              Join a room to start a chat.
				        </Typography>
					</div>
				</div>
			)
		}
		return (
			<div className={classes.root} ref={this.props.msgRef} id="scroll">
					<div>
						{this.props.injectedmessages.map((message, index) => {
							return(
								<Message key={index} username={message.senderId} text={message.text} />
							);
						})}
					</div>
			</div>
		);
	}
}

MessageListPage.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MessageListPage);