import React, { Component } from 'react';
import {Header} from 'semantic-ui-react';
import {Route} from "react-router-dom";
import NewApp from "./new-app/NewApp";

class New extends Component {
  componentDidMount() {
    document.title = "Agogos - New"
  }

  render() {
    return (
      <React.Fragment>
        <Header as='h1' className='page-header'>New</Header>
        <Route exact path="/new/application" component={NewApp}/>
      </React.Fragment>
    );
  }
}

export default New;
