import { useApplication } from "../../api/hooks";
import { Spinner } from "flowbite-react";
import React from "react";
import { useParams } from "react-router-dom";
import { DetailedApplication } from "../../components/applications/DetailedApplication";

export function ApplicationWithName() {
  const { name } = useParams();
  const { application, isLoading, isError } = useApplication(name!);
  return (
    <div>
      <div>
        {isLoading ? (
          <Spinner size={"xl"} />
        ) : (
          <DetailedApplication application={application} />
        )}
      </div>
    </div>
  );
}
