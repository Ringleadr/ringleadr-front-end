import React from "react";
import api from "../../api/api";
import {Container, Grid, Header, Loader} from "semantic-ui-react";
import OverviewCard from "./OverviewCard";

class OverviewPage extends React.Component {
  state = {
    overview: {},
    loaded: false,
  };

  componentDidMount() {
    document.title = "Agogos";
    api.getOverview().then(overview => {
      if (overview) {
        this.setState({overview: overview, loaded: true});
      } else {
        this.setState({loaded: true})
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <Container textAlign={'center'}>
          <Header as='h1' className='page-header'>Overview</Header>
          {!this.state.loaded && <Loader active inline size='massive'>Loading Overview</Loader>}
          {this.state.loaded && <Grid columns={2} centered>
            <Grid.Column>
              <OverviewCard icon={'app store'} label={"Application"} value={this.state.overview.applications}/>
              <OverviewCard icon={'wifi'} label={"Network"} value={this.state.overview.networks}/>
            </Grid.Column>
            <Grid.Column>
              <OverviewCard icon={'linode'} label={"Node"} value={this.state.overview.nodes}/>
              <OverviewCard icon={'database'} link={'/storage'} label={"Storage"} noS value={this.state.overview.storage}/>
            </Grid.Column>
          </Grid>}
        </Container>
      </React.Fragment>
    )
  }
}

export default OverviewPage
