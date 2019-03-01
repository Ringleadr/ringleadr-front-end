import React from "react";
import {Container, Header, Message, Statistic} from "semantic-ui-react";
import CpuGraph from "./CpuGraph";
import MemoryGraph from "./MemoryGraph";

class NodeStats extends React.Component {
  componentDidMount() {
    // console.log(this.props.stats);
  }

  timeSince = function(unixTime) {
    var timeStamp = new Date(unixTime * 1000);
    var now = new Date(),
      secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
    if(secondsPast < 60){
      return parseInt(secondsPast) + ' seconds ago';
    }
    if(secondsPast < 3600){
      return parseInt(secondsPast/60) + ' minutes ago';
    }
    if(secondsPast <= 86400){
      return parseInt(secondsPast/3600) + ' hours ago';
    }
    if(secondsPast > 86400){
      let day = timeStamp.getDate();
      let month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ","");
      let year = timeStamp.getFullYear() === now.getFullYear() ? "" :  " "+timeStamp.getFullYear();
      return day + " " + month + year;
    }
  };

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
            <Statistic.Label>Running Agogos Container{this.props.stats.stats[this.props.stats.stats.length - 1].num_containers !== 1 ? 's' : ''}</Statistic.Label>
          </Statistic>
        </div>
        </Container>

        <p>Last recorded: {this.timeSince(this.props.stats.stats[this.props.stats.stats.length - 1].timestamp)}</p>
        {this.props.stats.stats[this.props.stats.stats.length - 1].unavailable.length > 0 &&
        <Message
          warning
          icon={'warning circle'}
          header={'The following stats are unavailable'}
          size={'large'}
          content={this.props.stats.stats[this.props.stats.stats.length - 1].unavailable.join(", ")}
        />
        }

        <Header as={'h3'}>Graphs</Header>
        <CpuGraph stats={this.props.stats.stats} />
        <MemoryGraph stats={this.props.stats.stats} />
      </React.Fragment>
    )
  }
}

export default NodeStats
