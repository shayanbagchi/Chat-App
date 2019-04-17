import React,{Component} from 'react';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
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

class NewRoomForm extends Component {
	constructor() {
		super();
		this.state = {
			roomName: ''
		}
	}

	onChange(data) {
		this.setState({
			roomName: data.target.value
		})
	}

	onSubmit(data) {
		data.preventDefault()
		this.props.createRoom(this.state.roomName);
		this.setState({roomName: ''})
	}

	render(){
		const { classes } = this.props;
		return(
			<div>
				<Divider className={classes.divider}/>
				<form className={classes.root} onSubmit={(data) => this.onSubmit(data)}>
					<TextField
				          className={classNames(classes.margin, classes.textField)}
				          variant="outlined"
				          placeholder="Create Room."
				          value={this.state.roomName}
				          onChange={(data) => this.onChange(data)}
				          InputProps={{
				            endAdornment: (
				              <InputAdornment position="end">
				                <Button className={classes.sendbutton} type="submit">
				                	<AddIcon />
				                </Button>
				              </InputAdornment>
				            ),
				          }}
				    />
				</form>
			</div>
		)
	}
}

NewRoomForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewRoomForm);