import React, { Component } from "react";
import { Button, Header } from "semantic-ui-react";
import { Link, Route } from "react-router-dom";
import NewApp from "./NewApp";
import AppFromRaw from "./AppFromRaw";
import AppFromFile from "./AppFromFile";

class AppIndex extends Component {
  componentDidMount() {
    document.title = "Agogos - New Application";
  }

  render() {
    return (
      <React.Fragment>
        <Header as={"h2"}>Application</Header>
        <Link to={"/new/application/form"}>
          <Button size={"massive"}>via Form</Button>
        </Link>
        <Link to={"/new/application/json"}>
          <Button size={"massive"}>via JSON</Button>
        </Link>
        <Link to={"/new/application/file"}>
          <Button size={"massive"}>via File upload</Button>
        </Link>

        <Route exact path={"/new/application/form"} component={NewApp} />
        <Route exact path={"/new/application/json"} component={AppFromRaw} />
        <Route exact path={"/new/application/file"} component={AppFromFile} />
      </React.Fragment>
    );
  }
}

export default AppIndex;
