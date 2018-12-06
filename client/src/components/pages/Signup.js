import React, { Component } from "react";
import api from "../../api";
import {
  Button,
  CustomInput,
  Col,
  FormGroup,
  Label,
  Input,
  Form
} from "reactstrap";
// import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      URL: "",
      file: null,
      message: null,
      selectedOption: ""
    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
    // this.handleInputChange=this.handleInputChange.bind(this)
  }
  handleFileChange = e => {
    e.preventDefault();
    this.setState({
      file: e.target.files[0]
    });
  };

  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    });
  }

  handleClick(e) {
    e.preventDefault();
    let data = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      // URL: this.state.URL,
      selectedOption: this.state.selectedOption
    };
    // api.addPicture(this.state.file).then(data => {
    //   this.setState({
    //     URL: data.URL,
    //     message: null})})
    api
      .signup(data)
      .then(result => {
        console.log("SUCCESS!");
        this.props.history.push("/"); // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }));
  }

  handleOptionChange(changeEvent) {
    this.setState({
      selectedOption: changeEvent.target.value
    });
    console.log("changing", this.state.selectedOption);
  }

  render() {
    return (
      // <div className="formContainer">
      <Form className="formContainer">
        <FormGroup row>
          <Col sm="3" md={{ size: 2, offset: 4 }}>
            <h2>Signup</h2></Col></FormGroup>
          <FormGroup row>
          <Col sm="4" md={{ size: 3, offset: 4 }}>
          <Label for="exampleText" hidden />
            <Input
              type="text"
              value={this.state.username}
              onChange={e => this.handleInputChange("username", e)}
              name="username"
              id="exampleUsername"
              placeholder="Your Username"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="examplePassword" hidden />
          <Col sm="4" md={{ size: 3, offset: 4 }}>
            <Input
              type="password"
              value={this.state.password}
              onChange={e => this.handleInputChange("password", e)}
              name="password"
              id="examplePassword"
              placeholder="Your Password"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail" hidden />
          <Col sm="4" md={{ size: 3, offset: 4 }}>
            <Input
              type="email"
              value={this.state.email}
              onChange={e => this.handleInputChange("email", e)}
              name="email"
              id="exampleEmail"
              placeholder="Your email"
            />
            <FormGroup Row>
              <div className="radio">
                <Label for="exampleCheckbox">Your Passion:</Label>
                <CustomInput
                  type="radio"
                  id="exampleCustomRadio"
                  value="Dive"
                  name="customRadio"
                  label="Dive"
                  onChange={e => this.handleOptionChange(e)}
                />
                <CustomInput
                  type="radio"
                  id="exampleCustomRadio2"
                  value="Surf"
                  name="customRadio"
                  label="Surf"
                  onChange={e => this.handleOptionChange(e)}
                />
                <CustomInput
                  type="radio"
                  id="exampleCustomRadio3"
                  value="Dive&Surf"
                  name="customRadio"
                  label="Dive&Surf"
                  onChange={e => this.handleOptionChange(e)}
                />
              </div>
            </FormGroup>
            <Button
              size="sm"
              outline
              color="info"
              onClick={e => this.handleClick(e)}
            >
              Signup
            </Button>
          </Col>
        </FormGroup>
        {this.state.message && (
          <div className="info info-danger">{this.state.message}</div>
        )}
      </Form>

      // </div>
    );
  }
}

export default Signup;
