import React, { Component } from 'react';
import {Button, Loader, Message, Table} from 'semantic-ui-react';
import api from "../../api/api";
import {Link} from "react-router-dom";

class NetworkTable extends Component {
  state = {
    networks: [],
    loaded: false,
    showSuccess: false,
    showFailure: false,
    failureMessage: '',
  };

  componentDidMount() {
    document.title = "Agogos - Networks";
    api.getNetworks().then(nets => {
      if (nets) {
        this.setState({networks: nets, loaded: true});
      } else {
        this.setState({loaded: true})
      }
    })
  }

  deleteNetwork(name) {
    api.deleteNetwork(name).then((resp) => {
      if (resp.ok) {
        this.setState({showSuccess: true});
        setTimeout(() => window.location.reload(), 1500);
      } else {
        this.setState({showFailure: true, failureMessage: resp.msg})
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <Message positive hidden={!this.state.showSuccess}>Network successfully deleted</Message>
        <Message error hidden={!this.state.showFailure}>
          <Message.Header>Something went wrong</Message.Header>
          {this.state.failureMessage}
        </Message>
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
              return <Table.Row key={`${i}_${net.name.substring(7)}`}>
                <Table.Cell>
                  <Link to={`/networks/${net.name.substring(7)}`}>{net.name.substring(7)}</Link>
                </Table.Cell>
                <Table.Cell>
                  <Button negative onClick={() => this.deleteNetwork(net.name)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
            })}
          </Table.Body>
        </Table>}
        <Link to={"/new/network"}><Button positive>New Network</Button></Link>

      </React.Fragment>
    );
  }
}

export default NetworkTable;
