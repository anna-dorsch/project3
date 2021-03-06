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
      <div className="formContainer">
        <Form>
        <FormGroup row>
        <Col sm="4" md={{ size: 3, offset: 4 }}>
        <h2>Login</h2>
        </Col></FormGroup>
        <FormGroup row>
          <Col sm="4" md={{ size: 3, offset: 4 }}>
          <Label for="exampleText" hidden> </Label>
            <Input type="text" value= {this.state.username} onChange={(e) => this.handleInputChange("username", e)}name="username" id="exampleUsername" placeholder="Username" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="examplePassword" hidden></Label>
          <Col sm="4" md={{ size: 3, offset: 4 }}>
          <Input type="password"  value= {this.state.password} onChange={(e) => this.handleInputChange("password", e)} name="password" id="examplePassword" placeholder="Password" />
          </Col>
        </FormGroup>
        <FormGroup row>
        <Col id="butt" sm={{ size: 'auto', offset: 4 }}>
        <Button size="sm" outline color="primary" onClick={(e) => this.handleClick(e)}>Login</Button>
       </Col>
       </FormGroup>
        {this.state.message && <div className="info info-danger">
          {this.state.message}
        </div>}
        </Form>
      </div>
    );
  }
}

export default Login;
