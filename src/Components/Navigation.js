import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = '25%';

const styles = theme => ({
  root: {
    height: '64px',
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    background: "#f5f5f5",
    height: '64px',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  background:{
    background: "#f5f5f5",
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    color: '#000000de',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
});

const Navigation = ({ onRouteChange ,isSignedIn, classes, handleDrawerToggle}) => {
    return (
      <div >
        { isSignedIn === false
            ? <div className={classes.root}>
                <AppBar position="static" className={classes.background}>
                    <Toolbar>
                    <Typography className={classes.grow}>
                        Discord
                    </Typography>
                        <Button onClick={() =>onRouteChange('signin')} >Sign In</Button>
                        <Button onClick={() =>onRouteChange('register')} >Register</Button>
                    </Toolbar>
                </AppBar>
            </div>
            : <div className={classes.root}>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                          color="inherit"
                          aria-label="Open drawer"
                          onClick={() => handleDrawerToggle()}
                          className={classes.menuButton}
                        >
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