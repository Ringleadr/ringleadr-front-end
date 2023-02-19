import React, { Component } from "react";
import "../components/applications/Applications.css";
import ApplicationTable from "../components/applications/ApplicationTable";
import { Header } from "semantic-ui-react";
import { Route, Routes } from "react-router-dom";
import ApplicationInfo from "../components/applications/application-info/ApplicationInfo";
import ComponentInfo from "../components/applications/component-info/ComponentInfo";

class ApplicationPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Header as="h2" className="page-header">
          Applications
        </Header>
        <Routes>
          <Route index element={<ApplicationTable />} />
          <Route path=":name" element={<ApplicationInfo />} />
          <Route path=":name/:compName" element={<ComponentInfo />} />
        </Routes>
      </React.Fragment>
    );
  }
}

export default ApplicationPage;
