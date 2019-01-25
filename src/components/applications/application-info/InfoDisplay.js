import React, { Component } from 'react';
import {Grid, Form, TextArea, Button, Header, List, Table} from "semantic-ui-react";
import "./InfoDisplay.css"
import {Link} from "react-router-dom";
import ApplicationComponents from "./ApplicationComponents";
import ApplicationNetworks from "./ApplicationNetworks";
import ApplicationStorage from "./ApplicationStorage";

class InfoDisplay extends Component {
  render() {
    return (
      <React.Fragment>
        <Grid columns={2} padded stackable>
          <Grid.Column>
            <Header as="h2">{this.props.app.name}</Header>
            <ApplicationComponents app={this.props.app}/>
            <ApplicationNetworks app={this.props.app}/>
            <ApplicationStorage app={this.props.app}/>
          </Grid.Column>
          <Grid.Column>
            <Header as="h3">Raw:</Header>
            <Form>
              <TextArea className='code-area' autoHeight value={JSON.stringify(this.props.app, null, 4)}/>
            </Form>
          </Grid.Column>
        </Grid>
        <Grid centered columns={1} padded>
          <Button color="yellow">Update</Button>
          <Button negative>Delete</Button>
        </Grid>
      </React.Fragment>
    );
  }
}

export default InfoDisplay;
