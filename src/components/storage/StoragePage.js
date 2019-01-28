import React, { Component } from 'react';
import {Header} from "semantic-ui-react";
import {Route} from "react-router-dom";
import StorageTable from "./StorageTable";
import StorageInfoPage from "./storage-info/StorageInfoPage";

class StoragePage extends Component {
  render() {
    return (
      <React.Fragment>
        <Header as='h2' className='page-header'>Storage</Header>
        <Route exact path="/storage" component={StorageTable}/>
        <Route exact path="/storage/:name" component={StorageInfoPage}/>
      </React.Fragment>
    );
  }
}

export default StoragePage;
