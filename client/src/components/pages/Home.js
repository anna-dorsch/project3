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
              to={{
                pathname: "/spots"
              }}
              params={{ testvalue: "hello" }}
              class="buttons surfButton"
            >
              SURF
            </Link>
            <Link
              to={{
                pathname: "/spots",
                query: "checked"
              }}
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
