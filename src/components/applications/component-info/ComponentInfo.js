import React, { Component } from 'react';
import api from '../../../api/api';
import {Breadcrumb, Loader} from "semantic-ui-react";
import {Link} from "react-router-dom";
import CompInfoDisplay from "./CompInfoDisplay";

class ComponentInfo extends Component {
  state = {
    loaded: false,
    comp: {}
  };

  componentDidMount() {
    api.getCompInfo(this.props.match.params.compName).then(comp => {
      if (comp) {
        this.setState({comp: comp, loaded: true});
      } else {
        this.setState({loaded: true})
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <Breadcrumb>
          <Breadcrumb.Section link><Link to='/applications'>Applications</Link></Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section link><Link to={`/applications/${this.props.match.params.name}`}>{this.props.match.params.name}</Link></Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section active>{this.props.match.params.compName}</Breadcrumb.Section>
        </Breadcrumb>
        {!this.state.loaded && <Loader active inline size='huge'>Loading {this.props.match.params.compName}</Loader>}
        {this.state.loaded &&
        <CompInfoDisplay comp={this.state.comp}/>}
      </React.Fragment>
    );
  }
}

export default ComponentInfo;
