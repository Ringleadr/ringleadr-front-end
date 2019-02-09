import React, { Component } from 'react';
import {Button, Form, Header, Input, Message} from 'semantic-ui-react';
import api from "../../../api/api";

class NewNetwork extends Component {
  state = {
    value: '',
    showSuccess: false,
    showFailure: false,
    failureMessage: '',
  };

  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.title = "Agogos - New Network"
  }

  handleOnChange(e) {
    this.setState({value: e.target.value})
  }

  handleSubmit() {
    this.setState({showSuccess: false, showFailure: false});
    if (this.state.value === '') {
      this.setState({showFailure: true, failureMessage: 'Network name cannot be empty'});
      return
    }
    api.createNetwork(this.state.value).then(resp => {
      if (resp.ok) {
        this.setState({showSuccess: true});
        setTimeout(() => window.location = "/networks", 1500);
      } else {
        this.setState({showFailure: true, failureMessage: resp.msg});
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <Header as={'h1'}>Network</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field required width={4}>
            <label>Name</label>
            <Input value={this.state.value} onChange={this.handleOnChange} error={this.state.showFailure}/>
          </Form.Field>

          <Button type='submit'>Submit</Button>
        </Form>

        <Message positive hidden={!this.state.showSuccess}>Network successfully created</Message>
        <Message error hidden={!this.state.showFailure}>
          <Message.Header>Something went wrong</Message.Header>
          {this.state.failureMessage}
        </Message>
      </React.Fragment>
    );
  }
}

export default NewNetwork;
