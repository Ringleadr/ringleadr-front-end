import { useNodes } from "../api/hooks";
import { Spinner } from "flowbite-react";
import React from "react";
import { NodeTable } from "../components/nodes/NodeTable";

export function Nodes() {
  const { nodes, isLoading, isError } = useNodes();
  return (
    <div>
      <div>
        {isLoading ? <Spinner size={"xl"} /> : <NodeTable nodes={nodes} />}
      </div>
    </div>
  );
}
