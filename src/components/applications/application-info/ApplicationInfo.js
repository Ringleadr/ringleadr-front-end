import React, { Component } from 'react';
import api from '../../../api/api';
import {Loader} from "semantic-ui-react";
import InfoDisplay from "./InfoDisplay";

class ApplicationInfo extends Component {
  state = {
    loaded: false,
    application: {}
  };

  componentDidMount() {
    api.getApp(this.props.match.params.name).then(app => {
      if (app) {
        this.setState({application: app, loaded: true});
      } else {
        this.setState({loaded: true})
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.loaded && <Loader active inline size='huge'>Loading {this.props.match.params.name}</Loader>}
        {this.state.loaded &&
        <InfoDisplay app={this.state.application}/>}
      </React.Fragment>
    );
  }
}

export default ApplicationInfo;
