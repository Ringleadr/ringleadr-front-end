const API = {
  async getApps() {
    const response = await fetch("http://localhost:14440/applications");
    return await response.json();
  },

  async getApp(name) {
    const response = await fetch(`http://localhost:14440/application/${name}`);
    return await response.json();
  },

  async getNetworks() {
    const response = await fetch(`http://localhost:14440/networks`);
    return await response.json();
  },

  async getCompInfo(appName, compName) {
    const response = await fetch(`http://localhost:14440/application/${appName}/${compName}`);
    return await response.json();
  },

  async getStorage() {
    const response = await fetch('http://localhost:14440/storage');
    return await response.json();
  },

  async getNodes() {
    const response = await fetch('http://localhost:14440/nodes');
    return await response.json();
  },

  async getOverview() {
    const response = await fetch('http://localhost:14440/overview');
    return await response.json();
  }
};

export default API;
