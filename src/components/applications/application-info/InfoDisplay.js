import React, { Component } from 'react';
import {Grid, Form, TextArea, Button, Header, Message, Icon} from "semantic-ui-react";
import "./InfoDisplay.css"
import ApplicationComponents from "./ApplicationComponents";
import ApplicationNetworks from "./ApplicationNetworks";
import ApplicationStorage from "./ApplicationStorage";
import api from "../../../api/api";
import ApplicationNode from "./ApplicationNode";
import ApplicationMessages from "./ApplicationMessages";

class InfoDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areaValue: JSON.stringify(this.props.app, null, 4),
      showSuccess: false,
      showFailure: false,
      validJSON: true,
    };
    try {
      JSON.parse(JSON.stringify(this.props.app, null, 4))
    } catch (e) {
      this.state.validJSON = false
    }
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleOnChange(e) {
    try {
      JSON.parse(e.target.value);
      this.setState({areaValue: e.target.value, validJSON: true});
    } catch (err) {
      this.setState({areaValue: e.target.value, validJSON: false});
    }
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

  handleUpdate() {
    if (this.state.validJSON) {
      api.updateApp(this.state.areaValue).then(success => {
        if (success) {
          this.setState({showSuccess: true});
          setTimeout(function() {
            window.location = `/applications`;
          }, 1500)
        } else {
          this.setState({showFailure: true});
          //Don't redirect... but maybe do something?
        }
      })
    }
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
                <ApplicationNode app={this.props.app}/>
              </Grid.Column>
            </Grid>
            <ApplicationMessages app={this.props.app}/>
          </Grid.Column>
          <Grid.Column>
            <Header as="h3">Raw:</Header>
            <Form>
              <TextArea className='code-area' autoHeight value={this.state.areaValue} onChange={this.handleOnChange}/>
              {!this.state.validJSON && <Message visible error>
                <Icon name='attention' />
                Invalid JSON
              </Message>}
            </Form>
          </Grid.Column>
        </Grid>
        <Grid centered columns={1} padded>
          <Button color="yellow" onClick={this.handleUpdate}>Update</Button>
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
