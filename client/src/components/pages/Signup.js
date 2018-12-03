import React, { Component } from 'react';
import api from '../../api';
import { Button, Col, Row, FormGroup, ListGroupItem,Label,Input,Form}from "reactstrap";

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      email: "",
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
    let data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    }
    api.signup(data)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div className="Signup">
        <h2>Signup</h2>
        <Form>
        <FormGroup row>
          <Label for="exampleUsername" sm={1}>Username: </Label>
          <Col sm={4}>
            <Input type="username" value= {this.state.username} onChange={(e) => this.handleInputChange("username", e)}name="username" id="exampleusername" placeholder="crazyDiver666" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="examplePassword" sm={1}>Password :</Label>
          <Col sm={4}>
            <Input type="password" name="password" id="examplePassword" placeholder="enter Password" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="examplePassword" sm={1}>Email:</Label>
          <Col sm={4}>
            <Input type="password" value={this.state.username} onChange={(e) => this.handleInputChange("username", e)}name="password" id="examplePassword" placeholder="crazyDiver666@coralreef.com" />
          </Col>
          
          <Button onClick={(e) => this.handleClick(e)}>Signup</Button>
        </FormGroup>
        </Form>
                  
        {this.state.message && <div className="info info-danger">
          {this.state.message}
        </div>}
      </div>
    );
  }
}

export default Signup;
