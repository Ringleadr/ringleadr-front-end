import React, { Component } from "react";
import { Button, Loader, Message } from "semantic-ui-react";
import { deleteNode, getNodes } from "../../api/api";
import { Link } from "react-router-dom";
import { Table } from "@mui/joy";

class NodeTable extends Component {
  state = {
    nodes: [],
    loaded: false,
    showError: false,
    errorMessage: "",
  };

  componentDidMount() {
    document.title = "Agogos - Nodes";
    getNodes().then((nodes) => {
      if (nodes) {
        this.setState({ nodes: nodes, loaded: true });
      } else {
        this.setState({ loaded: true });
      }
    });
  }

  handleDelete(name) {
    deleteNode(name).then((resp) => {
      if (resp.ok) {
        window.location.reload();
      } else {
        this.setState({ showError: true, errorMessage: resp.msg });
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <Message negative hidden={!this.state.showError}>
          {this.state.errorMessage}
        </Message>
        {!this.state.loaded && (
          <Loader active size="huge" inline>
            Loading Nodes`
          </Loader>
        )}
        {this.state.loaded && (
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Active</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {this.state.nodes.map((node, i) => {
                return (
                  <tr key={`${i}_${node.name}`}>
                    <td>
                      <Link to={`/nodes/${node.name}`}>{node.name}</Link>
                    </td>
                    <td>{node.address}</td>
                    <td>{node.active.toString()}</td>
                    <td>
                      <Button
                        onClick={() => this.handleDelete(node.name)}
                        negative
                        disabled={node.active}
                      >
                        {node.active ? "Cannot delete active node" : "Delete"}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </React.Fragment>
    );
  }
}

export default NodeTable;
