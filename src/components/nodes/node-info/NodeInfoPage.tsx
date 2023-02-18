import React, {useState} from 'react';
import {Breadcrumb, Header, Loader} from 'semantic-ui-react';
import api from "../../../api/api";
import {Link, useParams} from "react-router-dom";
import AppTable from "../../applications/AppTable";
import NodeStats from "./NodeStats";
import './info.css'


// document.title = `Agogos - Nodes - ${match.params.name}`;

function NodeInfoPage() {
  let {name} = useParams();
  let [state, setState] = useState({
    appsOnNode: [],
    loadedApps: false,
    loadedStats: false,
    nodeStats: undefined
  });
  console.log(state);

  !state.loadedApps && api.getApps().then(apps => {
    if (apps) {
      setState({
        ...state,
        appsOnNode: apps.filter(app => app.node === (name)),
        loadedApps: true
      });
    } else {
      setState({
        ...state,
        appsOnNode: [],
        loadedApps: true
      });
    }
  });
  !state.loadedStats && api.getNodeStats(name!).then(stats => {
    if (stats) {
      setState({
        ...state,
        loadedStats: true,
        nodeStats: stats
      });
    } else {
      setState({
        ...state,
        loadedStats: true
      });
    }
  });

  return (
    <React.Fragment>
      <Breadcrumb>
        <Breadcrumb.Section><Link to='/Nodes'>Nodes</Link></Breadcrumb.Section>
        <Breadcrumb.Divider/>
        <Breadcrumb.Section active>{name}</Breadcrumb.Section>
      </Breadcrumb>
      <Header as={"h2"}>Applications running on {name}</Header>
      {!state.loadedApps && <Loader active size='huge' inline>Loading {name}</Loader>}
      {state.loadedApps && state.appsOnNode && <AppTable applications={state.appsOnNode}/>}
      {!state.loadedStats && <Loader active size='huge' inline>Loading {name} stats</Loader>}
      {state.loadedStats && state.nodeStats ? <NodeStats stats={state.nodeStats.stats} name={state.nodeStats.name}/> :
        <Header as={'h3'}>No statistics available</Header>}
    </React.Fragment>
  );

}

export default NodeInfoPage;
