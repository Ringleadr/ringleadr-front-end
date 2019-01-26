import React, { Component } from 'react';
import {Crosshair, HorizontalGridLines, LineSeries, VerticalGridLines, XAxis, XYPlot, YAxis} from "react-vis";


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


  render() {
    return (
      <React.Fragment>
        <XYPlot xType="time" height={300} width={1000} onMouseLeave={this._onMouseLeave}>
          <HorizontalGridLines />
          <VerticalGridLines />
          <XAxis title="Time" />
          <YAxis title="CPU Usage (Percent)" />
          <LineSeries
            data={this.averageData}
            onNearestX={this._onNearestX}
          />
          <LineSeries />
          <LineSeries
            data={this.totalData}
          />
          <Crosshair
            values={this.state.crosshairValues}
            className={'test-class-name'}
          />
        </XYPlot>
      </React.Fragment>
    );
  }
}

export default ComponentGraph;
