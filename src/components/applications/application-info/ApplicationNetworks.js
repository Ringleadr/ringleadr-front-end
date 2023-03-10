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
                Networks
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.app && this.props.app.networks.map((network, i) => {
              return (<Table.Row key={`${network}-${i}`}>
                <Table.Cell>
                  <Link to={`/networks/${network}`}>{network}</Link>
                </Table.Cell>
              </Table.Row>)
            })}
            {this.props.app.networks.length === 0 && <Table.Row><Table.Cell>-</Table.Cell></Table.Row>}
          </Table.Body>
        </Table>
      </React.Fragment>
    );
  }
}

export default ApplicationNetworks;
