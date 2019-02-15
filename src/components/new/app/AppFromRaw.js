import React from "react";
import {Button, Form, Icon, Message, TextArea} from "semantic-ui-react";
import api from "../../../api/api";
import {Redirect} from "react-router-dom";

class AppFromRaw extends React.Component {
  constructor(props) {
    super(props);
    let initialApp = `{
    "name": "",
    "copies": 1,
    "components": [
        {
            "name": "",
            "image": "",
            "replicas": 1,
            "storage": [],
            "ports": {},
            "env": [],
            "status": "",
            "scale_threshold": 0,
            "scale_min": 0,
            "scale_max": 0,
            "network_info": {}
        }
    ],
    "networks": [],
    "messages": [],
    "node": ""
}`;
    this.state = {
      areaValue: initialApp,
      validJSON: true,
      showError: false,
      errorMessage: '',
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOnChange(e) {
    try {
      JSON.parse(e.target.value);
      this.setState({areaValue: e.target.value, validJSON: true});
    } catch (err) {
      this.setState({areaValue: e.target.value, validJSON: false});
    }
  }

  handleSubmit() {
    if (this.state.validJSON) {
      api.createApp(JSON.parse(this.state.areaValue)).then(resp => {
        if (resp.ok) {
          this.setState({showSuccess: true});
          setTimeout(() => {
            this.setState({redirect: true})
          }, 1500)
        } else {
          this.setState({showFailure: true, errorMessage: resp.msg});
        }
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.redirect && <Redirect to={"/applications"}/>}
        <Message size={'big'} positive floating hidden={!this.state.showSuccess}>
          Success
        </Message>
        <Message size={'big'} negative floating hidden={!this.state.showError}>
          <Message.Header>Something went wrong</Message.Header>
          {this.state.errorMessage}
        </Message>
        <Form>
          <TextArea className='code-area' autoHeight value={this.state.areaValue} onChange={this.handleOnChange}/>
          {!this.state.validJSON && <Message visible error>
            <Icon name='attention' />
            Invalid JSON
          </Message>}
        </Form>
        <Button positive onClick={this.handleSubmit} disabled={!this.state.validJSON}>Submit</Button>
      </React.Fragment>
    )
  }

}

export default AppFromRaw;
