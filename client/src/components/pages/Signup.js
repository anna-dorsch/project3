import React, { Component } from "react";
import api from "../../api";
import { Button,Row, Col, FormGroup, Label, Input, Form } from "reactstrap";
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
      selectedOption:""
    };
    this.handleOptionChange=this.handleOptionChange.bind(this)
    // this.handleInputChange=this.handleInputChange.bind(this)
  }
  handleFileChange=(e)=> {
    e.preventDefault()
     this.setState({
       file: e.target.files[0]
     })
   }

  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value,
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
  }

  render() {
    return (
      <div className="Signup">
        <h2>Signup</h2>
        <Form>
          <FormGroup row>
            <Label for="exampleText" sm={1}>
              Username:{" "}
            </Label>
            <Col sm={2}>
              <Input
                type="text"
                value={this.state.username}
                onChange={e => this.handleInputChange("username", e)}
                name="username"
                id="exampleUsername"
                placeholder="crazyDiver666"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="examplePassword" sm={1}>
              Password
            </Label>
            <Col sm={2}>
              <Input
                type="password"
                value={this.state.password}
                onChange={e => this.handleInputChange("password", e)}
                name="password"
                id="examplePassword"
                placeholder="your secret"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleEmail" sm={1}>
              Email:
            </Label>
            <Col sm={2}>
              <Input
                type="email"
                value={this.state.email}
                onChange={e => this.handleInputChange("email", e)}
                name="email"
                id="exampleEmail"
                placeholder="crazyDiver666@coralreef.com"
              />
               <FormGroup row>
               <Label for="radio" sm={1}>
              Your passion:
            </Label> </FormGroup>
             
              <FormGroup check>
              <Label check>
                <Input type="radio" value="Dive" name="radio2"  onChange={this.handleOptionChange} />{' '}
                Dive
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" value="Surf" name="radio2"  onChange={this.handleOptionChange} />{' '}
                Surf
              </Label></FormGroup>
              <FormGroup check>
              <Label check>
                <Input type="radio" value="Surf&Dive" name="radio2" onChange={this.handleOptionChange} />{' '}
                Surf&Dive
              </Label></FormGroup>
            {/* <FormGroup row>
                <Label for="photo" xl={3}>
                  Add a photo
                </Label>
                <Col xl={9}>
                  <Input
                    type="file"
                    value={this.state.URL}
                    name="spotPhoto"
                    onChange={this.handleFileChange}
                  />
                </Col>
              </FormGroup> */}

            </Col>


            <Button
              size="sm"
              outline
              color="info"
              onClick={e => this.handleClick(e)}>
              Signup
            </Button>
          </FormGroup>
        </Form>

        {this.state.message && (
          <div className="info info-danger">{this.state.message}</div>
        )}
      </div>
    );
  }
}

export default Signup;
