import React, { Component } from 'react';
import api from '../../../api/api';
import {Breadcrumb, Loader} from "semantic-ui-react";
import InfoDisplay from "./InfoDisplay";
import {Link} from "react-router-dom";

class ApplicationInfo extends Component {
  state = {
    loaded: false,
    application: {}
  };

  componentDidMount() {
    document.title = `Agogos - Applications - ${this.props.match.params.name}`;
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
        <Breadcrumb>
          <Breadcrumb.Section><Link to='/applications'>Applications</Link></Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section active>{this.props.match.params.name}</Breadcrumb.Section>
        </Breadcrumb>
        {!this.state.loaded && <Loader active inline size='huge'>Loading {this.props.match.params.name}</Loader>}
        {this.state.loaded &&
        <InfoDisplay app={this.state.application}/>}
      </React.Fragment>
    );
  }
}

export default ApplicationInfo;
