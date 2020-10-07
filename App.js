import React from 'react'
import store from './src/redux/store';
import Router from './router';
import { Provider } from 'react-redux';

export default function App() {
  return (

    <Provider store={store}>
      <Router />
    </Provider>
  )
}
