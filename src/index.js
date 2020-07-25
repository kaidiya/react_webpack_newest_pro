import React, { Component } from 'react';
import { BrowserRouter as Router, } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import Header from './pageFrame/header';
import SideBar from './pageFrame/sidebar';
import allReducers from './reducer';

const history = createBrowserHistory();
export const store = configureStore({
  reducer: allReducers,
});

export default class PageFrame extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Header />
          <SideBar />
        </Router>
      </Provider>
    );
  }
}