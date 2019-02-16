import React from "react";
import {Container, Header, Statistic} from "semantic-ui-react";
import CpuGraph from "./CpuGraph";
import MemoryGraph from "./MemoryGraph";

class NodeStats extends React.Component {
  componentDidMount() {
    console.log(this.props.stats);
  }

  sizeOf = function (bytes) {
    if (bytes === 0) { return "0.00 B"; }
    var e = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes/Math.pow(1024, e)).toFixed(2)+' '+' KMGTP'.charAt(e)+'B';
  };

  render() {
    return (
      <React.Fragment>
        <Header as={'h2'}>Statistics</Header>
        <Container textAlign={'center'}>
        <div className={'main-stats'}>
          <Statistic>
            <Statistic.Value>{this.props.stats.stats[this.props.stats.stats.length - 1].cpus}</Statistic.Value>
            <Statistic.Label>CPU core{this.props.stats.stats[this.props.stats.stats.length - 1].cpus !== 1 ? 's' : ''}</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value>{this.sizeOf(this.props.stats.stats[this.props.stats.stats.length - 1].total_mem)}</Statistic.Value>
            <Statistic.Label>of Memory</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value>{this.props.stats.stats[this.props.stats.stats.length - 1].num_containers}</Statistic.Value>
            <Statistic.Label>Running Container{this.props.stats.stats[this.props.stats.stats.length - 1].num_containers !== 1 ? 's' : ''}</Statistic.Label>
          </Statistic>
        </div>
        </Container>

        <Header as={'h3'}>Graphs</Header>
        <CpuGraph stats={this.props.stats.stats} />
        <MemoryGraph stats={this.props.stats.stats} />
      </React.Fragment>
    )
  }
}

export default NodeStats
