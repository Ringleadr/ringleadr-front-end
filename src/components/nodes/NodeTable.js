import React, { Component } from 'react';
import {Loader, Table} from 'semantic-ui-react';
import api from "../../api/api";

class NodeTable extends Component {
  state = {
    nodes: [],
    loaded: false,
  };

  componentDidMount() {
    document.title = "Agogos - Nodes";
    api.getNodes().then(nodes => {
      if (nodes) {
        this.setState({nodes: nodes, loaded: true});
      } else {
        this.setState({loaded: true})
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.loaded && <Loader active size='huge' inline>Loading Nodes`</Loader>}
        {this.state.loaded && <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Active</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.nodes.map((node, i) => {
              return <Table.Row key={`${i}_${node.name}`}>
                <Table.Cell>
                  {node.name}
                </Table.Cell>
                <Table.Cell>
                  {node.address}
                </Table.Cell>
                <Table.Cell>
                  {node.active.toString()}
                </Table.Cell>
              </Table.Row>
            })}
          </Table.Body>
        </Table>}
      </React.Fragment>
    );
  }
}

export default NodeTable;
