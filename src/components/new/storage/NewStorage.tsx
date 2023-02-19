import React, { Component } from "react";
import { Button, Form, Header, Input, Message } from "semantic-ui-react";
import { redirect } from "react-router-dom";
import { createStorage } from "../../../api/api";

class NewStorage extends Component {
  state = {
    value: "",
    showSuccess: false,
    showFailure: false,
    failureMessage: "",
    redirect: false,
  };

  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.title = "Agogos - New Storage";
  }

  handleOnChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit() {
    this.setState({ showSuccess: false, showFailure: false });
    if (this.state.value === "") {
      this.setState({
        showFailure: true,
        failureMessage: "Storage name cannot be empty",
      });
      return;
    }
    createStorage(this.state.value).then((resp) => {
      if (resp.ok) {
        this.setState({ showSuccess: true });
        setTimeout(() => this.setState({ redirect: true }), 1500);
      } else {
        this.setState({ showFailure: true, failureMessage: resp.msg });
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.redirect && <Redirect to={"/storage"} />}
        <Header as={"h1"}>Storage</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field required width={4}>
            <label>Name</label>
            <Input
              value={this.state.value}
              onChange={this.handleOnChange}
              error={this.state.showFailure}
            />
          </Form.Field>

          <Button type="submit">Submit</Button>
        </Form>

        <Message positive hidden={!this.state.showSuccess}>
          Storage successfully created
        </Message>
        <Message error hidden={!this.state.showFailure}>
          <Message.Header>Something went wrong</Message.Header>
          {this.state.failureMessage}
        </Message>
      </React.Fragment>
    );
  }
}

export default NewStorage;
