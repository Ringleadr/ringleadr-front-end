import React, { Component } from 'react';
import {Button, Form, Header, Input, Search} from 'semantic-ui-react';
import "../new.css";
import api from "../../../api/api";

class NewApp extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', copies: 0, node: '', networks: [], networkResults: []};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addNetwork = this.addNetwork.bind(this);
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

  render() {
    const {name, copies, networks, node} = this.state;

    return (
      <React.Fragment>
        <Header as={'h2'}>Application</Header>
        <Form className={'new-form'} onSubmit={this.handleSubmit}>
          <Form.Field inline required>
            <label>Name</label>
            <Input placeholder='Application name' onChange={this.handleChange} name={'name'} value={name} />
          </Form.Field>

          <Form.Field inline >
            <label>Copies</label>
            <Input placeholder='Copies' onChange={this.handleChange} name={'copies'} value={copies} />
          </Form.Field>

          <Form.Field inline>
            <label>Networks</label>
            <Button onClick={this.addNetwork} size={'mini'} icon={'plus'}/>
            <div className={'network-input-group'}>
            {networks.map((net, i) => {
              return (
                <div className={'network-input-wrapper'} key={`network-wrapper-${i}`}>
                <Search fluid={false}
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

          <Form.Field inline>
            <label>Node</label>
            <Input placeholder='Node' onChange={this.handleChange} name={'node'} value={node} />
          </Form.Field>

          <Button type={'submit'}>Submit</Button>
        </Form>
        <strong>onChange:</strong>
        <pre>{JSON.stringify({ name, copies, networks, node }, null, 2)}</pre>
      </React.Fragment>
    );
  }
}

export default NewApp;
