import React, { Component } from 'react';
import {Button, Icon, Loader, Table} from 'semantic-ui-react';
import './Applications.css';
import api from "../../api/api";
import {Link} from "react-router-dom";

class ApplicationTable extends Component {
  state = {
    applications: [],
    loaded: false,
  };

  componentDidMount() {
    api.getApps().then(apps => {
      if (apps) {
        this.setState({applications: apps, loaded: true});
      } else {
        this.setState({loaded: true})
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.loaded && <Loader active size='huge' inline>Loading Applications</Loader>}
        {this.state.loaded && <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Components</Table.HeaderCell>
              <Table.HeaderCell>Node</Table.HeaderCell>
              <Table.HeaderCell>Messages</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.applications.map((app, i) => {
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
                  {app.node}
                </Table.Cell>
                {app.messages.length > 0 && <Table.Cell warning><Icon name='attention'/>{app.messages}</Table.Cell>}
                {app.messages.length === 0 && <Table.Cell>{app.messages}</Table.Cell>}
              </Table.Row>
            })}
          </Table.Body>
        </Table>}
        <Button centered positive>Add new Application</Button>
      </React.Fragment>
    );
  }
}

export default ApplicationTable;
