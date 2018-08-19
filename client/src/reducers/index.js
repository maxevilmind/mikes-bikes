import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import placesReducer from './placesReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  places: placesReducer
});

export default rootReducer;
