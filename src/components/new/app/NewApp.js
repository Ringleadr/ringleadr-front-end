import React, { Component } from 'react';
import {Button, Form, Header, Input, Search} from 'semantic-ui-react';
import "../new.css";
import api from "../../../api/api";
import ComponentForm from "./ComponentForm";

class NewApp extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', copies: '', node: '', networks: [], networkResults: [], components: [{
      name: '', image: '', replicas: '', scale_threshold: '', scale_min: '', scale_max: '', env: [], ports: []
      }]};
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
    let {name, copies, networks, node, components} = this.state;
    if (name === '') {
      console.log('name must not be empty')
    }

    networks = networks.filter(name => name !== '');


    //Underlying ports variable is not immutable. This is changing state.
    //Only run this calculation when we are certain we can submit
    components.forEach(comp => {
      if (comp.image === ''){
        console.log(`${comp.name}'s image is empty`)
      }
      // comp.ports = comp.ports.reduce((p, c) => {
      //   p[c.key] = c.value;
      //   return p;
      // }, {});
    });

    let application = {
      name: name,
      copies: copies,
      networks: networks,
      node: node,
      components: components
    };
    console.log(application);
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
      components: [...prevState.components,
        {name: '', image: '', replicas: '', scale_threshold: '', scale_min: '', scale_max: '', env: [], ports: []}],
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

  addEnvToComp(i) {
    let {components} = this.state;
    components[i].env = [...components[i].env || [], ''];
    this.setState({components: components})
  }

  updateEnvForComp(i, j, e) {
    let {components} = this.state;
    components[i]["env"][j] = e.target.value;
    this.setState({components: components})
  }

  deleteEnvForComp(i,j) {
    let {components} = this.state;
    components[i].env.splice(j, 1);
    this.setState({components: components})
  }

  addPortForComp(i) {
    let {components} = this.state;
    components[i].ports = [...components[i].ports || [], {key: '', value:''}];
    this.setState({components: components})
  }

  portOnChangeKey(i, j, e) {
    let {components} = this.state;
    components[i].ports[j].key = e.target.value;
    this.setState({components: components})
  }

  portOnChangeVal(i, j, e) {
    let {components} = this.state;
    components[i].ports[j].value = e.target.value;
    this.setState({components: components})
  }

  deletePort(i, j) {
    let {components} = this.state;
    components[i].ports.splice(j,1);
    this.setState({components: components})
  }

  void() {
    //no-op
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
            <label>Networks <Button type={'button'} className={'add-button'} onClick={(e) => {
              //Only call the function if clientX is greater than 0. This occurs when the button has been clicked rather than activated by pressing enter on another field
              if (e.clientX > 0) {
                this.addNetwork()
              }
            }} size={'mini'} icon={'plus'} onKeyPress={this.void}/></label>
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
                  <Button type={'button'} className={'delete-network'} negative onClick={() => this.deleteNetwork(i)} key={`delete-${i}`} icon={'close'} size={"mini"}/>
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
            <label>Components (At least one required) <Button type={'button'} className={'add-button'} onClick={this.addComponent} size={'mini'} icon={'plus'}/></label>
              {components.map((comp, i) => {
                return (
                  <ComponentForm key={`comp-${i}`}
                                 propsOnChange={(e, d) => this.onComponentChange(i, e, d)}
                                 component={comp}
                                 deletable={components.length > 1}
                                 deleteOnClick={() => this.deleteComp(i)}
                                 addEnv={() => this.addEnvToComp(i)}
                                 envOnChange={(e, j) =>  this.updateEnvForComp(i, j, e)}
                                 envOnDelete={(j) => this.deleteEnvForComp(i, j)}
                                 addPort={() => this.addPortForComp(i)}
                                 portOnChangeKey={(oldkey, e) => this.portOnChangeKey(i, oldkey, e)}
                                 portOnChangeVal={(key, val) => this.portOnChangeVal(i, key, val)}
                                 deletePort={(key) => this.deletePort(i, key)}
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
