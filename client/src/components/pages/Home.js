import React, { Component } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";
// import api from '../../api';

class Home extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //   }
  // }
  render() {
    return (
      <div className="Home">
        <div class="homeBackground">
          <div class="buttonWrapper">
            <button class="buttons surfButton">SURF</button>
            <button class="buttons diveButton">DIVE</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
