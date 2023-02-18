import {NodeStatistics} from "./types";

const API = {
  async getApps(): Promise<any> {
    const response = await fetch("http://localhost:14440/applications");
    return await response.json();
  },

  async getApp(name: string): Promise<any> {
    const response = await fetch(`http://localhost:14440/application/${name}`);
    return await response.json();
  },

  async deleteApp(name: string): Promise<any> {
    const response = await fetch(`http://localhost:14440/applications/${name}`, { method: 'delete' });
    let ok = response.ok;
    let respBody = await response.text();
    return { ok: ok, msg: respBody };
  },

  async deleteAllApps(): Promise<any> {
    const response = await fetch(`http://localhost:14440/all/applications`, { method: 'delete' });
    let ok = response.ok;
    let respBody = await response.text();
    return { ok: ok, msg: respBody };
  },

  async updateApp(body: string): Promise<any> {
    const response = await fetch(`http://localhost:14440/applications`, { method: 'put', body: body });
    let ok = response.ok;
    let respBody = await response.text();
    return { ok: ok, msg: respBody };
  },

  async createApp(app: string): Promise<any> {
    const response = await fetch(`http://localhost:14440/applications`, { method: 'post', body: JSON.stringify(app) });
    let ok = response.ok;
    let body = await response.text();
    return { ok: ok, msg: body };
  },

  async getNetworks(): Promise<any> {
    const response = await fetch(`http://localhost:14440/networks`);
    return await response.json();
  },

  async createNetwork(name: string): Promise<any> {
    const response = await fetch(`http://localhost:14440/networks/${name}`, { method: 'post' });
    let ok = response.ok;
    let body = await response.text();
    return { ok: ok, msg: body };
  },

  async deleteNetwork(name: string): Promise<any> {
    //Remove 'agogos-' from the name
    const response = await fetch(`http://localhost:14440/networks/${name.substr(7)}`, { method: 'delete' });
    let ok = response.ok;
    let body = await response.text();
    return { ok: ok, msg: body };
  },

  async deleteAllNetworks(): Promise<any> {
    const response = await fetch(`http://localhost:14440/all/networks`, { method: 'delete' });
    let ok = response.ok;
    let body = await response.text();
    return { ok: ok, msg: body };
  },

  async getCompInfo(appName: string, compName: string): Promise<any> {
    const response = await fetch(`http://localhost:14440/application/${appName}/${compName}`);
    return await response.json();
  },

  async getStorage(): Promise<any> {
    const response = await fetch('http://localhost:14440/storage');
    return await response.json();
  },

  async createStorage(name: string): Promise<any> {
    const response = await fetch(`http://localhost:14440/storage/${name}`, { method: 'post' });
    let ok = response.ok;
    let body = await response.text();
    return { ok: ok, msg: body };
  },

  async deleteStorage(name: string): Promise<any> {
    //Remove 'agogos-' from the name
    const response = await fetch(`http://localhost:14440/storage/${name.substr(7)}`, { method: 'delete' });
    let ok = response.ok;
    let body = await response.text();
    return { ok: ok, msg: body };
  },

  async deleteAllStorage(): Promise<any> {
    const response = await fetch(`http://localhost:14440/all/storage`, { method: 'delete' });
    let ok = response.ok;
    let body = await response.text();
    return { ok: ok, msg: body };
  },

  async getNodes(): Promise<any> {
    const response = await fetch('http://localhost:14440/nodes');
    return await response.json();
  },

  async deleteNode(name: string): Promise<any> {
    const response = await fetch(`http://localhost:14440/node/${name}`, { method: 'delete' });
    let ok = response.ok;
    let body = await response.text();
    return { ok: ok, msg: body };
  },

  async getOverview(): Promise<any> {
    const response = await fetch('http://localhost:14440/overview');
    return await response.json();
  },

  async getNodeStats(name: string): Promise<NodeStatistics> {
    const response = await fetch(`http://localhost:14440/node/${name}/stats`);
    return await response.json();
  },

  async purge(): Promise<any> {
    const response = await fetch(`http://localhost:14440/everything`, { method: 'delete' });
    let ok = response.ok;
    let body = await response.text();
    return { ok: ok, msg: body };
  }
};

export default API;
