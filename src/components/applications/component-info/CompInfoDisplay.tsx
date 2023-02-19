import React, { useState } from "react";
import { Button, Form, Header, TextArea } from "semantic-ui-react";
import ComponentGraph from "./ComponentGraph";
import { ComponentInfo } from "../../../api/types";

function CompInfoDisplay({ comp }: { comp: ComponentInfo }) {
  let [show, setShow] = useState(false);
  console.log(comp);
  return (
    <React.Fragment>
      <Header as="h2">{comp.component_name}</Header>
      {comp.cpu_usage ? (
        <React.Fragment>
          <ComponentGraph comp={comp} />
          <Button onClick={() => setShow(!show)}>Toggle Raw View</Button>
          {show && (
            <Form>
              <TextArea
                className="code-area"
                autoHeight
                value={JSON.stringify(
                  comp.cpu_usage.map((entry) => {
                    entry.date = new Date(entry.time_stamp * 1000);
                    return entry;
                  }),
                  null,
                  4
                )}
              />
            </Form>
          )}
        </React.Fragment>
      ) : (
        <strong>Nothing to display</strong>
      )}
    </React.Fragment>
  );
}

export default CompInfoDisplay;
