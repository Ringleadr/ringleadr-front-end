import React, { Component } from 'react';
import {Icon, Table} from 'semantic-ui-react';
import './Applications.css';

class ApplicationTable extends Component {
  render() {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Components</Table.HeaderCell>
            <Table.HeaderCell>Node</Table.HeaderCell>
            <Table.HeaderCell>Messages</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.props.app && this.props.apps.map(app => {
            return <Table.Row>
              <Table.Cell>
                <a href={`applications/${app.name}`}>
                  {app.name}
                </a>
              </Table.Cell>
              <Table.Cell>
                {app.components.length}
              </Table.Cell>
              <Table.Cell>
                {app.node}
              </Table.Cell>
              {app.messages.length > 0 && <Table.Cell warning><Icon name='attention'/>{app.messages}</Table.Cell>}
              {app.messages.length === 0 && <Table.Cell>{app.messages}</Table.Cell>}
            </Table.Row>
          })}
        </Table.Body>
      </Table>
    );
  }
}

export default ApplicationTable;
