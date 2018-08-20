import axios from 'axios';
import * as types from '../constants/actionTypes';

export const getPlacesList = (limit, filters) => {
  return (dispatch) => {
    axios.get('http://95.179.140.120:8081/places', {
        params: {
          limit,
          filters
        }
      })
      .then(function (response) {
        return dispatch({type: types.GET_PLACES_LIST_COMPLETE, response})
      })
  };
}

export const getPaymentTypes = () => {
  return (dispatch) => {
    axios.get('http://95.179.140.120:8081/payment_types', {})
      .then(function (response) {
        return dispatch({type: types.GET_PAYMENT_TYPES_COMPLETE, response})
      })
  };
}
