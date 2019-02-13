import React, { Component } from 'react';
import api from '../../../api/api';
import {Loader} from "semantic-ui-react";
import CompInfoDisplay from "./CompInfoDisplay";
import './comp.css'

class ComponentGraphWrapper extends Component {
  state = {
    loaded: false,
    showGraph: false,
    comp: {}
  };

  componentDidMount() {
    api.getCompInfo(this.props.appName, this.props.compName).then(comp => {
      if (comp) {
        this.setState({comp: comp, loaded: true, showGraph: true});
      } else {
        this.setState({loaded: true})
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.loaded && <Loader active inline size='huge'>Loading {this.props.compName}</Loader>}
        {this.state.showGraph ?
          <React.Fragment>
            <h3 className={'comp-name'}>{this.props.compName}</h3>
            <CompInfoDisplay comp={this.state.comp}/>
          </React.Fragment>
        : ''}
      </React.Fragment>
    );
  }
}

export default ComponentGraphWrapper;
