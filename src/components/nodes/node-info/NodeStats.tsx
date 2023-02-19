import React from "react";
import { Container, Header, Message, Statistic } from "semantic-ui-react";
import CpuGraph from "./CpuGraph";
import MemoryGraph from "./MemoryGraph";
import { NodeStatistics } from "../../../api/types";

function sizeOf(bytes: number) {
  if (bytes === 0) {
    return "0.00 B";
  }
  let e = Math.floor(Math.log(bytes) / Math.log(1024));
  return (
    (bytes / Math.pow(1024, e)).toFixed(2) + " " + " KMGTP".charAt(e) + "B"
  );
}

function timeSince(unixTime: number) {
  let timeStamp = new Date(unixTime * 1000);
  let now = new Date(),
    secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
  if (secondsPast < 60) {
    return `${Math.floor(secondsPast)} seconds ago`;
  }
  if (secondsPast < 3600) {
    return `${Math.floor(secondsPast / 60)} minutes ago`;
  }
  if (secondsPast <= 86400) {
    return `${Math.floor(secondsPast / 3600)} hours ago`;
  }

  if (secondsPast > 86400) {
    return `${timeStamp.toLocaleTimeString()} ${timeStamp.toLocaleDateString()}`;
  }
}

function NodeStats(nodeStats: NodeStatistics) {
  return (
    <React.Fragment>
      <Header as={"h2"}>Statistics</Header>
      <Container textAlign={"center"}>
        <div className={"main-stats"}>
          <Statistic>
            <Statistic.Value>
              {nodeStats.stats[nodeStats.stats.length - 1].cpus}
            </Statistic.Value>
            <Statistic.Label>
              CPU core
              {nodeStats.stats[nodeStats.stats.length - 1].cpus !== 1
                ? "s"
                : ""}
            </Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value>
              {sizeOf(nodeStats.stats[nodeStats.stats.length - 1].total_mem)}
            </Statistic.Value>
            <Statistic.Label>of Memory</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value>
              {nodeStats.stats[nodeStats.stats.length - 1].num_containers}
            </Statistic.Value>
            <Statistic.Label>
              Running Ringleadr Container
              {nodeStats.stats[nodeStats.stats.length - 1].num_containers !== 1
                ? "s"
                : ""}
            </Statistic.Label>
          </Statistic>
        </div>
      </Container>

      <p>
        Last recorded:{" "}
        {timeSince(nodeStats.stats[nodeStats.stats.length - 1].timestamp)}
      </p>
      {nodeStats.stats[nodeStats.stats.length - 1].unavailable.length > 0 && (
        <Message
          warning
          icon={"warning circle"}
          header={"The following stats are unavailable"}
          size={"large"}
          content={nodeStats.stats[nodeStats.stats.length - 1].unavailable.join(
            ", "
          )}
        />
      )}

      <Header as={"h3"}>Graphs</Header>
      {/*<CpuGraph stats={stats.stats}/>*/}
      {/*<MemoryGraph stats={stats.stats}/>*/}
    </React.Fragment>
  );
}

export default NodeStats;
