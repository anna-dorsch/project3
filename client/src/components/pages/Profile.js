
// import React from 'react';
import React, { Component } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import { Button, Col, ListGroup, ListGroupItem, Row } from "reactstrap";
import api from "../../api";
import axios from 'axios';



class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username:"",
      password:""
      };
}
 
  componentDidMount() {
    api
      .getProfile()
      .then(user => {
        this.setState({
          username : user.username,
          password : user.password

        })
      })


}

  render() {

    return (
      
      <div className="container">
          <Row>
          <Col sm={5} className="col-text">
              <h2>My Profile</h2>
              <form>
                <Row>
                Username:{this.state.username} </Row>
                <Row>
                Email: {}  </Row>
                <Row>
                Password: {this.state.password} </Row>
                <button onClick={(e) => this.handleClick(e)}>Edit</button>
                <button onClick={(e) => this.handleClick(e)}>Delete</button>
             </form>

          </Col>

          <Col sm={3} className="col-text">
          
          </Col>
          </Row>
        </div>
      );
  }
}


export default Profile;