import React, { Component } from 'react';
import {Grid, Form, TextArea, Button, Header, Message} from "semantic-ui-react";
import "./InfoDisplay.css"
import ApplicationComponents from "./ApplicationComponents";
import ApplicationNetworks from "./ApplicationNetworks";
import ApplicationStorage from "./ApplicationStorage";
import api from "../../../api/api";

class InfoDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areaValue: JSON.stringify(this.props.app, null, 4),
      showSuccess: false,
      showFailure: false
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleOnChange(e) {
    this.setState({areaValue: e.target.value})
  }

  handleDelete() {
    api.deleteApp(this.props.app.name).then(success => {
      if (success) {
        this.setState({showSuccess: true});
        setTimeout(function() {
          window.location = "/applications";
        }, 1500)
      } else {
        this.setState({showFailure: true});
        //Don't redirect... but maybe do something?
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <Grid columns={2} padded stackable>
          <Grid.Column>
            <Header as="h2">{this.props.app.name}</Header>
            <Grid columns={2} padded stackable>
              <Grid.Column>
                <ApplicationComponents app={this.props.app}/>
                <ApplicationStorage app={this.props.app}/>
              </Grid.Column>
              <Grid.Column>
                <ApplicationNetworks app={this.props.app}/>
              </Grid.Column>
            </Grid>
          </Grid.Column>
          <Grid.Column>
            <Header as="h3">Raw:</Header>
            <Form>
              <TextArea className='code-area' autoHeight value={this.state.areaValue} onChange={this.handleOnChange}/>
            </Form>
          </Grid.Column>
        </Grid>
        <Grid centered columns={1} padded>
          <Button color="yellow">Update</Button>
          <Button negative onClick={this.handleDelete}>Delete</Button>
        </Grid>
        <Message positive size='huge' floating hidden={!this.state.showSuccess}>
          <b>Success</b>
        </Message>
        <Message negative size='huge' floating hidden={!this.state.showFailure}>
          <b>Something went wrong... :(</b>
        </Message>
      </React.Fragment>
    );
  }
}

export default InfoDisplay;
