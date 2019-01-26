import React, { Component } from 'react';
import {Button, Form, Header, TextArea} from "semantic-ui-react";
import ComponentGraph from "./ComponentGraph";

class CompInfoDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick() {
    this.setState({show: !this.state.show})
  }

  render() {
    return (
      <React.Fragment>
        <Header as="h2">
          {this.props.comp.name}
        </Header>
        <ComponentGraph comp={this.props.comp}/>
        <Button onClick={this.handleClick}>Toggle Raw View</Button>
        {this.state.show && <Form>
          <TextArea className='code-area'
                    autoHeight
                    value={JSON.stringify(this.props.comp.cpu_usage.map(entry => {
                      entry.date = new Date(entry.time_stamp * 1000);
                      return entry
                    }), null, 4)}/>
        </Form>}
      </React.Fragment>
    );
  }
}

export default CompInfoDisplay;
