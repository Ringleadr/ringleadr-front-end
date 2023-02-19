import React, { Component } from "react";
import { Button, Dropdown, Label, Message, Search } from "semantic-ui-react";
import { Form, Input } from "formsy-semantic-ui-react";
import "../new.css";
import ComponentForm from "./ComponentForm";
import { addValidationRule } from "formsy-react";
import { redirect } from "react-router-dom";
import { createApp, getNetworks, getNodes, getStorage } from "../../../api/api";

const errorLabel = <Label color="red" pointing />;

addValidationRule("isValidInt", function (values, value) {
  let n = Number(value);
  return Number.isFinite(n) && Number.isInteger(n) && n >= 0;
});

addValidationRule("isValidFloat", function (values, value) {
  let n = Number(value);
  return Number.isFinite(n) && n >= 0;
});

class NewApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      copies: "",
      node: "",
      networks: [],
      networkResults: [],
      components: [
        {
          name: "",
          image: "",
          replicas: "",
          scale_threshold: "",
          scale_min: "",
          scale_max: "",
          env: [],
          ports: [],
          storage: [],
        },
      ],
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addNetwork = this.addNetwork.bind(this);
    this.deleteNetwork = this.deleteNetwork.bind(this);
    this.addComponent = this.addComponent.bind(this);
    this.onComponentChange = this.onComponentChange.bind(this);
    this.deleteComp = this.deleteComp.bind(this);
  }

  componentDidMount() {
    document.title = "Agogos - New Application - From Form";
    getNetworks().then((nets) => {
      if (nets) {
        this.setState({
          fetchedNetworks: nets.map((a) => {
            return {
              title: a.name.substr(7),
            };
          }),
          loaded: true,
        });
      } else {
        this.setState({ loaded: true });
      }
    });
    getNodes().then((nodes) => {
      if (nodes) {
        let formatNodes = nodes.map((node) => {
          return {
            text: node.name,
            value: node.name,
          };
        });
        formatNodes.push({ text: "* (All nodes)", value: "*" });
        formatNodes.push({ text: "Auto Assign", value: "" });
        this.setState({ fetchedNodes: formatNodes });
      }
    });
    getStorage().then((storage) => {
      if (storage) {
        this.setState({
          fetchedStorage: storage.map((a) => {
            return { title: a.name.substr(7) };
          }),
        });
      }
    });
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    let { name, copies, networks, node, components } = this.state;

    networks = networks.filter((name) => name !== "");

    let application = {
      name: name,
      copies: parseInt(copies, 10),
      networks: networks,
      node: node,
      components: components.map((comp) => {
        return {
          name: comp.name,
          image: comp.image,
          replicas: parseInt(comp.replicas, 10),
          scale_threshold: parseFloat(comp.scale_threshold),
          scale_min: parseInt(comp.scale_min, 10),
          scale_max: parseInt(comp.scale_max, 10),
          env: comp.env,
          ports: comp.ports.reduce((p, c) => {
            p[c.key] = c.value;
            return p;
          }, {}),
          storage: comp.storage.filter((c) => c.name !== ""),
        };
      }),
    };
    console.log(application);
    createApp(application).then((resp) => {
      if (resp.ok) {
        this.setState({ redirect: true });
      } else {
        this.setState({ createError: true, errorMsg: resp.msg });
      }
    });
  };

  handleNetworkSearchChange(i, e) {
    let { networks } = this.state;
    networks[i] = e.target.value;
    this.setState({ networks: networks });
    let networkResults;
    if (this.state.fetchedNetworks) {
      networkResults = this.state.fetchedNetworks.filter(
        (a) => a.title.indexOf(e.target.value) > -1
      );
    } else {
      networkResults = [];
    }
    this.setState({
      networkResults: networkResults,
    });
  }

  handleResultSelect(i, e, d) {
    let { networks } = this.state;
    networks[i] = d.result.title;
    this.setState({ networks: networks });
  }

  handleStorageSearchChange(i, j, e) {
    let { components } = this.state;
    components[i].storage[j].name = e.target.value;
    this.setState({ components: components });
    let storageResults;
    if (this.state.fetchedStorage) {
      storageResults = this.state.fetchedStorage.filter(
        (a) => a.title.indexOf(e.target.value) > -1
      );
    } else {
      storageResults = [];
    }
    this.setState({
      storageResults: storageResults,
    });
  }

  handleStorageResultSelect(i, j, e, d) {
    let { components } = this.state;
    components[i].storage[j].name = d.result.title;
    this.setState({ components: components });
  }

  handleStoragePathChange(i, j, e) {
    let { components } = this.state;
    components[i].storage[j].mount_path = e.target.value;
    this.setState({ components: components });
  }

  addNetwork() {
    this.setState((prevState) => ({
      networks: [...prevState.networks, ""],
    }));
  }

  deleteNetwork(i) {
    let { networks } = this.state;
    networks.splice(i, 1);
    this.setState({ networks: networks });
  }

  addComponent() {
    this.setState((prevState) => ({
      components: [
        ...prevState.components,
        {
          name: "",
          image: "",
          replicas: "",
          scale_threshold: "",
          scale_min: "",
          scale_max: "",
          env: [],
          ports: [],
        },
      ],
    }));
  }

  deleteComp(i) {
    let { components } = this.state;
    components.splice(i, 1);
    this.setState({ components: components });
  }

  onComponentChange(i, e, d) {
    let { components } = this.state;
    components[i][d.name] = d.value;
    this.setState({ components: components });
  }

  addEnvToComp(i) {
    let { components } = this.state;
    components[i].env = [...(components[i].env || []), ""];
    this.setState({ components: components });
  }

  updateEnvForComp(i, j, e) {
    let { components } = this.state;
    components[i]["env"][j] = e.target.value;
    this.setState({ components: components });
  }

  deleteEnvForComp(i, j) {
    let { components } = this.state;
    components[i].env.splice(j, 1);
    this.setState({ components: components });
  }

  addPortForComp(i) {
    let { components } = this.state;
    components[i].ports = [
      ...(components[i].ports || []),
      { key: "", value: "" },
    ];
    this.setState({ components: components });
  }

  portOnChangeKey(i, j, e) {
    let { components } = this.state;
    components[i].ports[j].key = e.target.value;
    this.setState({ components: components });
  }

  portOnChangeVal(i, j, e) {
    let { components } = this.state;
    components[i].ports[j].value = e.target.value;
    this.setState({ components: components });
  }

  deletePort(i, j) {
    let { components } = this.state;
    components[i].ports.splice(j, 1);
    this.setState({ components: components });
  }

  deleteStore(i, j) {
    let { components } = this.state;
    components[i].storage.splice(j, 1);
    this.setState({ components: components });
  }

  addStoreForComp(i) {
    let { components } = this.state;
    components[i].storage = [
      ...(components[i].storage || []),
      { name: "", mount_path: "" },
    ];
    this.setState({ components: components });
  }

  void() {
    //no-op
  }

  render() {
    const { name, copies, networks, node, components } = this.state;

    return (
      <React.Fragment>
        {this.state.redirect && <Redirect to={"/applications"} />}
        <Message error hidden={!this.state.createError}>
          <strong>Error response from server: </strong>
          {this.state.errorMsg}
        </Message>
        <Form className={"new-form"} onValidSubmit={this.handleSubmit}>
          <Form.Field width={6} required>
            <label>Name</label>
            <Input
              placeholder="Application name"
              onChange={this.handleChange}
              name={"name"}
              value={name}
              required
              validationErrors={{
                isDefaultRequiredValue: "Application name cannot be blank",
              }}
              errorLabel={errorLabel}
            />
          </Form.Field>

          <Form.Field width={6}>
            <label>Copies</label>
            <Input
              placeholder="#Copies"
              onChange={this.handleChange}
              name={"copies"}
              value={copies}
              instantValidation
              validations={"isValidInt"}
              validationError={"Copies must be a positive Integer"}
              errorLabel={errorLabel}
            />
          </Form.Field>

          <Form.Field width={6}>
            <label>
              Networks{" "}
              <Button
                type={"button"}
                className={"add-button"}
                onClick={(e) => {
                  //Only call the function if clientX is greater than 0. This occurs when the button has been clicked rather than activated by pressing enter on another field
                  if (e.clientX > 0) {
                    this.addNetwork();
                  }
                }}
                size={"mini"}
                icon={"plus"}
                onKeyPress={this.void}
              />
            </label>
            <div className={"network-input-group"}>
              {networks.map((net, i) => {
                return (
                  <div
                    className={"network-input-wrapper"}
                    key={`network-wrapper-${i}`}
                  >
                    <Search
                      key={`network-${i}`}
                      placeholder="Network name"
                      value={net}
                      className={"network-input"}
                      onSearchChange={(e) =>
                        this.handleNetworkSearchChange(i, e)
                      }
                      onResultSelect={(e, d) =>
                        this.handleResultSelect(i, e, d)
                      }
                      results={this.state.networkResults}
                      noResultsMessage={
                        "Enter a new network name to create a new network"
                      }
                    />
                    <Button
                      type={"button"}
                      className={"delete-network"}
                      negative
                      onClick={() => this.deleteNetwork(i)}
                      key={`delete-${i}`}
                      icon={"close"}
                      size={"mini"}
                    />
                  </div>
                );
              })}
            </div>
          </Form.Field>

          <Form.Field width={6}>
            <label>Node</label>
            <Dropdown
              placeholder="Auto assigned if empty"
              onChange={this.handleChange}
              name={"node"}
              value={node}
              selection
              options={this.state.fetchedNodes || []}
            />
          </Form.Field>

          <Form.Field width={12} required>
            <label>
              Components (At least one required)
              <Button
                type={"button"}
                className={"add-button"}
                onClick={this.addComponent}
                size={"mini"}
                icon={"plus"}
              />
            </label>
            {components.map((comp, i) => {
              return (
                <ComponentForm
                  key={`comp-${i}`}
                  propsOnChange={(e, d) => this.onComponentChange(i, e, d)}
                  component={comp}
                  deletable={components.length > 1}
                  deleteOnClick={() => this.deleteComp(i)}
                  addEnv={() => this.addEnvToComp(i)}
                  envOnChange={(e, j) => this.updateEnvForComp(i, j, e)}
                  envOnDelete={(j) => this.deleteEnvForComp(i, j)}
                  addPort={() => this.addPortForComp(i)}
                  portOnChangeKey={(oldkey, e) =>
                    this.portOnChangeKey(i, oldkey, e)
                  }
                  portOnChangeVal={(key, val) =>
                    this.portOnChangeVal(i, key, val)
                  }
                  deletePort={(key) => this.deletePort(i, key)}
                  addStore={() => this.addStoreForComp(i)}
                  handleStorageSearchChange={(j, e) =>
                    this.handleStorageSearchChange(i, j, e)
                  }
                  handleStorageResultSelect={(j, e, d) =>
                    this.handleStorageResultSelect(i, j, e, d)
                  }
                  deleteStorage={(j) => this.deleteStore(i, j)}
                  handleStoragePathChange={(j, e) =>
                    this.handleStoragePathChange(i, j, e)
                  }
                  storageResults={this.state.storageResults}
                />
              );
            })}
          </Form.Field>

          <Button type={"submit"}>Submit</Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default NewApp;
