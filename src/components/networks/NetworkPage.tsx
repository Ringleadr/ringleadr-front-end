import React, { Component } from 'react';
import {Header} from "semantic-ui-react";
import {Route} from "react-router-dom";
import NetworkTable from "./NetworkTable";
import NetworkInfoPage from "./network-info/NetworkInfoPage";

class NetworkPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Header as='h2' className='page-header'>Networks</Header>
        <Route exact path="/networks" component={NetworkTable}/>
        <Route exact path="/networks/:name" component={NetworkInfoPage}/>
      </React.Fragment>
    );
  }
}

export default NetworkPage;
