/* eslint-disable import/no-named-as-default */
import { Route, Switch } from "react-router-dom";

import PlacesListPage from "./containers/PlacesListPage";
import PlaceDetailsPage from "./containers/PlaceDetailsPage";
import NotFoundPage from "./NotFoundPage";
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Mikes Bikes
            </Typography>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route exact path="/" component={PlacesListPage} />
          <Route exact path="/places" component={PlacesListPage} />
          <Route exact path="/places/:id" component={PlaceDetailsPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  className: PropTypes.object,
  classes: PropTypes.object
};

export default hot(module)(withStyles(styles)(App));
