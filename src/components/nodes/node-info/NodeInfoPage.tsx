import React, { useState } from "react";
import { Breadcrumb, Header, Loader } from "semantic-ui-react";
import { getApps, getNodeStats } from "../../../api/api";
import { Link, useParams } from "react-router-dom";
import AppTable from "../../applications/AppTable";
import NodeStats from "./NodeStats";
import "./info.css";
import { Breadcrumbs, Typography } from "@mui/joy";

function NodeInfoPage() {
  let { name } = useParams();
  let [state, setState] = useState({
    appsOnNode: [],
    loadedApps: false,
    loadedStats: false,
    nodeStats: undefined,
  });

  !state.loadedApps &&
    getApps().then((apps) => {
      if (apps) {
        setState({
          ...state,
          appsOnNode: apps.filter((app) => app.node === name),
          loadedApps: true,
        });
      } else {
        setState({
          ...state,
          appsOnNode: [],
          loadedApps: true,
        });
      }
    });
  !state.loadedStats &&
    getNodeStats(name!).then((stats) => {
      if (stats) {
        setState({
          ...state,
          loadedStats: true,
          nodeStats: stats,
        });
      } else {
        setState({
          ...state,
          loadedStats: true,
        });
      }
    });

  return (
    <React.Fragment>
      <Breadcrumbs>
        <Link to="/Nodes">Nodes</Link>
        <Typography fontSize={"inherit"}>{name}</Typography>
      </Breadcrumbs>
      <Typography level={"h2"}>Applications running on {name}</Typography>
      {!state.loadedApps && (
        <Loader active size="huge" inline>
          Loading {name}
        </Loader>
      )}
      {state.loadedApps && state.appsOnNode && (
        <AppTable applications={state.appsOnNode} />
      )}
      {!state.loadedStats && (
        <Loader active size="huge" inline>
          Loading {name} stats
        </Loader>
      )}
      {state.loadedStats && state.nodeStats ? (
        <NodeStats stats={state.nodeStats.stats} name={state.nodeStats.name} />
      ) : (
        <Header as={"h3"}>No statistics available</Header>
      )}
    </React.Fragment>
  );
}

export default NodeInfoPage;
