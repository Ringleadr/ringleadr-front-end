import React, { Component } from 'react';
import './Applications.css';
import api from '../../api/api';
import ApplicationTable from "./ApplicationTable";
import {Header, Loader} from "semantic-ui-react";
import {Route} from "react-router-dom";
import ApplicationInfo from "./application-info/ApplicationInfo";

class ApplicationPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Header as='h2' className='page-header'>Applications</Header>
        <Route exact path="/applications" component={ApplicationTable}/>
        <Route path="/applications/:name" component={ApplicationInfo}/>
      </React.Fragment>
    );
  }
}

export default ApplicationPage;
