import { Node } from "../../api/types";
import React from "react";
import { Table } from "flowbite-react";

export interface NodeTableProps {
  nodes: Node[];
}

export function NodeTable(props: NodeTableProps) {
  return (
    <Table hoverable={true}>
      <Table.Head>
        <Table.HeadCell>Name</Table.HeadCell>
        <Table.HeadCell>Address</Table.HeadCell>
        <Table.HeadCell>Is Active?</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {props.nodes.map((node, index) => (
          <Table.Row key={index}>
            <Table.Cell>{node.name}</Table.Cell>
            <Table.Cell>{node.address}</Table.Cell>
            <Table.Cell>{node.active.toString()}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
