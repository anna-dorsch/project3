import React, { Component } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import {
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import SpotDetail from "./SpotDetail";
import api from "../../api";

import mapboxgl from "mapbox-gl/dist/mapbox-gl";
// const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
// const geocodingClient = mbxGeocoding({
//   accessToken:
//     "pk.eyJ1IjoiYW5uYS1kb3JzY2giLCJhIjoiY2pvenlweTBxMDEwcDN2cDZnODE1b3drbiJ9.90Qojat5txlmFGgTnbP9PA"
// });

class Spots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spots: [],
      lng: 13.3711224,
      lat: 52.5063688,
      searchPlace: "",
      filteredSuggestions: []
    };
    this.mapRef = React.createRef();
    this.map = null;
    this.markers = [];
  }
  initMap() {
    // Embed the map where "this.mapRef" is defined in the render
    this.map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: "mapbox://styles/mapbox/streets-v10",
      center: [this.state.lng, this.state.lat], // Africa lng,lat
      zoom: 1
    });

    // Add zoom control on the top right corner
    this.map.addControl(new mapboxgl.NavigationControl());
  }
  handleSpotSelection(iSelected) {
    this.map.setCenter(this.state.spots[iSelected].location.coordinates);
  }

  //trying to filter the spots
  placeSearchChange = e => {
    const value = e.target.value;
    console.log("trying", value);
    const array = this.state.spots;

    const filteredSuggestions = array.filter(
      suggestion =>
        suggestion
          .toString()
          .toLowerCase()
          .indexOf(value.toLowerCase()) > -1
    );

    this.setState({
      searchPlace: value,
      suggestions: filteredSuggestions
    });
    console.log("filter", filteredSuggestions);
    console.log("search", this.state.searchPlace);
    console.log("trying again", this.state.suggestions);
  };

  render() {
    // console.log("spots", this.state.spots);
    return (
      <div className="spots">
        <Row>
          <Col md={3} className="col-text">
            {/* new code */}
            <FormGroup row>
              <Label for="searchPlace" xl={3}>
                Search for Places
              </Label>
              <Col xl={9}>
                <Input
                  placeholder="find a spot"
                  type="text"
                  value={this.state.searchPlace}
                  name="searchPlace"
                  onChange={this.placeSearchChange}
                />
                {/* {this.state.searchResults.map(result => (
                <div onClick={e => this.handleSearchResultClick(result)}>
                  {result.place_name}
                  <hr />
                </div> */}
              </Col>
            </FormGroup>
            {/* /new code */}
            <div className="panel panel-primary" id="result_panel">
              <div className="panel-heading">
                <h3 className="panel-title">The Best Spots</h3>
              </div>
              <ListGroup>
                {this.state.spots.map((h, i) => (
                  <ListGroupItem
                    key={h._id}
                    action
                    tag={NavLink}
                    to={"/spots/" + h._id}
                    onClick={() => this.handleSpotSelection(i)}
                  >
                    <p>
                      {h.title}
                      {/* {h.address} */}
                      {/* by {h._owner.username} */}
                    </p>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </div>
          </Col>
          <Col sm={3} className="col-text">
            <Switch>
              <Route
                path="/spots/:id"
                render={props => (
                  <SpotDetail spots={this.state.spots} {...props} />
                )}
              />
              <Route render={() => <h2>Select a spot</h2>} />
            </Switch>
          </Col>
          <Col sm={5}>
            <div ref={this.mapRef} className="map" style={{ height: 400 }} />
          </Col>
        </Row>
      </div>
    );
  }
  componentDidMount() {
    api
      .getSpots()
      .then(spots => {
        // console.log(spots);
        this.setState({
          spots: spots.map(spot => {
            const [lng, lat] = spot.location.coordinates;
            return {
              ...spot,
              marker: new mapboxgl.Marker({ color: "blue" })
                .setLngLat([lng, lat])
                .on("click", () => {
                  console.log("clicked");
                })
                .addTo(this.map)
            };
          })
        });
      })
      .catch(err => console.log(err));
    this.initMap();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let center = [position.coords.longitude, position.coords.latitude];
        this.map.setCenter(center);
      });
    }
  }
}

export default Spots;
