import React from 'react';
import BreathingCircle from './BreathingCircle';
import BreathingCircleInner from './BreathingCircleInner';

// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import './Background.css';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  typo: {
    marginTop: theme.spacing.unit * 3,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Register extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id:'',
      username:'',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    }
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value});
  }

  onUserNameChange = (event) => {
      this.setState({username: event.target.value});
  }

  onFirstNameChange = (event) => {
    this.setState({firstname: event.target.value});
  }

  onLastNameChange = (event) => {
    this.setState({lastname: event.target.value});
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value});
  }

  onRegister = () => {
    fetch('https://chatborg-backend.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email:this.state.email,
        username:this.state.username,
        firstname:this.state.firstname,
        lastname:this.state.lastname,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(user => {
      if(user) {
        console.log(user);
        this.props.loadUser(user);
        this.props.onRouteChange('home');
      }
    })
  }


  render() {
    const {classes} = this.props;
    return (
      <div>
        <BreathingCircle />
        <BreathingCircleInner />
          <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
              <Paper className={classes.paper}>
                <Typography className={classes.typo} component="h2" variant="display1">
                  Sign Up
                </Typography>
                <form className={classes.form}>
                  <FormControl margin="normal" required fullWidth>
                    <TextField
                        onChange={this.onEmailChange}
                        label="Email Address"
                        placeholder="Email Address"
                        className={classes.textField}
                        type="email"
                        variant="outlined"
                        autoFocus
                      />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <TextField
                        onChange={this.onUserNameChange}
                        label="Username"
                        placeholder="Username"
                        className={classes.textField}
                        variant="outlined"
                      />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <TextField
                        onChange={this.onFirstNameChange}
                        label="First Name"
                        placeholder="First Name"
                        className={classes.textField}
                        variant="outlined"
                      />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <TextField
                        onChange={this.onLastNameChange}
                        label="Last Name"
                        placeholder="Last Name"
                        className={classes.textField}
                        variant="outlined"
                      />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <TextField
                        onChange={this.onPasswordChange}
                        label="Password"
                        placeholder="Password"
                        className={classes.textField}
                        type="password"
                        variant="outlined"
                      />
                  </FormControl>

                  {
                  /* <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    /> */
                  }

                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.onRegister}>
                      Sign Up
                  </Button>
                </form>
              </Paper>
            </main>
          </React.Fragment>
      </div>
  );
  }
}

export default withStyles(styles)(Register);