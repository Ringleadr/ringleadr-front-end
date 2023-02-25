import { Application } from "../../api/types";
import React from "react";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";

export interface ApplicationTableProps {
  applications: Application[];
}

export function ApplicationTable(props: ApplicationTableProps) {
  return (
    <Table hoverable={true}>
      <Table.Head>
        <Table.HeadCell>Name</Table.HeadCell>
        <Table.HeadCell>Node</Table.HeadCell>
        <Table.HeadCell>Number of Copies</Table.HeadCell>
        <Table.HeadCell>Number of Components</Table.HeadCell>
        <Table.HeadCell>Messages</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {props.applications.map((app, index) => (
          <Table.Row key={index}>
            <Table.Cell className="text-blue-500">
              <Link to={`/applications/${app.name}`}>{app.name}</Link>
            </Table.Cell>
            <Table.Cell>{app.node}</Table.Cell>
            <Table.Cell>{app.copies}</Table.Cell>
            <Table.Cell>{app.components.length}</Table.Cell>
            <Table.Cell>{app.messages.join(", ")}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
