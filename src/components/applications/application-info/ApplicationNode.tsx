import React, { Component } from 'react';
import {Table} from "semantic-ui-react";
import "./InfoDisplay.css"
import {Link} from "react-router-dom";

class ApplicationNetworks extends Component {
  render() {
    return (
      <React.Fragment>
        <Table basic='very' celled collapsing className={'info-table'}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                Node
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.app &&
            <Table.Row>
              <Table.Cell>
                <Link to={`/nodes/${this.props.app.node}`}>{this.props.app.node}</Link>
              </Table.Cell>
            </Table.Row>
            }
          </Table.Body>
        </Table>
      </React.Fragment>
    );
  }
}

export default ApplicationNetworks;
