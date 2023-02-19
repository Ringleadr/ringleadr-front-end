import React from "react";
import { getOverview, purge } from "../api/api";
import {
  Container,
  Header,
  Icon,
  Loader,
  Message,
  Modal,
} from "semantic-ui-react";
import OverviewCard from "../components/overview/OverviewCard";
import { ReactNode } from "react";
import { Typography, Grid, Button } from "@mui/joy";
import { faMicrochip } from "@fortawesome/free-solid-svg-icons/faMicrochip";
import { faCircleNodes } from "@fortawesome/free-solid-svg-icons/faCircleNodes";
import { faNetworkWired } from "@fortawesome/free-solid-svg-icons/faNetworkWired";
import { faDatabase } from "@fortawesome/free-solid-svg-icons/faDatabase";

class OverviewPage extends React.Component {
  state = {
    overview: {},
    loaded: false,
    showModal: false,
    showFailure: false,
    failureMessage: "",
  };

  constructor(props) {
    super(props);
    this.purge = this.purge.bind(this);
  }

  componentDidMount() {
    document.title = "Ringleadr";
    getOverview().then((overview) => {
      if (overview) {
        this.setState({ overview: overview, loaded: true });
      } else {
        this.setState({ loaded: true });
      }
    });
  }

  purge() {
    purge().then((resp) => {
      if (resp.ok) {
        window.location.reload();
      } else {
        this.setState({
          showModal: false,
          showFailure: true,
          failureMessage: resp.msg,
        });
      }
    });
  }

  render(): ReactNode {
    return (
      <React.Fragment>
        <Modal
          open={this.state.showModal}
          closeOnEscape={false}
          closeOnDimmerClick={false}
          onClose={() => this.setState({ showModal: false })}
        >
          <Modal.Header>Delete all resources</Modal.Header>
          <Modal.Content>
            <p>
              This will delete all the resources in the system and is not
              reversible. Are you sure you want to continue?
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              onClick={() => this.setState({ showModal: false })}
              color={"danger"}
            >
              No
            </Button>
            <Button onClick={this.purge} color={"success"}>
              Yes
            </Button>
          </Modal.Actions>
        </Modal>

        <Container textAlign={"center"}>
          <Typography level="h1">Overview</Typography>
          {!this.state.loaded && (
            <Loader active inline size="massive">
              Loading Overview
            </Loader>
          )}
          {this.state.loaded && (
            <Grid
              container
              columns={2}
              columnSpacing={4}
              rowSpacing={4}
              justifyContent={"center"}
              alignItems={"baseline"}
            >
              <Grid>
                <OverviewCard
                  icon={faMicrochip}
                  label={"Application"}
                  value={this.state.overview.applications}
                />
                <OverviewCard
                  icon={faNetworkWired}
                  label={"Network"}
                  value={this.state.overview.networks}
                />
              </Grid>
              <Grid>
                <OverviewCard
                  icon={faCircleNodes}
                  label={"Node"}
                  value={this.state.overview.nodes}
                />
                <OverviewCard
                  icon={faDatabase}
                  link={"/storage"}
                  label={"Storage"}
                  noS
                  value={this.state.overview.storage}
                />
              </Grid>
            </Grid>
          )}
          <Message size={"huge"} error hidden={!this.state.showFailure}>
            <Message.Header>Could not purge resources</Message.Header>
            {this.state.failureMessage}
          </Message>
          {this.state.loaded && (
            <Button
              color={"danger"}
              size={"lg"}
              onClick={() => this.setState({ showModal: true })}
            >
              <Icon name={"warning sign"} />
              Purge all resources
            </Button>
          )}
        </Container>
      </React.Fragment>
    );
  }
}

export default OverviewPage;
