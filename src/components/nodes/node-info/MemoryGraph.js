import React, { Component } from 'react';
import {
  Crosshair,
  Highlight,
  HorizontalGridLines,
  LineSeries,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis
} from "react-vis";
import {Button, Header} from "semantic-ui-react";


class MemoryGraph extends Component {
  memData = this.props.stats.map(entry => {
    return {
      x: new Date(entry.timestamp * 1000),
      y: entry.used_mem_percent,
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      crosshairValues: []
    }
  }

  /**
   * Event handler for onMouseLeave.
   * @private
   */
  _onMouseLeave = () => {
    this.setState({crosshairValues: []});
  };

  /**
   * Event handler for onNearestX.
   * @param {Object} value Selected value.
   * @param {index} index Index of the value in the data array.
   * @private
   */
  _onNearestX = (value, {index}) => {
    this.setState({crosshairValues: [this.memData[index]]});
  };

  formatTime(time) {
    let D = time.getDate().toString().padStart(2, '0');
    let M = (time.getMonth()+1).toString().padStart(2, '0');
    let Y = time.getFullYear();
    let h = time.getHours().toString().padStart(2, '0');
    let m = time.getMinutes().toString().padStart(2, '0');
    let s = time.getSeconds().toString().padStart(2, '0');
    return `${D}/${M}/${Y} ${h}:${m}:${s}`
  }


  render() {
    const {filter} = this.state;
    return (
      <React.Fragment>
        <Header as={'h3'}>Memory Usage</Header>
        <XYPlot
          animation
          xType="time"
          height={300}
          width={1000}
          onMouseLeave={this._onMouseLeave}
          xDomain={
            filter && [
              filter.left,
              filter.right
            ]
          }>
          <HorizontalGridLines />
          <VerticalGridLines />
          <XAxis title="Time" />
          <YAxis title="Memory Usage (Percentage of total virtual memory)" />
          <LineSeries
            color={'coral'}
            data={this.memData}
            onNearestX={this._onNearestX}
          />
          <Crosshair
            values={this.state.crosshairValues}
            className={'test-class-name'}
            titleFormat={(e) => {
              let time = e[0].x;
              return {
                title: "Usage at",
                value: this.formatTime(time),
              }
            }}
            itemsFormat={(e) => {
              return [
                {
                  title: "Usage",
                  value: `${e[0].y.toFixed(3)}%`,
                },
              ]
            }}
            style={{line: {background: 'lightcoral'}}}
          />

          <Highlight
            color={'orange'}
            enableY={false}
            onBrushEnd={area => this.setState({filter: area})}/>
        </XYPlot>
        <Button onClick={() => this.setState({filter: null})}>Reset Zoom</Button>
      </React.Fragment>
    );
  }
}

export default MemoryGraph;
