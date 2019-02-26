import React from "react";
import api from "../../api/api";
import {Button, Container, Grid, Header, Icon, Loader, Message, Modal} from "semantic-ui-react";
import OverviewCard from "./OverviewCard";

class OverviewPage extends React.Component {
  state = {
    overview: {},
    loaded: false,
    showModal: false,
    showFailure: false,
    failureMessage: '',
  };

  constructor(props) {
    super(props);
    this.purge = this.purge.bind(this);
  }


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

  purge() {
    api.purge().then(resp => {
      if (resp.ok) {
        window.location.reload();
      } else {
        this.setState({showModal: false, showFailure: true, failureMessage: resp.msg})
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <Modal
          open={this.state.showModal}
          closeOnEscape={false}
          closeOnDimmerClick={false}
          onClose={() => this.setState({showModal: false})}
        >
          <Modal.Header>Delete all resources</Modal.Header>
          <Modal.Content>
            <p>This will delete all the resources in the system and is not reversible. Are you sure you want to continue?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              onClick={() => this.setState({showModal: false})}
              negative
              labelPosition={'left'}
              icon={'close'}
              content={'No'}
            />
            <Button
              onClick={this.purge}
              positive
              labelPosition='left'
              icon='checkmark'
              content='Yes'
            />
          </Modal.Actions>
        </Modal>
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
          <Message size={'huge'} error hidden={!this.state.showFailure}>
            <Message.Header>
              Could not purge resources
            </Message.Header>
            {this.state.failureMessage}
          </Message>
          {this.state.loaded && <Button icon negative size={"huge"} labelPosition={"left"} onClick={() => this.setState({showModal: true})}>
            <Icon name={'warning sign'}/>
            Purge all resources
          </Button>}
        </Container>
      </React.Fragment>
    )
  }
}

export default OverviewPage
