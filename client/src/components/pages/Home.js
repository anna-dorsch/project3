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
import { NavLink as NLink, Link } from "react-router-dom";
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
            {/* <button
              class="buttons surfButton"
              onClick={e => this.openSurfSpots(e)}
            >
              SURF
            </button>
            <button class="buttons diveButton">DIVE</button> */}

            <Link
              to="/spots"
              onClick={e => this.openSurfSpots(e)}
              class="buttons surfButton"
            >
              SURF
            </Link>
            <Link
              to="/spots"
              onClick={e => this.openDiveSpots(e)}
              class="buttons diveButton"
            >
              DIVE
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
