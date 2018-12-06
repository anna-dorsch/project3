// import React from 'react';
import React from "react";
// import { NavLink, Route, Switch } from "react-router-dom";
import { Button, Col, FormGroup, Row, Input, Form, Label } from "reactstrap";
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
      id: null
    };
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
    // console.log("URL", this.state.URL);
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
                <Input type="file" onChange={e => this.handleChange(e)} />{" "}
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
                onClick={e => this.handleClick(e)}
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

export default Profile;
