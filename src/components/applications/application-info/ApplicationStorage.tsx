import React, { Component } from 'react';
import {Popup, Table} from "semantic-ui-react";
import "./InfoDisplay.css"
import {Link} from "react-router-dom";

class ApplicationStorage extends Component {
  render() {
    let storeResults = [];
    return (
      <React.Fragment>
        <Table basic='very' celled collapsing className={'info-table'}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                Storage Name
              </Table.HeaderCell>
              <Table.HeaderCell>
                In Component
              </Table.HeaderCell>
              <Table.HeaderCell>
                Mount Path
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.app && this.props.app.components.forEach((comp) => {
              if (comp.storage.length > 0) {
                comp.storage.forEach(store => {
                  storeResults.push({comp: comp.name, name: store.name, mount: store.mount_path})
                })
              }
            })}
            {storeResults.length === 0 ? <Table.Row><Table.Cell>-</Table.Cell></Table.Row> : storeResults.map((res, i) => {
              return (<Table.Row key={`${res.comp}-${res.name}-${i}`}>
                <Table.Cell>
                  {res.name.charAt(0) !== '/' ? <Link to={`/storage/${res.name}`}>{res.name}</Link> :
                    <Popup trigger={<code>{res.name}</code>} content={"Mounted from host machine"} inverted basic position={"left center"}/>}
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/applications/${this.props.app.name}/${res.comp}`}>{res.comp}</Link>
                </Table.Cell>
                <Table.Cell>
                  <code>{res.mount}</code>
                </Table.Cell>
              </Table.Row>)
            })}
          </Table.Body>
        </Table>
      </React.Fragment>
    );
  }
}

export default ApplicationStorage;
