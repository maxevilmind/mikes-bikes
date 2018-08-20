import React from 'react';
import {func, array, object} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  viewport: {
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  }
});

export class PlaceDetailsForm extends React.Component {
  state = {
    limit: 15,
  }
  render() {
    const { places, classes } = this.props;
    const place = places && places[0];
    return (
      <React.Fragment>
        <div style={{margin: '16px'}}>
          <Typography variant="display2" gutterBottom>
            {place && place.name}
          </Typography>
          <Typography variant="display1" gutterBottom>
            {place && place.address}
          </Typography>
          <Typography variant="title" gutterBottom>
            Phone
          </Typography>
          {
            place && place.phones && place.phones.map(phone =>
              <Typography
                key={phone}
                variant="display1"
                gutterBottom
              >
                {phone}
              </Typography>
            )
          }
          <Typography variant="title" gutterBottom>
            Website
          </Typography>
          {
            place && place.websites && place.websites.map(ws =>
              <Typography key={ws} gutterBottom noWrap>
                <a href={ws}>{ws}</a>
              </Typography>
            )
          }
          <Typography variant="title" gutterBottom>
            Payment Types
          </Typography>
          {
            place && place.paymentTypes && place.paymentTypes.map(pt =>
              <Chip
                key={pt}
                label={pt}
                className={classes.chip}
                style={{margin: '10px'}}
              />
            )
          }
          <Typography variant="title" gutterBottom>
            Categories
          </Typography>
          {
            place && place.categories && place.categories.map(category =>
              <Chip
                key={category}
                label={category}
                className={classes.chip}
                style={{margin: '10px'}}
              />
            )
          }
          <Typography variant="title" gutterBottom>
            Working Hours
          </Typography>
          <Typography gutterBottom noWrap>
            {`Monday ${place && place.hours && place.hours.find(day => day.day === 'Monday').hour}`}
          </Typography>         
          <Typography gutterBottom noWrap>
            {`Tuesday ${place && place.hours && place.hours.find(day => day.day === 'Tuesday').hour}`}
          </Typography>         
          <Typography gutterBottom noWrap>
            {`Wednesday ${place && place.hours && place.hours.find(day => day.day === 'Wednesday').hour}`}
          </Typography>         
          <Typography gutterBottom noWrap>
            {`Thursday ${place && place.hours && place.hours.find(day => day.day === 'Thursday').hour}`}
          </Typography>         
          <Typography gutterBottom noWrap>
            {`Friday ${place && place.hours && place.hours.find(day => day.day === 'Friday').hour}`}
          </Typography>         
          <Typography gutterBottom noWrap>
            {`Saturday ${place && place.hours && place.hours.find(day => day.day === 'Saturday').hour}`}
          </Typography>         
          <Typography gutterBottom noWrap>
            {`Sunday ${place && place.hours && place.hours.find(day => day.day === 'Sunday').hour}`}
          </Typography>         
          <Typography variant="title" gutterBottom>
            Actions
          </Typography>
          <a
            href={`https://maps.google.com/?q=${place && place.address}`}
            style={{textDecoration: 'none'}}
          >
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
            >
              Navigate
            </Button>
          </a>
          {
            place && place.phones && place.phones.map((phone, index) => {
              return <a
              key={phone}
              href={`tel:${phone}`}
              style={{textDecoration: 'none'}}
            >
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
              >
                Call {index + 1}
              </Button>
            </a>
            })
          }
          
        </div>
        <div style={{margin: '16px'}}>
          <Typography variant="headline" gutterBottom>
            Reviews
          </Typography>
          <List>
            {
              place && place.reviews && place.reviews.map(review =>
                <ListItem key={review.id}>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                  <ListItemText primary={review.username} secondary={review.text} />
                </ListItem>
              )
            }
          </List>
        </div>
      </React.Fragment>
    );
  }
}

PlaceDetailsForm.propTypes = {
  getPlacesList: func,
  places: array,
  classes: object
};

export default withStyles(styles)(PlaceDetailsForm);
