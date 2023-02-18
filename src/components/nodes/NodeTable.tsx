import React, { Component } from 'react';
import {Button, Loader, Message, Table} from 'semantic-ui-react';
import api from "../../api/api";
import {Link} from "react-router-dom";

class NodeTable extends Component {
  state = {
    nodes: [],
    loaded: false,
    showError: false,
    errorMessage: '',
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

  handleDelete(name) {
    api.deleteNode(name).then(resp => {
      if (resp.ok) {
        window.location.reload();
      } else {
        this.setState({showError: true, errorMessage: resp.msg});
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <Message negative hidden={!this.state.showError}>{this.state.errorMessage}</Message>
        {!this.state.loaded && <Loader active size='huge' inline>Loading Nodes`</Loader>}
        {this.state.loaded && <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Active</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.nodes.map((node, i) => {
              return <Table.Row key={`${i}_${node.name}`}>
                <Table.Cell>
                  <Link to={`/nodes/${node.name}`}>{node.name}</Link>
                </Table.Cell>
                <Table.Cell>
                  {node.address}
                </Table.Cell>
                <Table.Cell>
                  {node.active.toString()}
                </Table.Cell>
                <Table.Cell>
                  <Button onClick={() => this.handleDelete(node.name)} negative disabled={node.active}>{node.active ? 'Cannot delete active node' : 'Delete'}</Button>
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
