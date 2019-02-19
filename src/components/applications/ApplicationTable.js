import React, { Component } from 'react';
import {Button, Loader, Message} from 'semantic-ui-react';
import './Applications.css';
import api from "../../api/api";
import {Link} from "react-router-dom";
import AppTable from "./AppTable";

class ApplicationTable extends Component {
  state = {
    applications: [],
    loaded: false,
    showSuccess: false,
    showFailure: false,
    failureMessage: '',
  };

  constructor(props) {
    super(props);
    this.deleteAll = this.deleteAll.bind(this);
  }

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

  deleteAll() {
    api.deleteAllApps().then(resp => {
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
        {!this.state.loaded && <Loader active size='huge' inline>Loading Applications</Loader>}
        <Message positive hidden={!this.state.showSuccess}>Success</Message>
        <Message negative hidden={!this.state.showFailure}>
          <Message.Header>Something went wrong</Message.Header>
          {this.state.failureMessage}
        </Message>
        {this.state.loaded && this.state.applications && <AppTable applications={this.state.applications}/>}
        <Link to={"/new/application"}><Button positive>New Application</Button></Link>
        <Button negative onClick={this.deleteAll} disabled={this.state.applications.length === 0}>Delete all applications</Button>
      </React.Fragment>
    );
  }
}

export default ApplicationTable;
