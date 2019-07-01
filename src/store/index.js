import { createStore } from 'redux';
import reducer from '../reducers';

const initialState = { username: "melo", pass: "iot123"};
const store = createStore(reducer, initialState);
