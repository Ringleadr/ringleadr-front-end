import React, { Component } from 'react';
import {Header, Menu} from "semantic-ui-react";
import { Link } from "react-router-dom";

class SideNav extends Component {
  render() {
    let temp = window.location.pathname.substring(1);
    let activeItem = temp.substring(0, temp.indexOf("/") > 0 ? temp.indexOf("/") : temp.length);
    return (
    <Menu vertical>
      <Menu.Item>
        <Header as='h1'>Agogos</Header>
      </Menu.Item>
      <Menu.Item name='overview' active={activeItem === ''}>
        <Link to="/">Overview</Link>
      </Menu.Item>

      <Menu.Item name='applications' active={activeItem === 'applications'}>
        <Link to="/applications">Applications</Link>
      </Menu.Item>

      <Menu.Item name='Networks' active={activeItem === 'networks'}>
        <Link to="/networks">Networks</Link>
      </Menu.Item>

      <Menu.Item name='nodes' active={activeItem === 'nodes'}>
        <Link to="/nodes">Nodes</Link>
      </Menu.Item>
    </Menu>
    )
  }
}

export default SideNav
