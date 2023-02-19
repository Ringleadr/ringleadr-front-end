import React, { Component, useState } from "react";
import { Breadcrumb, Loader } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import CompInfoDisplay from "./CompInfoDisplay";
import { getCompInfo } from "../../../api/api";

function ComponentInfo() {
  const initialState = {
    loaded: false,
    comp: {},
  };
  let [state, setState] = useState(initialState);
  let { name, compName } = useParams();

  !state.loaded &&
    getCompInfo(name!, compName!).then((comp) => {
      if (comp) {
        setState({ comp: comp, loaded: true });
      } else {
        setState({ comp: {}, loaded: true });
      }
    });

  return (
    <React.Fragment>
      <Breadcrumb>
        <Breadcrumb.Section>
          <Link to="/applications">Applications</Link>
        </Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section>
          <Link to={`/applications/${name}`}>{name}</Link>
        </Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section active>{compName}</Breadcrumb.Section>
      </Breadcrumb>
      {!state.loaded && (
        <Loader active inline size="huge">
          Loading {compName}
        </Loader>
      )}
      {state.loaded && <CompInfoDisplay comp={state.comp} />}
    </React.Fragment>
  );
}

export default ComponentInfo;
