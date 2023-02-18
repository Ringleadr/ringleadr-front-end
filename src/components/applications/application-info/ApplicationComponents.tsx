import React, { Component } from 'react';
import { Table } from "semantic-ui-react";
import "./InfoDisplay.css"
import { Link } from "react-router-dom";

class ApplicationComponents extends Component {
  render() {
    return (
      <React.Fragment>
        <Table basic='very' celled collapsing className={'info-table'}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                Components
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.app && this.props.app.components.map((comp, i) => {
              return (<Table.Row key={`${comp.name}-${i}`}>
                <Table.Cell>
                  <Link to={`/applications/${this.props.app.name}/${comp.name}`}>{comp.name}</Link>
                </Table.Cell>
              </Table.Row>)
            })}
          </Table.Body>
        </Table>
      </React.Fragment>
    );
  }
}

export default ApplicationComponents;
