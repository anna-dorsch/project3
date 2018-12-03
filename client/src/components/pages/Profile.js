// import React from 'react';
import React from "react";
<<<<<<< HEAD
// import { NavLink, Route, Switch } from "react-router-dom";
import { Button, Col, FormGroup, Row, Input, Form, Label } from "reactstrap";
=======
import { NavLink, Route, Switch } from "react-router-dom";
import { Button, Col, FormGroup, ListGroupItem, Row, Input,Form,Label, } from "reactstrap";
>>>>>>> 83d2f39d57c66a1929d44b3414193244926aa0d2
import api from "../../api";
// import axios from "axios";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      URL: "",
      file: null,
      message: null
    };
  }

  componentDidMount() {
    api.getProfile().then(user => {
      this.setState({
        username: user.username,
        password: user.password,
        email: user.email,
        URL: user.imageURL
      });
    });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      file: e.target.files[0]
    });
  }
  handleSubmit(e) {
    e.preventDefault(),
      this.setState({
        URL: "",
        message: "Image loading."
      });
    api.addPicture(this.state.file).then(data => {
      this.setState({
        URL: data.pictureUrl,
        message: null
      });
    });
  }

  render() {
    return (
      <div className="container">
        <Row sm={5}>
          <Col sm={5} className="col-text">
            <h2>hi {this.state.username}</h2>
            <Form>
<<<<<<< HEAD
              <Row>
                {this.state.URL !== "" && (
                  <img src={this.state.URL} style={{ height: 200 }} />
                )}
                {this.state.message && (
                  <div className="info">{this.state.message}</div>
                )}
              </Row>
              <Row sm={7}>Username: {this.state.username} </Row>
              <Row sm={7}>Email: {} </Row>
              {/* <Row sm={7}>Password: {this.state.password} </Row> */}
              <FormGroup check inline>
                <Label check>
                  <Input type="checkbox" /> Diver
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input type="checkbox" /> Surfer
                </Label>
              </FormGroup>
              <Row sm={7}>
                {/*  change this to FORM if something weird happens */}
                <FormGroup onSubmit={e => this.handleSubmit(e)}>
                  <Input type="file" onChange={e => this.handleChange(e)} />
                  <Button type="submit">Upload</Button>
                </FormGroup>
              </Row>
              <Row sm={7}>
                <Button onClick={e => this.handleClick(e)}>Edit</Button>
                <Button onClick={e => this.handleClick(e)}>Delete</Button>
              </Row>
=======
            <Row>
            {this.state.URL!=="" && <img src={this.state.URL} style={{height: 150, width: 150}} />}
            {this.state.message && <div className="info"> 
            {this.state.message}
            </div>}
            </Row>
            <Row sm={7}>Username:{this.state.username} </Row>
            <Row sm={7}>Email: {this.state.email} </Row>
            <Row sm={7}> </Row>
            <FormGroup check inline>
          
        </FormGroup>
            <Row sm={7}>
              <Form onSubmit={e => this.handleSubmit(e)}>
              <Input type="file" onChange={e => this.handleChange(e)} />{" "}
              <Button size="sm" outline color="info" type="submit">Upload</Button></Form>

            </Row>
            <Row sm={7}>
              <Button size="sm" outline color="info" onClick={e => this.handleClick(e)}>Edit</Button>
              <Button size="sm" outline color="info" onClick={e => this.handleClick(e)}>Delete</Button>
            </Row>    
                
            
>>>>>>> 83d2f39d57c66a1929d44b3414193244926aa0d2
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Profile;
