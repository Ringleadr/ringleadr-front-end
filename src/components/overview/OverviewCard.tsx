import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Card, Link, Typography } from "@mui/joy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface OverviewCardProps {
  link: string;
  label: string;
  value: number;
  noS: boolean;
  icon: IconProp;
}

class OverviewCard extends React.Component {
  readonly link: string;
  readonly label: string;
  readonly value: number;
  readonly noS: boolean;
  readonly icon: IconProp;

  constructor(props: OverviewCardProps) {
    super(props);
    this.link = props.link;
    this.label = props.label;
    this.value = props.value;
    this.noS = props.noS;
    this.icon = props.icon;
  }

  render() {
    return (
      <Card
        variant="outlined"
        orientation="vertical"
        sx={{
          width: 320,
          gap: 2,
          "&:hover": {
            boxShadow: "md",
            borderColor: "neutral.outlinedHoverBorder",
          },
          marginBottom: 2,
        }}
      >
        <FontAwesomeIcon size={"5x"} icon={this.icon} />
        <div>
          <Typography level="h2" mb={0.5}>
            {this.value}
          </Typography>
          <Typography level={"h3"} mb={1}>
            <Link
              overlay
              underline={"none"}
              to={this.link ? this.link : "/" + this.label.toLowerCase() + "s"}
              component={RouterLink}
            >
              {this.label}
              {!this.noS && this.value !== 1 ? "s" : ""}
            </Link>
          </Typography>
        </div>
      </Card>

      // <Card variant={"outlined"} sx={{ width: 280 }} orientation={"vertical"}>
      //   <Link
      //     overlay
      //     underline={"none"}
      //     to={this.link ? this.link : "/" + this.label.toLowerCase() + "s"}
      //     component={RouterLink}
      //   >
      //     <Stack alignItems={"center"}>
      //       <FontAwesomeIcon size={"5x"} icon={faEnvelope} />
      //       <Typography level={"h2"}>
      //         {this.value} {this.label}
      //         {!this.noS && this.value !== 1 ? "s" : ""}
      //       </Typography>
      //     </Stack>
      //   </Link>
      // </Card>
    );
  }
}

export default OverviewCard;
