import React, { Component } from 'react';
import {Button, Form, Header, Input, Search} from 'semantic-ui-react';
import "../new.css";
import api from "../../../api/api";
import ComponentForm from "./ComponentForm";

class NewApp extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', copies: 0, node: '', networks: [], networkResults: [], components: [{}]};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addNetwork = this.addNetwork.bind(this);
    this.deleteNetwork = this.deleteNetwork.bind(this);
    this.addComponent = this.addComponent.bind(this);
    this.onComponentChange = this.onComponentChange.bind(this);
    this.deleteComp = this.deleteComp.bind(this);
  }

  componentDidMount() {
    document.title = "Agogos - New Application";
    api.getNetworks().then(nets => {
      if (nets) {
        this.setState({fetchedNetworks: nets.map(a => {
          return {
            title: a.name.substr(7)
          }}), loaded: true});
      } else {
        this.setState({loaded: true})
      }
    })
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { name, email } = this.state;

    this.setState({ submittedName: name, submittedEmail: email })
  };

  handleNetworkSearchChange(i, e) {
    let {networks} = this.state;
    networks[i] = e.target.value;
    this.setState({networks: networks});
    let networkResults = this.state.fetchedNetworks.filter(a => a.title.indexOf(e.target.value) > -1);
    this.setState({
      networkResults: networkResults,
    })
  };

  handleResultSelect(i, e, d) {
    let {networks} = this.state;
    networks[i] = d.result.title;
    this.setState({networks: networks});
  }

  addNetwork() {
    this.setState((prevState) => ({
      networks: [...prevState.networks, ''],
    }));
  }

  deleteNetwork(i) {
    let {networks} = this.state;
    networks.splice(i, 1);
    this.setState({networks: networks})
  }

  addComponent() {
    this.setState((prevState) => ({
      components: [...prevState.components, {}],
    }));
  }

  deleteComp(i) {
    let {components} = this.state;
    components.splice(i, 1);
    this.setState({components: components})
  }

  onComponentChange(i, e, d) {
    let {components} = this.state;
    components[i][d.name] = d.value;
    this.setState({components: components})
  }

  render() {
    const {name, copies, networks, node, components} = this.state;

    return (
      <React.Fragment>
        <Header as={'h2'}>Application</Header>
        <Form className={'new-form'} onSubmit={this.handleSubmit}>
          <Form.Field width={6} required>
            <label>Name</label>
            <Input placeholder='Application name' onChange={this.handleChange} name={'name'} value={name} />
          </Form.Field>

          <Form.Field width={6} >
            <label>Copies</label>
            <Input placeholder='Copies' onChange={this.handleChange} name={'copies'} value={copies} />
          </Form.Field>

          <Form.Field width={6}>
            <label>Networks <Button className={'add-button'} onClick={this.addNetwork} size={'mini'} icon={'plus'}/></label>
            <div className={'network-input-group'}>
            {networks.map((net, i) => {
              return (
                <div className={'network-input-wrapper'} key={`network-wrapper-${i}`}>
                <Search
                        key={`network-${i}`}
                        placeholder='Network name'
                        value={net}
                        className={'network-input'}
                        onSearchChange={e => this.handleNetworkSearchChange(i, e)}
                        onResultSelect={(e, d) => this.handleResultSelect(i, e, d)}
                        results={this.state.networkResults}
                        noResultsMessage={'Enter a new network name to create a new network'}
                />
                  <Button className={'delete-network'} negative onClick={() => this.deleteNetwork(i)} key={`delete-${i}`} icon={'close'} size={"mini"}/>
                </div>
              )
            })}
            </div>
          </Form.Field>

          <Form.Field width={6}>
            <label>Node</label>
            <Input placeholder='Node (auto assigned if empty)' onChange={this.handleChange} name={'node'} value={node} />
          </Form.Field>

          <Form.Field width={12} required>
            <label>Components (At least one required) <Button className={'add-button'} onClick={this.addComponent} size={'mini'} icon={'plus'}/></label>
              {components.map((comp, i) => {
                return (
                  <ComponentForm key={`comp-${i}`}
                                 propsOnChange={(e, d) => this.onComponentChange(i, e, d)}
                                 component={comp}
                                 deletable={components.length > 1}
                                 deleteOnClick={() => this.deleteComp(i)}
                  />
                )
              })}
          </Form.Field>

          <Button type={'submit'}>Submit</Button>
        </Form>
        <strong>onChange:</strong>
        <pre>{JSON.stringify({ name, copies, networks, node, components }, null, 2)}</pre>
      </React.Fragment>
    );
  }
}

export default NewApp;
