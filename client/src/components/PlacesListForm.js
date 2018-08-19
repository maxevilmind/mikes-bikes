import React from 'react';
import {func, object} from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  }
});

export class PlacesListForm extends React.Component {
  state = {
    limit: 15,
    pts: [],
    search: '',
    filters: {},
  }
  handleFetchMore = () => {
    this.setState({limit: this.state.limit + 10});
    this.props.getPlacesList(
      this.state.limit,
      this.state.filters
    );
  }
  expandFilters = () => {
    this.setState({open: !this.state.open});
  }
  handleSearchChange = e => {
    const newFilters = Object.assign({}, this.state.filters);
    newFilters.searchQuery = e.target.value;
    this.setState({
      filters: newFilters,
      search: e.target.value
    });
    this.props.getPlacesList(
      this.state.limit,
      newFilters
    );
  }
  handlePaymentTypeChange = e => {
    const newFilters = Object.assign({}, this.state.filters);
    newFilters.ptQuery = e.target.value
    this.setState({
      filters: newFilters,
      pts: e.target.value
    });
    this.props.getPlacesList(
      this.state.limit,
      newFilters
    );
  };
  render() {
    const { places, classes } = this.props;
    const { pts } = this.state;
    return (
      <List>
        <ListItem onClick={this.expandFilters}>
          <ListItemText
            primary='Filters'
          />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List>
            <ListItem>
              <FormControl className={classes.formControl}>
                <TextField
                  id="search"
                  label="Search"
                  className={classes.textField}
                  value={this.state.search}
                  onChange={this.handleSearchChange}
                  margin="normal"
                />
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-multiple-chip">Payment Types</InputLabel>
                <Select
                  multiple
                  value={pts}
                  onChange={this.handlePaymentTypeChange}
                  input={<Input id="select-multiple-chip"/>}
                  style={{minWidth: '166px'}}
                  renderValue={selected => (
                    <div className={classes.chips}>
                      {selected.map(value => (
                        <Chip key={value} label={value} className={classes.chip} />
                      ))}
                    </div>
                  )}
                >
                  {places && places.paymentTypes && places.paymentTypes.map(name => (
                    <MenuItem
                      key={name}
                      value={name}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>
          </List>
        </Collapse>
        {
          places && places.places && places.places.map(place => {
            return (
              <Link to={`/places/${place._id}`} key={place._id}>
                <ListItem >
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                  <ListItemText primary={place.name} secondary={place.address} />
                </ListItem>
              </Link>
            )
          })
        }
        <ListItem onClick={this.handleFetchMore}>
          <Avatar>
            <ImageIcon />
          </Avatar>
          <ListItemText
            primary={'Load more'}
            secondary="Click to load more"
          />
        </ListItem>
      </List>
    );
  }
}

PlacesListForm.propTypes = {
  getPlacesList: func,
  places: object,
  classes: object
};

export default withStyles(styles)(PlacesListForm);
