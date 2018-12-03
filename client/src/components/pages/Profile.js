// import React from 'react';
import React, { Component } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import { Button, Col, FormGroup, ListGroupItem, Row, Input,Form,Label, } from "reactstrap";
import api from "../../api";
// import axios from "axios";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
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
        URL: user.imageURL
      });
    });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      file: e.target.files[0]
    })
  }
  handleSubmit(e) {
    e.preventDefault(),
    this.setState({
      URL: "",
      message: "Image loading."
    })
    api.addPicture(this.state.file)
    .then(data => {
      this.setState({
        URL: data.pictureUrl,
        message: null
      })
    }
      )
  }

  render() {
    return (
      <div className="container">
        <Row sm={7}>
          <Col sm={5} className="col-text">
            <h2>hi {this.state.username}</h2>
            <Form>
            <Row>
            {this.state.URL!=="" && <img src={this.state.URL} style={{height: 200}} />}
            {this.state.message && <div className="info">
            {this.state.message}
            </div>}
            </Row>
            <Row sm={7}>Username:{this.state.username} </Row>
            <Row sm={7}>Email: {} </Row>
            <Row sm={7}>Password: {this.state.password} </Row>
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
              <Form onSubmit={e => this.handleSubmit(e)}>
              <Input type="file" onChange={e => this.handleChange(e)} />{" "}
              <Button type="submit">Upload</Button></Form>

            </Row>
            <Row sm={7}>
              <Button onClick={e => this.handleClick(e)}>Edit</Button>
              <Button onClick={e => this.handleClick(e)}>Delete</Button>
            </Row>    
                
            
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Profile;
