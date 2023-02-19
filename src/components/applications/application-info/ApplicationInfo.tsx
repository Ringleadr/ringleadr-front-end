import React, { Component, useState } from "react";
import { Breadcrumb, Loader } from "semantic-ui-react";
import InfoDisplay from "./InfoDisplay";
import { Link, useParams } from "react-router-dom";
import { getApp } from "../../../api/api";

function ApplicationInfo() {
  const initialState = {
    loaded: false,
    application: {},
  };
  let [state, setState] = useState(initialState);
  let { name } = useParams();

  !state.loaded &&
    getApp(name!).then((app) => {
      if (app) {
        setState({ application: app, loaded: true });
      } else {
        setState({ application: {}, loaded: true });
      }
    });

  return (
    <React.Fragment>
      <Breadcrumb>
        <Breadcrumb.Section>
          <Link to="/applications">Applications</Link>
        </Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section active>{name}</Breadcrumb.Section>
      </Breadcrumb>
      {!state.loaded && (
        <Loader active inline size="huge">
          Loading {name}
        </Loader>
      )}
      {state.loaded && <InfoDisplay app={state.application} />}
    </React.Fragment>
  );
}

export default ApplicationInfo;
