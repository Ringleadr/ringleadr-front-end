export interface Application {
  name: string;
  copies: number;
  components: Component[];
  networks: string[];
  messages: string[];
  node: string;
}

export interface Component {
  name: string;
  image: string;
  replicas: number;
  storage: ComponentStorage[];
  ports: Record<string, string>;
  env: string[];
  status: string;
  scale_threshold: number;
  scale_min: number;
  scale_max: number;
  network_info: Record<string, string[]>;
}

export interface ComponentInfo {
  app_name: string;
  component_name: string;
  cpu_usage: {
    total_percent: number;
    average_percent: number;
    time_stamp: number;
  }[];
}

export interface ComponentStorage {
  name: string;
  mount_path: string;
}

export interface Node {
  name: string;
  address: string;
  active: boolean;
}

export interface NodeStatsEntry {
  name: string;
  stats: Statistics[];
}

export interface Statistics {
  total_mem: number;
  used_mem: number;
  used_mem_percent: number;
  cpus: number;
  cpu_percent: number;
  num_containers: number;
  timestamp: number;
  unavailable: string[];
}

export interface Network {
  name: string;
}
