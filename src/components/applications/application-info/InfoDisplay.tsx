import React, { Component } from 'react';
import { Grid, Form, TextArea, Button, Header, Message, Icon } from "semantic-ui-react";
import "./InfoDisplay.css"
import ApplicationComponents from "./ApplicationComponents";
import ApplicationNetworks from "./ApplicationNetworks";
import ApplicationStorage from "./ApplicationStorage";
import api from "../../../api/api";
import ApplicationNode from "./ApplicationNode";
import ApplicationMessages from "./ApplicationMessages";
import ComponentGraphWrapper from "../component-info/ComponentGraphWrapper";
import { redirect } from "react-router-dom";

class InfoDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areaValue: JSON.stringify(this.removeAppName(this.props.app), null, 4),
      showSuccess: false,
      showFailure: false,
      failureMessage: '',
      validJSON: true,
      redirect: false,
    };
    try {
      JSON.parse(JSON.stringify(this.removeAppName(this.props.app), null, 4))
    } catch (e) {
      this.state.validJSON = false
    }
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  removeAppName(app) {
    let dup = {};
    for (let key in app) {
      if (key !== 'name') {
        dup[key] = app[key];
      }
    }
    return dup;
  }

  handleOnChange(e) {
    try {
      JSON.parse(e.target.value);
      this.setState({ areaValue: e.target.value, validJSON: true });
    } catch (err) {
      this.setState({ areaValue: e.target.value, validJSON: false });
    }
  }

  handleDelete() {
    api.deleteApp(this.props.app.name).then(resp => {
      if (resp.ok) {
        this.setState({ showSuccess: true });
        setTimeout(() => {
          this.setState({ redirect: true });
        }, 1500)
      } else {
        this.setState({ showFailure: true, failureMessage: resp.msg });
      }
    })
  }

  handleUpdate() {
    if (this.state.validJSON) {
      let updatedApp = JSON.parse(this.state.areaValue);
      updatedApp.name = this.props.app.name;
      console.log(updatedApp);
      api.updateApp(JSON.stringify(updatedApp)).then(resp => {
        if (resp.ok) {
          this.setState({ showSuccess: true });
          setTimeout(() => {
            this.setState({ redirect: true });
          }, 1500)
        } else {
          this.setState({ showFailure: true, failureMessage: resp.msg });
        }
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.redirect && <Redirect to={"/applications"} />}
        <Message positive size='big' floating hidden={!this.state.showSuccess}>
          <b>Success</b>
        </Message>
        <Message negative size='big' floating hidden={!this.state.showFailure}>
          <Message.Header>Something went wrong. Response from server:</Message.Header>
          {this.state.failureMessage}
        </Message>
        <Grid columns={2} padded stackable>
          <Grid.Column>
            <Header as="h2">{this.props.app.name}</Header>
            <Grid columns={2} padded stackable>
              <Grid.Column>
                <ApplicationComponents app={this.props.app} />
                <ApplicationStorage app={this.props.app} />
              </Grid.Column>
              <Grid.Column>
                <ApplicationNetworks app={this.props.app} />
                <ApplicationNode app={this.props.app} />
              </Grid.Column>
            </Grid>
            <ApplicationMessages app={this.props.app} />
          </Grid.Column>
          <Grid.Column>
            <Header as="h3">Raw:</Header>
            <Form>
              <TextArea className='code-area' autoHeight value={this.state.areaValue} onChange={this.handleOnChange} />
              {!this.state.validJSON && <Message visible error>
                <Icon name='attention' />
                Invalid JSON
              </Message>}
            </Form>
          </Grid.Column>
        </Grid>
        <Grid centered columns={1} padded>
          <Button onClick={this.handleUpdate} disabled={!this.state.validJSON}>Update</Button>
          <Button negative onClick={this.handleDelete}>Delete</Button>
        </Grid>

        <Header as={'h3'}>Stats</Header>
        {this.props.app.components.map((comp, i) => {
          return (<ComponentGraphWrapper compName={comp.name} appName={this.props.app.name} key={`comp-${i}`} />)
        })}

      </React.Fragment>
    );
  }
}

export default InfoDisplay;
