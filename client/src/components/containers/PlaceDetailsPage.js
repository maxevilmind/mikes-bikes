import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PlaceDetailsForm from '../PlaceDetailsForm';
import * as actions from '../../actions/placesActions';

export class PlacesListPage extends React.Component {
  componentDidMount(){
    this.props.actions.getPlacesList(1, {id: this.props.match.params.id});
  }
  render() {
    return (
      <PlaceDetailsForm
        places={this.props.places}
        getPlacesList={this.props.actions.getPlacesList}
      />
    );
  }
}

PlacesListPage.propTypes = {
  actions: PropTypes.object.isRequired,
  places: PropTypes.array,
  getPlacesList: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    places: state.places.places
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlacesListPage);
