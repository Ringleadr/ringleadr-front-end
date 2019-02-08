import React, { Component } from 'react';
import {Grid} from "semantic-ui-react";
import ApplicationPage from "../applications/ApplicationPage";
import { BrowserRouter as Router, Route} from "react-router-dom";
import SideNav from "../side-nav/side-nav";
import NetworkPage from "../networks/NetworkPage";
import StoragePage from "../storage/StoragePage";
import NodePage from "../nodes/NodePage";
import OverviewPage from "../overview/OverviewPage";
import New from "../new/New";

class Home extends Component {
  render() {
    return (
      <Router>
      <Grid>
        <Grid.Column width={2}>
        <SideNav/>
        </Grid.Column>
        <Grid.Column width={12}>
          <Route exact path="/" component={OverviewPage} />
          <Route path="/applications" component={ApplicationPage}/>
          <Route path="/networks" component={NetworkPage}/>
          <Route path="/storage" component={StoragePage}/>
          <Route path="/nodes" component={NodePage}/>
          <Route path="/new" component={New}/>
        </Grid.Column>
      </Grid>
      </Router>
    );
  }
}

export default Home;
