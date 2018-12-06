// import React from 'react';
import React from "react";
// import { NavLink, Route, Switch } from "react-router-dom";
import { CustomInput,Button, Col, FormGroup, Row, Input, Form, Label } from "reactstrap";
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
      message: null,
      selectedOption: "",
      id: null,
      formVisible:false
    };
    this.handleOptionChange=this.handleOptionChange.bind(this)
  }

 componentDidMount() {
    api.getProfile().then(user => {
      this.setState({
        username: user.username,
        password: user.password,
        email: user.email,
        URL: user.imageURL,
        selectedOption: user.selectedOption,
        id: user._id
      });
    });
  }
  handleDelete(idClicked) {
    api.deleteUser(idClicked)
    .then(data => {
      console.log('Delete', data)
      api.logout()
      this.props.history.push("/")
      // this.setState({
      //   // The new countries are the ones where their _id are diffrent from idClicked
      //   // user: this.state.user.filter(c => c._id !== idClicked)
      // })
    })
    .catch(err => {
      console.log("ERROR", err);
    })
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      file: e.target.files[0]
    });
    console.log("PROFILE.JS URL", this.state.URL);
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
  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value,
   });
  }
  handleEditSubmit(e){
        let body = {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          selectedOption: this.state.selectedOption,
          id: this.state.id
          
      }
      if (this.state.newPassword && this.state.newPassword.length > 0) {
        body.currentPassword = this.state.currentPassword
        body.newPassword = this.state.newPassword
      }
      api.editProfile(body)
        .then(data => {
          // Add a message for 3 seconds
          this.setState({
            formVisible:false,
            message: "Your profile was updated"
          })
          setTimeout(() => {
            this.setState({
              message: null
            })
          }, 3000)
        })
      }
    handleEdit(e){
      this.setState({
        formVisible:!this.state.formVisible,
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
      })
    }
    handleOptionChange(changeEvent) {
      this.setState({
        selectedOption: changeEvent.target.value
      });
    }
  render() {
    if(this.state.formVisible){
      return(
        <Form className="formContainer">
        <FormGroup row>
          <Label for="exampleText" hidden>
          </Label>
          <Col sm="4" md={{ size: 3, offset: 3 }}>
          <h2>Signup</h2>
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
          <Label for="examplePassword" hidden>
            
          </Label>
          <Col sm="4" md={{ size: 3, offset: 3 }}>
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
          <Label for="exampleEmail" hidden>
          </Label>
          <Col sm="4" md={{ size: 3, offset: 3 }}>
            <Input type="email" value={this.state.email} onChange={e => this.handleInputChange("email", e)}
              name="email" id="exampleEmail" placeholder="Your email"/>
             <FormGroup>
        <div className="radio">
        <Label for="exampleCheckbox">Your Passion:</Label>
          <CustomInput type="radio" id="exampleCustomRadio" value="Dive" name="customRadio" label="Dive" onChange={(e) => this.handleOptionChange(e)} />
          <CustomInput type="radio" id="exampleCustomRadio2" value="Surf" name="customRadio" label="Surf" onChange={(e) => this.handleOptionChange(e)} />
          <CustomInput type="radio" id="exampleCustomRadio3" value="Dive&Surf" name="customRadio" label="Dive&Surf" onChange={(e) => this.handleOptionChange(e)} />
        </div>
      </FormGroup>
          <Button size="sm" outline color="info" onClick={e => this.handleEditSubmit(e)}>Save Changes</Button>
           </Col>
        </FormGroup>
        {this.state.message && (
          <div className="info info-danger">{this.state.message}</div>
        )}
      </Form>

      )
    }
    else{

      return (
        <div className="container">
    <Col sm={5} className="col-text">
      {this.state.URL !== "" && (
        <img src={this.state.URL} style={{ height: 150 }} />
        )}
      {this.state.message && (
        <div className="info">{this.state.message}</div>
        )}
    </Col>
        <Col sm={5} className="col-text">
          <Form>
            <Row id="hi">
              <h2>hi {this.state.username}</h2>
            </Row>

            <Row sm={7}>Username:{this.state.username} </Row>
            <Row sm={7}>Email: {this.state.email} </Row>
            <Row sm={7}> Your passion: {this.state.selectedOption} </Row>
            <FormGroup check inline />
            <Row sm={7}>
              <Form onSubmit={e => this.handleSubmit(e)}>
                <Input type="file" onChange={e => this.handleChange(e)} />
                <Button size="sm" outline color="info" type="submit">
                  Upload
                </Button>
              </Form>
            </Row>
            <Row sm={7}>
              <Button
                size="sm"
                outline
                color="info"
                onClick={e => this.handleEdit(e)}
                >
                Edit
              </Button>
              {api.isLoggedIn() && <Button size="sm"
                outline
                color="info"
                onClick={() => this.handleDelete(this.state.id)}>Delete</Button>}
             
            </Row>
          </Form>
        </Col>
      </div>
    );
  }
  }
}

export default Profile;
