import React, { Component } from 'react';
import {Grid, Form, TextArea, Button, Header} from "semantic-ui-react";
import "./InfoDisplay.css"
import ApplicationComponents from "./ApplicationComponents";
import ApplicationNetworks from "./ApplicationNetworks";
import ApplicationStorage from "./ApplicationStorage";

class InfoDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areaValue: JSON.stringify(this.props.app, null, 4)
    }
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e) {
    this.setState({areaValue: e.target.value})
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
          <Button negative>Delete</Button>
        </Grid>
      </React.Fragment>
    );
  }
}

export default InfoDisplay;
