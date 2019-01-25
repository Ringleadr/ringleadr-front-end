import React, { Component } from 'react';
import {Button, Loader, Table} from 'semantic-ui-react';
import api from "../../api/api";
import {Link} from "react-router-dom";

class ApplicationTable extends Component {
  state = {
    networks: [],
    loaded: false,
  };

  componentDidMount() {
    api.getNetworks().then(nets => {
      if (nets) {
        this.setState({networks: nets, loaded: true});
      } else {
        this.setState({loaded: true})
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.loaded && <Loader active size='huge' inline>Loading Networks</Loader>}
        {this.state.loaded && <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.networks.map((net, i) => {
              return <Table.Row key={`${i}_${net.name}`}>
                <Table.Cell>
                  <Link to={`/networks/${net.name}`}>{net.name}</Link>
                </Table.Cell>
                <Table.Cell>
                  <Button negative>Delete</Button>
                </Table.Cell>
              </Table.Row>
            })}
          </Table.Body>
        </Table>}
      </React.Fragment>
    );
  }
}

export default ApplicationTable;
