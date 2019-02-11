import React, { Component } from 'react';
import {Header} from 'semantic-ui-react';
import {Route} from "react-router-dom";
import NewApp from "./app/NewApp";
import NewNetwork from "./network/NewNetwork";
import NewStorage from "./storage/NewStorage";

class New extends Component {
  componentDidMount() {
    document.title = "Agogos - New"
  }

  render() {
    return (
      <React.Fragment>
        <Header as='h1' className='page-header'>New</Header>
        <Route exact path="/new/application" component={NewApp}/>
        <Route exact path="/new/network" component={NewNetwork}/>
        <Route exact path="/new/storage" component={NewStorage}/>

      </React.Fragment>
    );
  }
}

export default New;
