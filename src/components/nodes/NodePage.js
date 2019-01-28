import React, { Component } from 'react';
import {Header} from "semantic-ui-react";
import {Route} from "react-router-dom";
import NodeTable from "./NodeTable";

class NodePage extends Component {
  render() {
    return (
      <React.Fragment>
        <Header as='h2' className='page-header'>Nodes</Header>
        <Route exact path="/nodes" component={NodeTable}/>
      </React.Fragment>
    );
  }
}

export default NodePage;
