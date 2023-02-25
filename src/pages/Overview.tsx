import { useOverview } from "../api/hooks";
import { Spinner } from "flowbite-react";
import { OverviewCards } from "../components/overview/OverviewCards";

export function Overview() {
  const { overview, isLoading, isError } = useOverview();
  return (
    <div>
      {isLoading ? (
        <Spinner size={"xl"} />
      ) : (
        <OverviewCards overview={overview} />
      )}
    </div>
  );
}
