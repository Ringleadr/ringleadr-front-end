import React, { Component } from 'react';
import {Breadcrumb, Header, Loader} from 'semantic-ui-react';
import api from "../../../api/api";
import {Link} from "react-router-dom";
import AppTable from "../../applications/AppTable";
import NodeStats from "./NodeStats";
import './info.css'

class NodeInfoPage extends Component {
  state = {
    appsOnNode: [],
    loaded: false,
  };

  componentDidMount() {
    document.title = `Agogos - Nodes - ${this.props.match.params.name}`;
    api.getApps().then(apps => {
      if (apps) {
        this.setState({appsOnNode: apps.filter(app => app.node === (this.props.match.params.name)), loaded: true})
      } else {
        this.setState({loaded: true})
      }
    });
    api.getNodeStats(this.props.match.params.name).then(stats => {
      if (stats) {
        this.setState({nodeStats: stats})
      } else {

      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <Breadcrumb>
          <Breadcrumb.Section><Link to='/Nodes'>Nodes</Link></Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section active>{this.props.match.params.name}</Breadcrumb.Section>
        </Breadcrumb>
        <Header as={"h2"}>Applications running on {this.props.match.params.name}</Header>
        {!this.state.loaded && <Loader active size='huge' inline>Loading {this.props.match.params.name}</Loader>}
        {this.state.loaded && this.state.appsOnNode && <AppTable applications={this.state.appsOnNode} />}
        {this.state.nodeStats && <NodeStats stats={this.state.nodeStats}/>}
      </React.Fragment>
    );
  }
}

export default NodeInfoPage;
