import useSWR from "swr";
import { Overview, Node, Application } from "./types";

export function useOverview(): {
  overview: Overview;
  isLoading: boolean;
  isError: boolean;
} {
  const { data, error, isLoading } = useSWR(
    "http://localhost:14440/overview",
    fetcher
  );

  return {
    overview: data,
    isLoading,
    isError: error,
  };
}

export function useNodes(): {
  nodes: Node[];
  isLoading: boolean;
  isError: boolean;
} {
  const { data, error, isLoading } = useSWR(
    "http://localhost:14440/nodes",
    fetcher
  );

  return {
    nodes: data,
    isLoading,
    isError: error,
  };
}

export function useApplications(): {
  applications: Application[];
  isLoading: boolean;
  isError: boolean;
} {
  const { data, error, isLoading } = useSWR(
    "http://localhost:14440/applications",
    fetcher
  );

  return {
    applications: data,
    isLoading,
    isError: error,
  };
}

export function useApplication(name: string): {
  application: Application;
  isLoading: boolean;
  isError: boolean;
} {
  const { data, error, isLoading } = useSWR(
    `http://localhost:14440/application/${name}`,
    fetcher
  );

  return {
    application: data,
    isLoading,
    isError: error,
  };
}

// @ts-ignore
export const fetcher = (...args) => fetch(...args).then((res) => res.json());
