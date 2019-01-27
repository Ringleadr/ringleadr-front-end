import React, { Component } from 'react';
import {Header, Menu, Sidebar} from "semantic-ui-react";
import { Link } from "react-router-dom";

class SideNav extends Component {
  render() {
    let temp = window.location.pathname.substring(1);
    let activeItem = temp.substring(0, temp.indexOf("/") > 0 ? temp.indexOf("/") : temp.length);
    return (
    <Sidebar as={Menu} vertical inverted visible={true}>
      <Menu.Item>
        <Header as='h1' inverted>Agogos</Header>
      </Menu.Item>
      <Link to="/">
        <Menu.Item name='overview' active={activeItem === ''}>
          Overview
        </Menu.Item>
      </Link>

      <Link to="/applications">
        <Menu.Item name='applications' active={activeItem === 'applications'}>
          Applications
        </Menu.Item>
      </Link>

      <Link to="/networks">
        <Menu.Item name='networks' active={activeItem === 'networks'}>
          Networks
        </Menu.Item>
      </Link>

      <Link to="/storage">
        <Menu.Item name='storage' active={activeItem === 'storage'}>
          Storage
        </Menu.Item>
      </Link>

      <Link to="/nodes">
        <Menu.Item name='nodes' active={activeItem === 'nodes'}>
          Nodes
        </Menu.Item>
      </Link>
    </Sidebar>
    )
  }
}

export default SideNav
