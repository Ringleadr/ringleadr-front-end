import { Application } from "../../api/types";

export interface DetailedApplicationProps {
  application: Application;
}

export function DetailedApplication(props: DetailedApplicationProps) {
  return <pre>{JSON.stringify(props.application, null, 2)}</pre>;
}
