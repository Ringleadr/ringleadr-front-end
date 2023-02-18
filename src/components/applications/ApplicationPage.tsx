import React, { Component } from 'react';
import './Applications.css';
import ApplicationTable from "./ApplicationTable";
import {Header} from "semantic-ui-react";
import {Route} from "react-router-dom";
import ApplicationInfo from "./application-info/ApplicationInfo";
import ComponentInfo from "./component-info/ComponentInfo";

class ApplicationPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Header as='h2' className='page-header'>Applications</Header>
        <Route exact path="/applications" component={ApplicationTable}/>
        <Route exact path="/applications/:name" component={ApplicationInfo}/>
        <Route exact path="/applications/:name/:compName" component={ComponentInfo}/>
      </React.Fragment>
    );
  }
}

export default ApplicationPage;
