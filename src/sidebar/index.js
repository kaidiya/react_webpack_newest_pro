import React, { Component } from 'react';
import {
  Link,
  Switch,
  Route
} from 'react-router-dom';
import { Menu } from 'antd';
import observer from 'utils/observer';
import menuData from '../menuData';
import './style.less';

const MenuItem = Menu.Item;
export default class SideBar extends Component {
  constructor() {
    super();
    observer.sub('topMenuChange', this.handleTopMenuChange);
    const currentSideMenu = [];
    const selectedSideMenuItem = [];
    menuData.forEach(item => {
      if (window.location && item.path.includes(window.location.pathname) && item.parentKey !== 0) {
        currentSideMenu.push(item);
        selectedSideMenuItem.push(item.key);
      }
    });
    this.state = {
      currentSideMenu,
      selectedSideMenuItem,
    };
  }

  componentDidMount() {
    for(let i = 0; i < 100; i++) {
      this.setState({a: 1});
    }
  }

  componentWillUnmount() {
    observer.unbind('topMenuChange', this.handleTopMenuChange);
  }

  handleTopMenuChange = (topMenu) => {
    const currentSideMenu = menuData.filter(item => item.parentKey === topMenu.key);
    const selectedSideMenuItem = [];
    if (currentSideMenu && currentSideMenu.length) {
      selectedSideMenuItem.push(currentSideMenu[0].key);
    }
    this.setState({currentSideMenu, selectedSideMenuItem});
  }

  render() {
    const { currentSideMenu, selectedSideMenuItem } = this.state;
    const sideMenuItem = [];
    const sideRoute = [];
    if (currentSideMenu && currentSideMenu.length) {
      currentSideMenu && currentSideMenu.forEach(item => {
        sideMenuItem.push(
          <MenuItem key={item.key}>
            <Link to={item.path}>{item.name}</Link>
          </MenuItem>
        );
        sideRoute.push(
          <Route key={item.path} path={item.path} component={item.component} />
        )
      });
    }
    return (
      <>
        <div className="side-bar-menu-wrap">
          <div className="side-bar-menu">
            <Menu
              selectedKeys={selectedSideMenuItem}
            >
              {sideMenuItem}
            </Menu>
          </div>
          <div className="page-content">
            <Switch>
              {sideRoute}
            </Switch>
          </div>
        </div>
      </>
    );
  }
}