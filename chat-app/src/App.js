import React,{ Component } from 'react';
import Navigation from './Components/Navigation';
import Register from './Components/Register';
import SignIn from './Components/SignIn';
import HomePage from './Components/HomePage';
import './App.css';

class App extends Component {

	constructor(props){
		super(props);
		this.state = {
			route: 'signin',
			isSignedIn: false,

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

	render() {
	    return (
	    	<div id="container">
	    		<Navigation isSignedIn = {this.state.isSignedIn} onRouteChange = {this.onRouteChange} />
	    		{ this.state.route === 'home'
	    			? <HomePage Username={this.state.username} />
          			: (
				        this.state.route === 'signin'
				        ? <SignIn checkUser={this.checkUser} onRouteChange = {this.onRouteChange}/>
				        : ( this.state.route === 'signout'
				          ? <SignIn checkUser={this.checkUser} onRouteChange = {this.onRouteChange}/>
				          : <Register loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
				        )
				    )
				}
		    </div>
	    );
	}
}

export default App;