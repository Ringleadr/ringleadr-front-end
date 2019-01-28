import React, { Component } from 'react';
import {Button, Loader, Table} from 'semantic-ui-react';
import api from "../../api/api";
import {Link} from "react-router-dom";

class StorageTable extends Component {
  state = {
    storage: [],
    loaded: false,
  };

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

  render() {
    return (
      <React.Fragment>
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

export default StorageTable;
