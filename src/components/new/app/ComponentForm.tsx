import React from "react";
import { Button, Icon, Label, Search } from "semantic-ui-react";
import { Form, Input } from "formsy-semantic-ui-react";
import { addValidationRule } from "formsy-react";

const errorLabel = <Label color="red" pointing />;
const errorLabelNoPoint = (
  <Label className={"custom-label"} color="red" horizontal />
);
const IPPortRegex =
  "^((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]):)?[0-9]+$";

addValidationRule("isIPPort", function (values, value) {
  return value.match(IPPortRegex);
});

class ComponentForm extends React.Component {
  render() {
    return (
      <div className={"comp-wrapper"}>
        <div className={"comp-form"}>
          <Form.Field>
            <label>Name</label>
            <Input
              name={"name"}
              value={this.props.component.name || ""}
              placeholder={"Name"}
              onChange={this.props.propsOnChange}
            />
          </Form.Field>

          <Form.Field required>
            <label>Image</label>
            <Input
              name={"image"}
              value={this.props.component.image || ""}
              placeholder={"Image"}
              onChange={this.props.propsOnChange}
              required
              validationErrors={{
                isDefaultRequiredValue: "Component name cannot be blank",
              }}
              errorLabel={errorLabel}
            />
          </Form.Field>

          <Form.Field>
            <label>Replicas</label>
            <Input
              name={"replicas"}
              value={this.props.component.replicas || ""}
              placeholder={"#Replicas"}
              onChange={this.props.propsOnChange}
              instantValidation
              validations={"isValidInt"}
              validationError={"Replicas must be a positive Integer"}
              errorLabel={errorLabel}
            />
          </Form.Field>

          <Form.Field>
            <label>Scale Threshold</label>
            <Input
              name={"scale_threshold"}
              value={this.props.component.scale_threshold || ""}
              placeholder={"Scale Threshold (100 equals 1CPU)"}
              onChange={this.props.propsOnChange}
              instantValidation
              validations={"isValidFloat"}
              validationError={"Scale Threshold must be a float"}
              errorLabel={errorLabel}
            />
          </Form.Field>

          <Form.Field>
            <label>Scale Min</label>
            <Input
              name={"scale_min"}
              value={this.props.component.scale_min || ""}
              placeholder={"Minimum number of replicas when scaling"}
              onChange={this.props.propsOnChange}
              instantValidation
              validations={"isValidInt"}
              validationError={"Scale Min must be a positive Integer"}
              errorLabel={errorLabel}
            />
          </Form.Field>

          <Form.Field>
            <label>Scale Max</label>
            <Input
              name={"scale_max"}
              value={this.props.component.scale_max || ""}
              placeholder={"Maximum number of replicas when scaling"}
              onChange={this.props.propsOnChange}
              instantValidation
              validations={"isValidInt"}
              validationError={"Scale Max must be a positive Integer"}
              errorLabel={errorLabel}
            />
          </Form.Field>

          <Form.Field>
            <label>
              Environment Variables{" "}
              <Button
                type={"button"}
                className={"add-button"}
                onClick={this.props.addEnv}
                size={"mini"}
                icon={"plus"}
              />
            </label>
            {this.props.component.env &&
              this.props.component.env.map((e, i) => {
                return (
                  <div className={"env-input-wrapper"} key={`env-${i}`}>
                    <Input
                      value={e}
                      onChange={(e) => this.props.envOnChange(e, i)}
                      placeholder={"KEY=VALUE"}
                      className={"env-input"}
                      name={`env-${i}`}
                      required
                    />
                    <Button
                      type={"button"}
                      className={"delete-env"}
                      negative
                      icon={"close"}
                      size={"mini"}
                      onClick={() => this.props.envOnDelete(i)}
                    />
                  </div>
                );
              })}
          </Form.Field>

          <Form.Field>
            <label>
              Ports{" "}
              <Button
                type={"button"}
                className={"add-button"}
                onClick={this.props.addPort}
                size={"mini"}
                icon={"plus"}
              />
            </label>
            {this.props.component.ports &&
              this.props.component.ports.map((port, i) => {
                return (
                  <div className={"port-input-wrapper"} key={`port-${i}`}>
                    <Input
                      value={port.key}
                      className={"port-input"}
                      placeholder={"(HOST:)PORT on host"}
                      onChange={(e) => this.props.portOnChangeKey(i, e)}
                      name={`host-port-${i}`}
                      instantValidation
                      validations={"isIPPort"}
                      validationError={
                        "Host value must be of the form (HOST_IP:)PORT"
                      }
                      errorLabel={errorLabelNoPoint}
                      required
                      validationErrors={{
                        isDefaultRequiredValue:
                          "Cannot leave port value empty. Delete if not required",
                      }}
                    />
                    <Icon name={"arrow right"} className={"port-arrow"} />
                    <Input
                      value={port.value}
                      className={"port-input"}
                      placeholder={"PORT inside container"}
                      onChange={(e) => this.props.portOnChangeVal(i, e)}
                      name={`cont-port-${i}`}
                      instantValidation
                      validations={"isValidInt"}
                      validationError={
                        "Container port must be a positive integer"
                      }
                      errorLabel={errorLabelNoPoint}
                      required
                      validationErrors={{
                        isDefaultRequiredValue:
                          "Cannot leave port value empty. Delete if not required",
                      }}
                    />
                    <Button
                      type={"button"}
                      className={"delete-port"}
                      negative
                      icon={"close"}
                      size={"mini"}
                      onClick={() => this.props.deletePort(i)}
                    />
                  </div>
                );
              })}
          </Form.Field>

          <Form.Field>
            <label>
              Storage{" "}
              <Button
                type={"button"}
                className={"add-button"}
                onClick={this.props.addStore}
                size={"mini"}
                icon={"plus"}
              />
            </label>
            {this.props.component.storage &&
              this.props.component.storage.map((store, i) => {
                return (
                  <div className={"port-input-wrapper"} key={`store-${i}`}>
                    <Search
                      placeholder="Storage name"
                      value={store.name}
                      className={"network-input"}
                      onSearchChange={(e) =>
                        this.props.handleStorageSearchChange(i, e)
                      }
                      onResultSelect={(e, d) =>
                        this.props.handleStorageResultSelect(i, e, d)
                      }
                      results={this.props.storageResults}
                      noResultsMessage={
                        "Enter a new storage name to create a new persistent store"
                      }
                    />
                    <Icon name={"arrow right"} className={"port-arrow"} />
                    <Input
                      value={store.path}
                      className={"port-input"}
                      placeholder={"Storage path inside container"}
                      onChange={(e) => this.props.handleStoragePathChange(i, e)}
                      name={`cont-port-${i}`}
                      instantValidation
                      errorLabel={errorLabelNoPoint}
                      required
                      validationErrors={{
                        isDefaultRequiredValue:
                          "Cannot leave storage path empty. Delete if not required",
                      }}
                    />
                    <Button
                      type={"button"}
                      className={"delete-port"}
                      negative
                      icon={"close"}
                      size={"mini"}
                      onClick={() => this.props.deleteStorage(i)}
                    />
                  </div>
                );
              })}
          </Form.Field>
        </div>
        {this.props.deletable && (
          <Button
            type={"button"}
            className={"delete-component"}
            negative
            icon={"close"}
            onClick={this.props.deleteOnClick}
          />
        )}
      </div>
    );
  }
}

export default ComponentForm;
