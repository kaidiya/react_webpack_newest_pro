import React, { Component } from 'react';
import {
  Link,
  Switch,
  Route
} from "react-router-dom";
import { Menu } from 'antd';
import observer from 'utils/observer';
import menuData from '../../menuData';
import SideBar from '../sidebar';

const MenuItem = Menu.Item;
let headerMenuData = [];
export default class Header extends Component {
  constructor(props) {
    super();
    const selectedMenuItem = [];
    const { pathname } = window.location || {};
    const currentSelectedSideBarMenuData = menuData.find(i => i.path === pathname) || {};
    menuData.forEach(item => {
      if (item.parentKey === 0) {
        const headerMenuPath = menuData.find(i => i.parentKey === item.key) || {};
        item.path = headerMenuPath.path || item.path;
        headerMenuData.push(item);
        if (currentSelectedSideBarMenuData.parentKey && currentSelectedSideBarMenuData.parentKey === item.key) {
          selectedMenuItem.push(item.key);
        }
      }
    });
    if (currentSelectedSideBarMenuData.parentKey === 0 && !selectedMenuItem.length) {
      selectedMenuItem.push(currentSelectedSideBarMenuData.key);
    }
    this.state = {
      selectedMenuItem,
    };
  }

  handleMenuItemChange = (v) => {
    observer.pub('topMenuChange', v);
    this.setState({selectedMenuItem: [v.key]})
  }

  render() {
    const { selectedMenuItem } = this.state;
    const headMenuName = [];
    const headMenuRoute = [];
    
    if (headerMenuData && headerMenuData.length) {
      headerMenuData.forEach(item => {
        headMenuName.push(
          <MenuItem key={item.key}>
            <Link to={item.path}>{item.name}</Link>
          </MenuItem>
        );
        headMenuRoute.push(
          <Route key={item.path} path={item.path} component={item.component} />
        )
      })
    }
    
    return (
      <>
        <Menu
          mode="horizontal"
          onClick={this.handleMenuItemChange}
          selectedKeys={selectedMenuItem}
        >
          {headMenuName}
        </Menu>

        <Switch>
          {headMenuRoute}
        </Switch>
      </>
    );
  }
}