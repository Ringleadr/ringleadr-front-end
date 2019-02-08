import React, { Component } from 'react';
import {Icon, Table} from 'semantic-ui-react';
import './Applications.css';
import {Link} from "react-router-dom";

class AppTable extends Component {
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
          {this.props.applications.map((app, i) => {
            return <Table.Row key={`${i}_${app}`}>
              <Table.Cell>
                <Link to={`/applications/${app.name}`}>
                  {app.name}
                </Link>
              </Table.Cell>
              <Table.Cell>
                {app.components.length}
              </Table.Cell>
              <Table.Cell>
                <Link to={`/nodes/${app.node}`}>{app.node}</Link>
              </Table.Cell>
              {app.messages.length > 0 && <Table.Cell warning><Icon name='attention'/>{app.messages}</Table.Cell>}
              {app.messages.length === 0 && <Table.Cell>{app.messages}</Table.Cell>}
            </Table.Row>
          })}
        </Table.Body>
      </Table>
    )
  }
}

export default AppTable;
