import { useApplications } from "../../api/hooks";
import { Spinner } from "flowbite-react";
import React from "react";
import { ApplicationTable } from "../../components/applications/ApplicationTable";

export function AllApplications() {
  const { applications, isLoading, isError } = useApplications();
  return (
    <div>
      <div>
        {isLoading ? (
          <Spinner size={"xl"} />
        ) : (
          <ApplicationTable applications={applications} />
        )}
      </div>
    </div>
  );
}
