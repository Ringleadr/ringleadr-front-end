import React, { Component } from 'react';
import {Button, Loader, Message, Table} from 'semantic-ui-react';
import api from "../../api/api";
import {Link} from "react-router-dom";

class StorageTable extends Component {
  state = {
    storage: [],
    loaded: false,
    showSuccess: false,
    showFailure: false,
    failureMessage: '',
  };

  constructor(props) {
    super(props);
    this.deleteStorage = this.deleteStorage.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
  }


  componentDidMount() {
    document.title = "Agogos - Storage";
    api.getStorage().then(storage => {
      if (storage) {
        this.setState({storage: storage, loaded: true});
      } else {
        this.setState({loaded: true})
      }
    })
  }

  deleteStorage(name) {
    api.deleteStorage(name).then((resp) => {
      if (resp.ok) {
        this.setState({showSuccess: true});
        setTimeout(() => window.location.reload(), 1500);
      } else {
        this.setState({showFailure: true, failureMessage: resp.msg})
      }
    });
  }

  deleteAll() {
    api.deleteAllStorage().then(resp => {
      if (resp.ok) {
        this.setState({showSuccess: true});
        setTimeout(() => window.location.reload(), 1000);
      } else {
        this.setState({showFailure: true, failureMessage: resp.msg});
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <Message positive hidden={!this.state.showSuccess}>Success</Message>
        <Message error hidden={!this.state.showFailure}>
          <Message.Header>Something went wrong</Message.Header>
          {this.state.failureMessage}
        </Message>
        {!this.state.loaded && <Loader active size='huge' inline>Loading Storage</Loader>}
        {this.state.loaded && <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.storage.map((store, i) => {
              return <Table.Row key={`${i}_${store.name.substring(7)}`}>
                <Table.Cell>
                  <Link to={`/storage/${store.name.substring(7)}`}>{store.name.substring(7)}</Link>
                </Table.Cell>
                <Table.Cell>
                  <Button negative onClick={() => this.deleteStorage(store.name)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
            })}
          </Table.Body>
        </Table>}
        <Link to={"/new/storage"}><Button positive>New Storage</Button></Link>
        <Button negative onClick={this.deleteAll} disabled={this.state.storage.length === 0} >Delete all Storage</Button>
      </React.Fragment>
    );
  }
}

export default StorageTable;
