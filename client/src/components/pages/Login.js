import React, { Component } from 'react';
import api from '../../api';
import { Button, Col, Row, FormGroup, ListGroupItem,Label,Input,Form} from "reactstrap";

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      message: null
    }
  }

  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    api.login(this.state.username, this.state.password)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div className="Login">
        <h2>Login</h2>
        <Form>
        <FormGroup row>
          <Label for="exampleText" sm={1}>Username </Label>
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
        <Button size="sm" outline color="info" onClick={(e) => this.handleClick(e)}>LogIn</Button>
        </Form>
        {this.state.message && <div className="info info-danger">
          {this.state.message}
        </div>}
      </div>
    );
  }
}

export default Login;
