export interface NodeStatistics {
  name: string,
  stats: Stats[]
}

export interface Stats {
  "total_mem": number,
  "used_mem": number,
  "used_mem_percent": number,
  "cpus": number,
  "cpu_percent": number,
  "num_containers": number,
  "timestamp": number,
  "unavailable": string[]
}