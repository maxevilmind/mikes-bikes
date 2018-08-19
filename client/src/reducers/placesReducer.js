import {
  GET_PLACES_LIST,
  GET_PLACES_LIST_COMPLETE,
  GET_PAYMENT_TYPES_COMPLETE
} from '../constants/actionTypes';
import objectAssign from 'object-assign';

export default function placesReducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case GET_PLACES_LIST:
      return state;
    case GET_PLACES_LIST_COMPLETE:
      newState = objectAssign({}, state);
      newState.places = action.response.data;
      return newState;
    case GET_PAYMENT_TYPES_COMPLETE:
      newState = objectAssign({}, state);
      newState.paymentTypes = action.response.data[0].paymentTypes;
      return newState;
    default:
      return state;
  }
}
