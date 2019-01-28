import React from "react";
import {Card, Grid, Icon, Statistic} from "semantic-ui-react";
import {Link} from "react-router-dom";

class OverviewCard extends React.Component {
  render() {
    return (
      <Card centered className={'overview-card'}>
        <Link to={this.props.link ? this.props.link : '/' + this.props.label.toLowerCase() + 's'}>
        <Card.Content textAlign='center'>
          <Grid centered columns={1}>
            <Grid.Row>
              <Icon fitted name={this.props.icon} size='massive'/>
            </Grid.Row>
            <Grid.Row>
              <Statistic>
                <Statistic.Value>{this.props.value}</Statistic.Value>
                <Statistic.Label>{this.props.label}{this.props.value > 1 ? 's' : ''}</Statistic.Label>
              </Statistic>
            </Grid.Row>
          </Grid>
        </Card.Content>
        </Link>
      </Card>
    )
  }
}

export default OverviewCard
