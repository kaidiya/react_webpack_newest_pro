import React, { Component } from 'react';
import { Router } from "react-router";
import { createBrowserHistory } from "history";
import Header from './header';
import SideBar from './sidebar';

const history = createBrowserHistory();

export default class PageFrame extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <Router history={history}>
        <Header />
        <SideBar />
      </Router>
    );
  }
}