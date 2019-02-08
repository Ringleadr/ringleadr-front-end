import React, { Component } from 'react';
import {Header} from "semantic-ui-react";
import {Route} from "react-router-dom";
import NodeTable from "./NodeTable";
import NodeInfoPage from "./node-info/NodeInfoPage";

class NodePage extends Component {
  render() {
    return (
      <React.Fragment>
        <Header as='h2' className='page-header'>Nodes</Header>
        <Route exact path="/nodes" component={NodeTable}/>
        <Route exact path={"/nodes/:name"} component={NodeInfoPage}/>
      </React.Fragment>
    );
  }
}

export default NodePage;
