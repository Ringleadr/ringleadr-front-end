import React from "react";
import { Card, Grid, Icon, SemanticICONS, Statistic } from "semantic-ui-react";
import { Link } from "react-router-dom";

interface OverviewCardProps {
  link: string,
  label: string,
  icon: SemanticICONS,
  value: number,
  noS: boolean,
}

class OverviewCard extends React.Component {
  readonly link: string;
  readonly label: string;
  readonly icon: SemanticICONS;
  readonly value: number;
  readonly noS: boolean;

  constructor(props: OverviewCardProps) {
    super(props);
    this.link = props.link;
    this.label = props.label;
    this.icon = props.icon;
    this.value = props.value;
    this.noS = props.noS;
  }

  render() {
    return (
      <Card centered className={'overview-card'}>
        <Link to={this.link ? this.link : '/' + this.label.toLowerCase() + 's'}>
          <Card.Content textAlign='center'>
            <Grid centered columns={1}>
              <Grid.Row>
                <Icon fitted name={this.icon} size='massive' />
              </Grid.Row>
              <Grid.Row>
                <Statistic>
                  <Statistic.Value>{this.value}</Statistic.Value>
                  <Statistic.Label>{this.label}{!this.noS && this.value !== 1 ? 's' : ''}</Statistic.Label>
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
