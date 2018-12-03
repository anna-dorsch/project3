import React, { Component } from "react";
import api from "../../api";
import { Button, Col, FormGroup, Label, Input, Form } from "reactstrap";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      message: null
    };
  }

  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    });
  }

  handleClick(e) {
    e.preventDefault();
    let data = {
      username: this.state.username,
<<<<<<< HEAD
      email: this.state.email,
      password: this.state.password
    };
    api
      .signup(data)
=======
      password: this.state.password,
      email: this.state.email
    }
    api.signup(data)
>>>>>>> 83d2f39d57c66a1929d44b3414193244926aa0d2
      .then(result => {
        console.log("SUCCESS!");
        this.props.history.push("/"); // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }));
  }

  render() {
    return (
      <div className="Signup">
        <h2>Signup</h2>
        <Form>
<<<<<<< HEAD
          <FormGroup row>
            <Label for="exampleUsername" sm={1}>
              Username:{" "}
            </Label>
            <Col sm={4}>
              <Input
                type="username"
                value={this.state.username}
                onChange={e => this.handleInputChange("username", e)}
                name="username"
                id="exampleusername"
                placeholder="crazyDiver666"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="examplePassword" sm={1}>
              Password :
            </Label>
            <Col sm={4}>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="enter Password"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="examplePassword" sm={1}>
              Email:
            </Label>
            <Col sm={4}>
              <Input
                type="password"
                value={this.state.username}
                onChange={e => this.handleInputChange("username", e)}
                name="password"
                id="examplePassword"
                placeholder="crazyDiver666@coralreef.com"
              />
            </Col>

            <Button onClick={e => this.handleClick(e)}>Signup</Button>
          </FormGroup>
=======
        <FormGroup row>
          <Label for="exampleText" sm={1}>Username: </Label>
          <Col sm={2}>
            <Input type="text" value= {this.state.username} onChange={(e) => this.handleInputChange("username", e)}name="username" id="exampleUsername" placeholder="crazyDiver666" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="examplePassword" sm={1}>Password</Label>
          <Col sm={2}>
            <Input type="password"  value= {this.state.password} onChange={(e) => this.handleInputChange("password", e)} name="password" id="examplePassword" placeholder="your secret" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail" sm={1}>Email:</Label>
          <Col sm={2}>
            <Input type="email" value={this.state.email} onChange={(e) => this.handleInputChange("email", e)}name="email" id="exampleEmail" placeholder="crazyDiver666@coralreef.com" />
          </Col>
          
          <Button size="sm" outline color="info" onClick={(e) => this.handleClick(e)}>Signup</Button>
        </FormGroup>
>>>>>>> 83d2f39d57c66a1929d44b3414193244926aa0d2
        </Form>

        {this.state.message && (
          <div className="info info-danger">{this.state.message}</div>
        )}
      </div>
    );
  }
}

export default Signup;
