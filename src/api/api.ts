import { Application, ComponentInfo, Network, NodeStatsEntry } from "./types";

export async function getApps(): Promise<Application[]> {
  const response = await fetch("http://localhost:14440/applications");
  return await response.json();
}

export async function getApp(name: string): Promise<Application> {
  const response = await fetch(`http://localhost:14440/application/${name}`);
  return await response.json();
}

export async function deleteApp(name: string): Promise<any> {
  const response = await fetch(`http://localhost:14440/applications/${name}`, {
    method: "delete",
  });
  let ok = response.ok;
  let respBody = await response.text();
  return { ok: ok, msg: respBody };
}

export async function deleteAllApps(): Promise<any> {
  const response = await fetch(`http://localhost:14440/all/applications`, {
    method: "delete",
  });
  let ok = response.ok;
  let respBody = await response.text();
  return { ok: ok, msg: respBody };
}

export async function updateApp(body: string): Promise<any> {
  const response = await fetch(`http://localhost:14440/applications`, {
    method: "put",
    body: body,
  });
  let ok = response.ok;
  let respBody = await response.text();
  return { ok: ok, msg: respBody };
}

export async function createApp(app: string): Promise<any> {
  const response = await fetch(`http://localhost:14440/applications`, {
    method: "post",
    body: JSON.stringify(app),
  });
  let ok = response.ok;
  let body = await response.text();
  return { ok: ok, msg: body };
}

export async function getNetworks(): Promise<Network[]> {
  const response = await fetch(`http://localhost:14440/networks`);
  return await response.json();
}

export async function createNetwork(name: string): Promise<any> {
  const response = await fetch(`http://localhost:14440/networks/${name}`, {
    method: "post",
  });
  let ok = response.ok;
  let body = await response.text();
  return { ok: ok, msg: body };
}

export async function deleteNetwork(name: string): Promise<any> {
  //Remove 'agogos-' from the name
  const response = await fetch(
    `http://localhost:14440/networks/${name.substr(7)}`,
    { method: "delete" }
  );
  let ok = response.ok;
  let body = await response.text();
  return { ok: ok, msg: body };
}

export async function deleteAllNetworks(): Promise<any> {
  const response = await fetch(`http://localhost:14440/all/networks`, {
    method: "delete",
  });
  let ok = response.ok;
  let body = await response.text();
  return { ok: ok, msg: body };
}

export async function getCompInfo(
  appName: string,
  compName: string
): Promise<ComponentInfo> {
  const response = await fetch(
    `http://localhost:14440/application/${appName}/${compName}`
  );
  return await response.json();
}

export async function getStorage(): Promise<any> {
  const response = await fetch("http://localhost:14440/storage");
  return await response.json();
}

export async function createStorage(name: string): Promise<any> {
  const response = await fetch(`http://localhost:14440/storage/${name}`, {
    method: "post",
  });
  let ok = response.ok;
  let body = await response.text();
  return { ok: ok, msg: body };
}

export async function deleteStorage(name: string): Promise<any> {
  //Remove 'agogos-' from the name
  const response = await fetch(
    `http://localhost:14440/storage/${name.substr(7)}`,
    { method: "delete" }
  );
  let ok = response.ok;
  let body = await response.text();
  return { ok: ok, msg: body };
}

export async function deleteAllStorage(): Promise<any> {
  const response = await fetch(`http://localhost:14440/all/storage`, {
    method: "delete",
  });
  let ok = response.ok;
  let body = await response.text();
  return { ok: ok, msg: body };
}

export async function getNodes(): Promise<Node[]> {
  const response = await fetch("http://localhost:14440/nodes");
  return await response.json();
}

export async function deleteNode(name: string): Promise<any> {
  const response = await fetch(`http://localhost:14440/node/${name}`, {
    method: "delete",
  });
  let ok = response.ok;
  let body = await response.text();
  return { ok: ok, msg: body };
}

export async function getOverview(): Promise<any> {
  const response = await fetch("http://localhost:14440/overview");
  return await response.json();
}

export async function getNodeStats(name: string): Promise<NodeStatsEntry> {
  const response = await fetch(`http://localhost:14440/node/${name}/stats`);
  return await response.json();
}

export async function purge(): Promise<any> {
  const response = await fetch(`http://localhost:14440/everything`, {
    method: "delete",
  });
  let ok = response.ok;
  let body = await response.text();
  return { ok: ok, msg: body };
}
