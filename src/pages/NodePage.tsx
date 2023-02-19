import React from "react";
import { Header } from "semantic-ui-react";
import { Route, Routes } from "react-router-dom";
import NodeTable from "../components/nodes/NodeTable";
import NodeInfoPage from "../components/nodes/node-info/NodeInfoPage";

function NodePage() {
  return (
    <React.Fragment>
      <Header as="h2" className="page-header">
        Nodes
      </Header>
      <Routes>
        <Route index element={<NodeTable />} />
        <Route path={":name"} element={<NodeInfoPage />} />
      </Routes>
    </React.Fragment>
  );
}

export default NodePage;
