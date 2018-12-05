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
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mbxGeocoding({
  accessToken:
    "pk.eyJ1IjoiYW5uYS1kb3JzY2giLCJhIjoiY2pvenlweTBxMDEwcDN2cDZnODE1b3drbiJ9.90Qojat5txlmFGgTnbP9PA"
});

// let newMarker;

class Spots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spots: [],
      lng: 13.3711224,
      lat: 52.5063688,
      searchPlace: "",
      filteredSuggestions: [],
      redMarkers: [],
      newMarker: [],
      pop: undefined
    };
    this.mapRef = React.createRef();
    this.map = null;
    this.markers = [];
    this.layer = null;
    // this.newMarker;
  }
  initMap() {
    // Embed the map where "this.mapRef" is defined in the render
    this.map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: "mapbox://styles/mapbox/streets-v10",
      center: [this.state.lng, this.state.lat], // Africa lng,lat
      zoom: 1
    });

    // this.map.on("load", function(e) {
    //   this.map.addLayer({});
    // });

    // Add zoom control on the top right corner
    this.map.addControl(new mapboxgl.NavigationControl());
  }

  deleteArray() {
    console.log("I am in delete");
    this.setState({
      redMarkers: []
    });

    console.log("arrayofMarker", this.state.redMarkers);
    this.setStateToNewValue();
  }

  setStateToNewValue() {
    this.setState({
      redMarkers: [...this.state.redMarkers, this.state.newMarker]
    });
  }

  async handleSpotSelection(iSelected) {
    // this is working
    this.map.setCenter(this.state.spots[iSelected].location.coordinates);

    let lng = this.state.spots[iSelected].location.coordinates[0];
    let lat = this.state.spots[iSelected].location.coordinates[1];

    let address = this.state.spots[iSelected].address;

    // this.Marker.setPopup(
    //   new mapboxgl.Popup({ offset: -30, anchor: "center" }).setText(address)
    // ).addTo(this.map);

    // this.state.newMarker = new mapboxgl.Popup({
    //   closeOnClick: false,
    //   closeOnOutsideClick: true
    // })
    //   .setLngLat([lng, lat])
    //   .setHTML("<p>" + address + "</p>")
    //   .addTo(this.map);

    // console.log("here", this.state.newMarker);
    // console.log("arrayofMarker", this.state.redMarkers);

    // this.state.newMarker = new mapboxgl.Marker({ color: "red" })
    //   .setLngLat([lng, lat])
    //   .on("click", () => {
    //     console.log("clicked");
    //   })
    //   .setPopup(
    //     new mapboxgl.Popup({ offset: -30, anchor: "center" }).setText(address)
    //   )
    //   .addTo(this.map);
  }

  //trying to filter the spots
  placeSearchChange = e => {
    const value = e.target.value;

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
  };

  render() {
    console.log(this.state.newMarker);
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
                    <p>{h.title}</p>
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
        this.setState({
          spots: spots.map(spot => {
            console.log(spot.address);
            const [lng, lat] = spot.location.coordinates;
            const address = spot.address;
            return {
              ...spot,
              marker: new mapboxgl.Marker({ color: "green" })
                .setLngLat([lng, lat])
                .on("click", () => {
                  console.log("clicked");
                })
                .setPopup(
                  new mapboxgl.Popup({ offset: 30, anchor: "center" }).setText(
                    address
                  )
                )
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
