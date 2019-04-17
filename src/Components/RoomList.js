import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import SvgIcon from '@material-ui/core/SvgIcon';
import '../App.css';

const styles = theme => ({
  root: {
    width: '100%',
    height: 'calc(100% - 156px)',
    overflow: 'auto',
  },
  button: {
  	width: '98%',
  	paddingTop: '3px',
  	paddingBottom: '3px',
  	borderRadius: '8px',
  },
  active: {
  	fontWeight: '600',
  	padding: 0,
  	margin: 0,
  },
  background: {
  	background: '#233242',
  	borderRadius: '8px',
  },
  icon: {
    position: 'absolute',
    top: 6,
  },
});

class RoomList extends Component {
	render(){
		const orderdRooms = [ ...this.props.rooms ].sort((a, b) => a.id - b.id);
		const { classes } = this.props;
		return(
			<div className={classes.root} id="scrollR">
					<List component="nav">
						{orderdRooms.map(room => {
							const active = this.props.roomId === room.id ? classes.active : "";
							const background = this.props.roomId === room.id ? classes.background : "";
							return(
								<div key={room.id} className={background}>
									<ListItem button className={classes.button}>
									<SvgIcon className={classes.icon}>
								      <path d="M2.27333333,12 L2.74666667,9.33333333 L0.08,9.33333333 L0.313333333,8 L2.98,8 L3.68666667,4 L1.02,4 L1.25333333,2.66666667 L3.92,2.66666667 L4.39333333,0 L5.72666667,0 L5.25333333,2.66666667 L9.25333333,2.66666667 L9.72666667,0 L11.06,0 L10.5866667,2.66666667 L13.2533333,2.66666667 L13.02,4 L10.3533333,4 L9.64666667,8 L12.3133333,8 L12.08,9.33333333 L9.41333333,9.33333333 L8.94,12 L7.60666667,12 L8.08,9.33333333 L4.08,9.33333333 L3.60666667,12 L2.27333333,12 L2.27333333,12 Z M5.02,4 L4.31333333,8 L8.31333333,8 L9.02,4 L5.02,4 L5.02,4 Z" />
								    </SvgIcon>
									<ListItemText
										disableTypography
	        							primary={
		        								<div>
			        								<Typography className={active} type="body1" style={{ color: '#dbdbdb', padding: 0}}>
			        									{room.name}
			        								</Typography>
		        									<Divider/>
		        								</div>
	        								}
	        							onClick={() => this.props.subscribeToRoom(room.id)} >
									</ListItemText>
								</ListItem>
								</div>
							)
						})}
					</List>
			</div>
		);
	}
}

RoomList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RoomList);