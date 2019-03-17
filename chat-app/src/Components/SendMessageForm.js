import React,{Component} from 'react';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  divider: {
    margin: theme.spacing.unit,
    height: '2px',
    width: 'calc(100% - 16px)',
    color: '#32465a',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: '100%',
    width: '100%',
    background: '#f5f5f5',
    borderRadius: '6px',
  },
  sendbutton: {
	border: 'none',
	cursor: 'pointer',
	background: '#32465a',
	'&:hover': {
      backgroundColor: '#273647',
    },
  },
});


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
		const { classes } = this.props;
		return(
			<div>
				<form className={classes.root} onSubmit={(data) => this.onSubmit(data)}>
					<Divider className={classes.divider}/>
					<TextField
				          className={classNames(classes.margin, classes.textField)}
				          variant="outlined"
				          placeholder="Write your Message."
				          disabled={this.props.disabled}
				          value={this.state.message}
				          onChange={(data) => this.onChange(data)}
				          InputProps={{
				            endAdornment: (
				              <InputAdornment position="end">
				                <Button className={classes.sendbutton} type="submit" disabled={this.props.disabled}>
				                	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				                		<path fill="none" d="M0 0h24v24H0V0z"/>
				                		<path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"/>
				                	</svg>
				                </Button>
				              </InputAdornment>
				            ),
				          }}
				        />
				</form>
			</div>
		);
	}
}

SendMessageForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SendMessageForm);