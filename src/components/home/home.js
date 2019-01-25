import React, { Component } from 'react';
import {Grid, Header, Menu} from "semantic-ui-react";
import ApplicationPage from "../applications/ApplicationPage";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SideNav from "../side-nav/side-nav";
import NetworkPage from "../networks/NetworkPage";

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e) {
    console.log(e);
  }

  render() {
    return (
      <Router>
      <Grid>
        <Grid.Column width={2}>
        <SideNav/>
        </Grid.Column>
        <Grid.Column width={12}>
          <Route path="/applications" component={ApplicationPage}/>
          <Route path="/networks" component={NetworkPage}/>
        </Grid.Column>
      </Grid>
      </Router>
    );
  }
}

export default Home;
