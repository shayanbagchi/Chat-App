import React,{ Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root: {
  	height: 'auto',
    padding: ('20px 0px 20px 0px'),
    width:'100%',
  },
  divider:{
  	minWidth: 'calc(100% - 60px)',
  	width: '90%',
  	margin: ('10px 0px 10px 2%'),
  },
  message: {
  	height: 'auto',
  	margin: ('10px 0px 10px 2%'),
  	maxWidth: 'calc(100% - 80px)',
  },
  head: {
    padding: ('0 0 0 8px'),
  },
  body: {
  	float: 'left',
  	height: 'auto',
  	width: 'auto',
  	margin: ('0px 0px 5px 20px'),
    padding: ('10px 15px'),
    borderRadius: '20px',
  	background: '#f5f5f5',
  },
});


class Message extends Component {
	render(){
		const { classes } = this.props;
		return(
			<div className={classes.root}>
				<Divider className={classes.divider} />
				<div className={classes.message}>
					<div className={classes.head}>
						<Typography style={{ fontSize:'12px', fontWeight: 700 }}>
			              {this.props.username}
			        	</Typography>
					</div>
					<div className={classes.body} style={{ fontSize:'16px'}}>
						<Typography >
			              {this.props.text}
			        	</Typography>
					</div>
				</div>
			</div>
		)
	}
}

Message.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Message);