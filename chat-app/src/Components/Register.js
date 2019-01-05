import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
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
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username:this.state.username,
        firstname:this.state.firstname,
        lastname:this.state.lastname,
        email:this.state.email,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(user => {
      if(user) {
        this.props.loadUser(user);
        this.props.onRouteChange('home');
      }
    })
  }


  render() {
    const {classes} = this.props;
    return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h2" variant="display1">
            Sign Up
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
              onChange={this.onEmailChange}
              id="email"
              name="email"
              autoComplete="email"
              autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">UserName</InputLabel>
              <Input
                onChange={this.onUserNameChange}
                name="Username"
                type="Username"
                id="Username"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="firstname">First Name</InputLabel>
              <Input
                onChange={this.onFirstNameChange}
                name="firstname"
                type="firstname"
                id="firstname"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="lastname">Last Name</InputLabel>
              <Input
                onChange={this.onLastNameChange}
                name="lastname"
                type="lastname"
                id="lastname"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                onChange={this.onPasswordChange}
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </FormControl>

            {/*<FormControlLabel
                          control={<Checkbox value="remember" color="primary" />}
                          label="Remember me"
                        />*/}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.onRegister}
            >
              Sign Up
            </Button>
          </form>
        </Paper>
      </main>
    </React.Fragment>
  );
  }
}

export default withStyles(styles)(Register);