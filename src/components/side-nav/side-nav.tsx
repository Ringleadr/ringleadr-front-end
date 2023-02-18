import React, { Component } from 'react';
import { Header, Menu, Sidebar } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import "./nav.css";

class SideNav extends Component {
  render() {
    return (
      <Sidebar as={Menu} vertical inverted visible={true}>
        <Link to="/">
          <Menu.Item>
            <Header as='h1' inverted>Ringleadr</Header>
          </Menu.Item>
        </Link>

        <NavLink to="/">
          <Menu.Item name='overview'>
            Overview
          </Menu.Item>
        </NavLink>

        <NavLink to="/applications">
          <Menu.Item name='applications'>
            Applications
          </Menu.Item>
        </NavLink>

        <NavLink to="/networks">
          <Menu.Item name='networks'>
            Networks
          </Menu.Item>
        </NavLink>

        <NavLink to="/storage">
          <Menu.Item name='storage'>
            Storage
          </Menu.Item>
        </NavLink>

        <NavLink to="/nodes">
          <Menu.Item name='nodes'>
            Nodes
          </Menu.Item>
        </NavLink>
      </Sidebar>
    )
  }
}

export default SideNav
