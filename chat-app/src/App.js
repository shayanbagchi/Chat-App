import React,{ Component } from 'react';
import Navigation from './Components/Navigation';
import Register from './Components/Register';
import SignIn from './Components/SignIn';
import HomePage from './Components/HomePage';
import './App.css';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

const theme = createMuiTheme({
	  palette: {
	    primary: {
	      main: '#273546',
	      light: '#425568',
	      dark: '#1f2a3a',
	    },
	    // secondary: {
	    //   light: '#141E28',
	    //   main: '#152636',
	    //   contrastText: '#212F3D',
	    // },
	  },
	});

const styles = theme => ({
	root: {
	    height: '100%',
	    width: '100%',
	},
});

class App extends Component {

	constructor(props){
		super(props);
		this.state = {
			route: 'signin',
			isSignedIn: false,
			mobileOpen: false,

			id: '',
			username: '',
			firstname: '',
			lastname: '',
			email: '',
			password: '',
			joined: ''
		}
	}

	loadUser = (user) => {
		this.setState({
			username: user.username,
			firstname: user.firstname,
			lastname: user.lastname,
			email: user.email,
			password: user.password,
			joined: user.joined
		})
	}

	checkUser = (data) => {
		this.setState({
			username: data
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

    handleDrawerToggle = () => {
      this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  	};

	render() {
		const { classes } = this.props;
	    return (
	    	<div className={classes.root}>
	    		<MuiThemeProvider theme={theme}>
		    		<Navigation
			    		isSignedIn = {this.state.isSignedIn}
			    		handleDrawerToggle = {this.handleDrawerToggle}
			    		onRouteChange = {this.onRouteChange}
			    	/>
		    		{ this.state.route === 'home'
		    			? <HomePage Username={this.state.username}
		    				handleDrawerToggle = {this.handleDrawerToggle}
		    				mobileOpen = {this.state.mobileOpen}
		    			  />
	          			: (
					        this.state.route === 'signin'
					        ? <SignIn checkUser={this.checkUser} onRouteChange = {this.onRouteChange}/>
					        : ( this.state.route === 'signout'
					          ? <SignIn checkUser={this.checkUser} onRouteChange = {this.onRouteChange}/>
					          : <Register loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
					        )
					    )
					}
				</MuiThemeProvider>
		    </div>
	    );
	}
}

export default withStyles(styles)(App);