const API = {
  async getApps() {
    const response = await fetch("http://localhost:14440/applications");
    return await response.json();
  },

  async getApp(name) {
    const response = await fetch(`http://localhost:14440/application/${name}`);
    return await response.json();
  },

  async deleteApp(name) {
    const response = await fetch(`http://localhost:14440/applications/${name}`, {method: 'delete'});
    let ok = response.ok;
    let respBody = await response.text();
    return {ok: ok, msg: respBody};
  },

  async deleteAllApps() {
    const response = await fetch(`http://localhost:14440/all/applications`, {method: 'delete'});
    let ok = response.ok;
    let respBody = await response.text();
    return {ok: ok, msg: respBody};
  },

  async updateApp(body) {
    const response = await fetch(`http://localhost:14440/applications`, {method: 'put', body: body});
    let ok = response.ok;
    let respBody = await response.text();
    return {ok: ok, msg: respBody};
  },

  async createApp(app) {
    const response = await fetch(`http://localhost:14440/applications`, {method: 'post', body: JSON.stringify(app)});
    let ok = response.ok;
    let body = await response.text();
    return {ok: ok, msg: body};
  },

  async getNetworks() {
    const response = await fetch(`http://localhost:14440/networks`);
    return await response.json();
  },

  async createNetwork(name) {
    const response = await fetch(`http://localhost:14440/networks/${name}`, {method: 'post'});
    let ok = response.ok;
    let body = await response.text();
    return {ok: ok, msg: body};
  },

  async deleteNetwork(name) {
    //Remove 'agogos-' from the name
    const response = await fetch(`http://localhost:14440/networks/${name.substr(7)}`, {method: 'delete'});
    let ok = response.ok;
    let body = await response.text();
    return {ok: ok, msg: body};
  },

  async deleteAllNetworks() {
    const response = await fetch(`http://localhost:14440/all/networks`, {method: 'delete'});
    let ok = response.ok;
    let body = await response.text();
    return {ok: ok, msg: body};
  },

  async getCompInfo(appName, compName) {
    const response = await fetch(`http://localhost:14440/application/${appName}/${compName}`);
    return await response.json();
  },

  async getStorage() {
    const response = await fetch('http://localhost:14440/storage');
    return await response.json();
  },

  async createStorage(name) {
    const response = await fetch(`http://localhost:14440/storage/${name}`, {method: 'post'});
    let ok = response.ok;
    let body = await response.text();
    return {ok: ok, msg: body};
  },

  async deleteStorage(name) {
    //Remove 'agogos-' from the name
    const response = await fetch(`http://localhost:14440/storage/${name.substr(7)}`, {method: 'delete'});
    let ok = response.ok;
    let body = await response.text();
    return {ok: ok, msg: body};
  },

  async deleteAllStorage() {
    const response = await fetch(`http://localhost:14440/all/storage`, {method: 'delete'});
    let ok = response.ok;
    let body = await response.text();
    return {ok: ok, msg: body};
  },

  async getNodes() {
    const response = await fetch('http://localhost:14440/nodes');
    return await response.json();
  },

  async deleteNode(name) {
    const response = await fetch(`http://localhost:14440/node/${name}`, {method: 'delete'});
    let ok = response.ok;
    let body = await response.text();
    return {ok: ok, msg: body};
  },

  async getOverview() {
    const response = await fetch('http://localhost:14440/overview');
    return await response.json();
  },

  async getNodeStats(name) {
    const response = await fetch(`http://localhost:14440/node/${name}/stats`);
    return await response.json();
  },

  async purge() {
    const response = await fetch(`http://localhost:14440/everything`, {method: 'delete'});
    let ok = response.ok;
    let body = await response.text();
    return {ok: ok, msg: body};
  }
};

export default API;
