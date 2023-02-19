import React, { Component } from "react";
import "./Applications.css";
import { Link } from "react-router-dom";
import { Table } from "@mui/joy";

class AppTable extends Component {
  render() {
    return (
      <Table hoverRow borderAxis={"both"} variant={"plain"}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Components</th>
            <th>Node</th>
            <th>Messages</th>
          </tr>
        </thead>

        <tbody>
          {this.props.applications.map((app, i) => {
            return (
              <tr key={`${i}_${app}`}>
                <td>
                  <Link to={`/applications/${app.name}`}>{app.name}</Link>
                </td>
                <td>{app.components.length}</td>
                <td>
                  <Link to={`/nodes/${app.node}`}>{app.node}</Link>
                </td>
                <td>{app.messages}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}

export default AppTable;
