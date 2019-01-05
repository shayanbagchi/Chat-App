import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  background: {
    background: "#f5f5f5"
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const Navigation = ({ onRouteChange ,isSignedIn, classes}) => {
    return (
      <div className="navheight">
        { isSignedIn === false
            ? <div className={classes.root}>
                <AppBar position="static" className={classes.background}>
                    <Toolbar>
                        <IconButton className={classes.menuButton}>
                            <MenuIcon />
                        </IconButton>
                    <Typography className={classes.grow}>
                        Discord
                    </Typography>
                        <Button onClick={() =>onRouteChange('signin')} >Sign In</Button>
                        <Button onClick={() =>onRouteChange('register')} >Register</Button>
                    </Toolbar>
                </AppBar>
            </div>
            : <div className={classes.root}>
                <AppBar position="static" className={classes.background}>
                    <Toolbar>
                        <IconButton className={classes.menuButton}>
                            <MenuIcon />
                        </IconButton>
                    <Typography className={classes.grow}>
                        Discord
                    </Typography>
                        <Button onClick={() =>onRouteChange('signout')} >Sign out</Button>
                    </Toolbar>
                </AppBar>
            </div>
        }
      </div>
    );
}
export default withStyles(styles)(Navigation);