import React, { Component } from 'react';
import './Applications.css';
import api from '../../api/api';
import ApplicationTable from "./ApplicationTable";
import {Header, Loader} from "semantic-ui-react";

class ApplicationPage extends Component {
  state = {
    applications: [],
    loaded: false,
  };

  componentDidMount() {
    api.getApps().then(apps => {
      this.setState({applications: apps, loaded: true});
    })
  }

  render() {
    return (
      <React.Fragment>
        <Header as='h1'>Applications</Header>
        {!this.state.loaded && <Loader active size='massive'>Loading</Loader>}
        {this.state.loaded &&
        <ApplicationTable apps={this.state.applications}/>}
      </React.Fragment>
    );
  }
}

export default ApplicationPage;
