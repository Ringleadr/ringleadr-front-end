const API = {
  async getApps() {
    const response = await fetch("http://localhost:14440/applications");
    return await response.json();
  },

  async getApp(name) {
    const response = await fetch(`http://localhost:14440/application/${name}`);
    return await response.json();
  }
};

export default API;
