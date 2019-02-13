import React, { Component } from 'react';
import {Button, Loader} from 'semantic-ui-react';
import './Applications.css';
import api from "../../api/api";
import {Link} from "react-router-dom";
import AppTable from "./AppTable";

class ApplicationTable extends Component {
  state = {
    applications: [],
    loaded: false,
  };

  componentDidMount() {
    document.title = "Agogos - Applications";
    api.getApps().then(apps => {
      if (apps) {
        this.setState({applications: apps, loaded: true});
      } else {
        this.setState({loaded: true})
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.loaded && <Loader active size='huge' inline>Loading Applications</Loader>}
        {this.state.loaded && this.state.applications && <AppTable applications={this.state.applications}/>}
        <Link to={"/new/application"}><Button positive>New Application</Button></Link>
      </React.Fragment>
    );
  }
}

export default ApplicationTable;
