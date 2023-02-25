import { Overview } from "../../api/types";
import { Card } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faMicrochip } from "@fortawesome/free-solid-svg-icons/faMicrochip";
import { faCircleNodes } from "@fortawesome/free-solid-svg-icons/faCircleNodes";
import { faNetworkWired } from "@fortawesome/free-solid-svg-icons/faNetworkWired";
import { faDatabase } from "@fortawesome/free-solid-svg-icons/faDatabase";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../../api/utils";

export interface OverviewCardsProps {
  overview: Overview;
}

export function OverviewCards(props: OverviewCardsProps) {
  return (
    <div className={"grid grid-cols-2 gap-5"}>
      <OverviewCard
        statistic={props.overview.applications}
        label={"applications"}
      />
      <OverviewCard statistic={props.overview.networks} label={"networks"} />
      <OverviewCard statistic={props.overview.storage} label={"storage"} />
      <OverviewCard statistic={props.overview.nodes} label={"nodes"} />
    </div>
  );
}

type Label = "applications" | "networks" | "nodes" | "storage";

const LabelToIconMap: Record<Label, IconProp> = {
  applications: faMicrochip,
  networks: faNetworkWired,
  nodes: faCircleNodes,
  storage: faDatabase,
};

interface OverviewCardProps {
  statistic: number;
  label: Label;
}

function OverviewCard(props: OverviewCardProps) {
  return (
    <div className="ml-auto mr-auto w-96 text-center transition ease-in-out hover:shadow-lg">
      <Link to={`/${props.label}`}>
        <Card>
          <FontAwesomeIcon
            size={"3x"}
            icon={LabelToIconMap[props.label]}
            className={"text-gray-700"}
          />
          <h5 className="text-3xl font-bold text-gray-900 dark:text-white">
            {props.statistic}
          </h5>
          <p className="text-lg font-normal text-gray-700 dark:text-gray-400">
            {capitalizeFirstLetter(props.label)}
          </p>
        </Card>
      </Link>
    </div>
  );
}
