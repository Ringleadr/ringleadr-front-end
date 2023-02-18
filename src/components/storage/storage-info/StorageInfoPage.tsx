import React, { Component } from 'react';
import {Breadcrumb, Loader, Table} from 'semantic-ui-react';
import api from "../../../api/api";
import {Link} from "react-router-dom";

class StorageInfoPage extends Component {
  state = {
    appsUsingStorage: [],
    loaded: false,
  };

  componentDidMount() {
    document.title = `Agogos - Storage - ${this.props.match.params.name}`;
    let thisName = this.props.match.params.name;
    api.getApps().then(apps => {
      let customList = [];
      apps.forEach(app => {
        for (let i = 0; i < app.components.length; i++) {
          for (let j = 0; j < app.components[i].storage.length; j++) {
            if (app.components[i].storage[j].name === thisName) {
              customList.push({
                appName: app.name,
                compName: app.components[i].name
              })
            }
          }
        }
      });
      if (apps) {
        this.setState({appsUsingStorage: customList, loaded: true})
      } else {
        this.setState({loaded: true})
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <Breadcrumb>
          <Breadcrumb.Section><Link to='/storage'>Storage</Link></Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section active>{this.props.match.params.name}</Breadcrumb.Section>
        </Breadcrumb>
        {!this.state.loaded && <Loader active size='huge' inline>Loading {this.props.match.params.name}</Loader>}
        {this.state.loaded && <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Applications using {this.props.match.params.name}</Table.HeaderCell>
              <Table.HeaderCell>Component</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.appsUsingStorage.map((app, i) => {
              return (
                <Table.Row key={`${i}-${app.appName}`}>
                  <Table.Cell><Link to={`/applications/${app.appName}`}>{app.appName}</Link></Table.Cell>
                  <Table.Cell><Link to={`/applications/${app.appName}/${app.compName}`}>{app.compName}</Link></Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>}
      </React.Fragment>
    );
  }
}

export default StorageInfoPage;
