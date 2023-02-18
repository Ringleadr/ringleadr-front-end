import React, { Component } from 'react';
import {Breadcrumb, Loader, Table} from 'semantic-ui-react';
import api from "../../../api/api";
import {Link} from "react-router-dom";

class NetworkInfoPage extends Component {
  state = {
    appsInNetwork: [],
    loaded: false,
  };

  componentDidMount() {
    document.title = `Agogos - Networks - ${this.props.match.params.name}`;
    api.getApps().then(apps => {
      if (apps) {
        this.setState({appsInNetwork: apps.filter(app => app.networks.includes(this.props.match.params.name)).map(app => app.name), loaded: true})
      } else {
        this.setState({loaded: true})
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <Breadcrumb>
          <Breadcrumb.Section><Link to='/networks'>Networks</Link></Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section active>{this.props.match.params.name}</Breadcrumb.Section>
        </Breadcrumb>
        {!this.state.loaded && <Loader active size='huge' inline>Loading {this.props.match.params.name}</Loader>}
        {this.state.loaded && <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Applications in {this.props.match.params.name}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.appsInNetwork.map((app, i) => {
              return (
                <Table.Row key={`${i}-${app}`}>
                  <Table.Cell><Link to={`/applications/${app}`}>{app}</Link></Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>}
      </React.Fragment>
    );
  }
}

export default NetworkInfoPage;
