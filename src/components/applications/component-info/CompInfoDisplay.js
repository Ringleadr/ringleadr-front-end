import React, { Component } from 'react';
import {Header} from "semantic-ui-react";

class CompInfoDisplay extends Component {
  render() {
    return (
      <React.Fragment>
        <Header as="h2">
          {this.props.comp.name}
        </Header>
      </React.Fragment>
    );
  }
}

export default CompInfoDisplay;
