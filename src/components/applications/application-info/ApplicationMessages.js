import React, { Component } from 'react';
import {Icon, Table} from "semantic-ui-react";
import "./InfoDisplay.css"

class ApplicationMessages extends Component {
  render() {
    return (
      <React.Fragment>
        <Table basic='very' celled className={'info-table'}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                Messages {this.props.app.messages.length > 0 && <Icon className={'attention'}/>}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.app && this.props.app.messages.map((msg, i) => {
              return (<Table.Row key={`${msg}-${i}`} warning>
                <Table.Cell>
                  {msg}
                </Table.Cell>
              </Table.Row>)
            })}
            {this.props.app.messages.length === 0 && <Table.Row><Table.Cell>-</Table.Cell></Table.Row>}
          </Table.Body>
        </Table>
      </React.Fragment>
    );
  }
}

export default ApplicationMessages;
