import React, { Component } from 'react';
import {Header, Loader} from "semantic-ui-react";
import {Route} from "react-router-dom";
import NetworkTable from "./NetworkTable";

class ApplicationPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Header as='h2' className='page-header'>Networks</Header>
        <Route exact path="/networks" component={NetworkTable}/>
      </React.Fragment>
    );
  }
}

export default ApplicationPage;
