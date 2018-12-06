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
  constructor(props) {
    super(props);
    this.state = {};
  }

  openSurfSpots = e => {
    console.log("opensurfSpot");
  };

  openDiveSpots = e => {
    console.log("openDiveSpot");
  };

  render() {
    return (
      <div className="Home">
        <div class="homeBackground">
          <div class="buttonWrapper">
            <button
              class="buttons surfButton"
              onClick={e => this.openSurfSpots(e)}
            >
              SURF
            </button>
            <button
              class="buttons diveButton"
              onClick={e => this.openDiveSpots(e)}
            >
              DIVE
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
