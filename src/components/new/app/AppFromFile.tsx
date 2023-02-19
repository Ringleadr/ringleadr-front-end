import React from "react";
import { Button, Icon, Message } from "semantic-ui-react";
import { createApp } from "../../../api/api";
import { redirect } from "react-router-dom";

class AppFromFile extends React.Component {
  state = {
    selectedFile: "",
    showError: false,
    showSuccess: false,
    errorMessage: "",
    redirect: false,
  };
  constructor(props) {
    super(props);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleFileSelect(file) {
    this.setState({ selectedFile: file });
  }

  handleUpload() {
    if (!this.state.selectedFile) {
      this.setState({
        showError: true,
        errorMessage: "Please select a file before trying to upload",
      });
    } else {
      let fr = new FileReader();
      fr.onload = () => {
        let appString = fr.result;
        try {
          let app = JSON.parse(appString);
          createApp(app).then((resp) => {
            if (resp.ok) {
              this.setState({ showSuccess: true });
              setTimeout(() => {
                this.setState({ redirect: true });
              }, 1500);
            } else {
              this.setState({
                showError: true,
                errorMessage: "error creating application: " + resp.msg,
              });
            }
          });
        } catch (e) {
          this.setState({
            showError: true,
            errorMessage: "Error parsing file contents: " + e,
          });
        }
      };
      fr.onerror = () => {
        this.setState({
          showError: true,
          errorMessage: "Could not read uploaded file",
        });
      };
      fr.readAsText(this.state.selectedFile);
    }
  }

  render() {
    return (
      <div className={"file-form"}>
        {this.state.redirect && <Redirect to={"/applications"} />}
        <Message positive hidden={!this.state.showSuccess}>
          Success
        </Message>
        <Message negative hidden={!this.state.showError}>
          {this.state.errorMessage}
        </Message>
        <Button
          size={"large"}
          icon
          labelPosition={"left"}
          onClick={() => document.getElementById("upload").click()}
        >
          <Icon name={"upload"} />
          Select file to upload
        </Button>
        <input
          hidden
          id="upload"
          type="file"
          onChange={(e) => this.handleFileSelect(e.target.files[0])}
        />
        {this.state.selectedFile && (
          <p>
            <b>Selected:</b> {this.state.selectedFile.name}
          </p>
        )}
        <Button positive size={"large"} onClick={this.handleUpload}>
          Upload
        </Button>
      </div>
    );
  }
}

export default AppFromFile;
