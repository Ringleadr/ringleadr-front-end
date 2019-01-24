import React, { Component } from 'react';
import {Grid, Form, TextArea, Button, Placeholder, Header} from "semantic-ui-react";

class InfoDisplay extends Component {
  render() {
    return (
      <React.Fragment>
        <Grid columns={2} padded centered stackable>
          <Grid.Column textAlign="center">
            <Header as="h2">{this.props.app.name}</Header>
            <Placeholder>
              <Placeholder.Image square />
            </Placeholder>
          </Grid.Column>
          <Grid.Column>
            <Form>
              <TextArea autoHeight value={JSON.stringify(this.props.app, null, 4)}/>
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
