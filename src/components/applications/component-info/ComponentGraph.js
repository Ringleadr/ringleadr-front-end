import React, { Component } from 'react';
import {
  Crosshair,
  DiscreteColorLegend,
  Highlight,
  HorizontalGridLines,
  LineSeries,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis
} from "react-vis";
import {Button} from "semantic-ui-react";


class ComponentGraph extends Component {
  averageData = this.props.comp.cpu_usage.map(entry => {
      return {
        x: new Date(entry.time_stamp * 1000),
        y: entry.average_percent
      }
    });

    totalData = this.props.comp.cpu_usage.map(entry => {
      return {
        x: new Date(entry.time_stamp * 1000),
        y: entry.total_percent
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
    this.setState({crosshairValues: [this.averageData[index], this.totalData[index]]});
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
          <YAxis title="CPU Usage (Percent)" />
          <LineSeries
            data={this.averageData}
            onNearestX={this._onNearestX}
          />
          <LineSeries
            data={this.totalData}
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
                  title: "Average",
                  value: `${e[0].y.toFixed(3)}%`,
                },
                {
                  title: "Total",
                  value: `${e[1].y.toFixed(3)}%`,
                }
              ]
            }}
          />

          <Highlight
            enableY={false}
            onBrushEnd={area => this.setState({filter: area})}/>
        </XYPlot>
        <DiscreteColorLegend height={100} width={300} items={["Average", "Total"]} orientation={"horizontal"}/>
        <Button onClick={() => this.setState({filter: null})}>Reset Zoom</Button>
      </React.Fragment>
    );
  }
}

export default ComponentGraph;
