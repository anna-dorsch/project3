import React, { Component } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import {
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import SpotDetail from "./SpotDetail";
import api from "../../api";
import axios from "axios";

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
      pop: undefined,

      city: "",
      temperature: "",
      weatherIcon: ""
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

  getWeather(a, b) {
    var api_key = "9daf49e00d734c44819461be295f9144";
    let url = `http://api.openweathermap.org/data/2.5/forecast?lat=${a}&lon=${b}&APPID=9daf49e00d734c44819461be295f9144`;

    axios
      .get(url)
      .then(response => {
        let cityName = response.data.city.name;
        let currentTemperature =
          Math.floor(response.data.list[0].main.temp - 273.15) + "°C";

        let icon = response.data.list[0].weather[0].icon;
        console.log("ICON", icon);
        this.setState({
          city: cityName,
          temperature: currentTemperature,
          weatherIcon: "http://openweathermap.org/img/w/" + icon + ".png"
        });
        console.log("DATA ", response.data);
        console.log("WHEATHER FOR CITY", this.state.temperature);
        console.log("maybe the URL?", this.state.weatherIcon);
      })
      .catch(error => {
        console.log(error);
      });
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
    // console.log("line 85", lng, lat);
    this.getWeather(lat, lng);
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
    // console.log("spots", this.state.spots);
    return (
      <div className="spots">
        <Row>
          <Col md={3} className="col-text">
            {/* new code */}
            <FormGroup row>
              {/* <Label for="searchPlace" xl={3}>
                Search for Places
              </Label> */}
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
            <div class="curWeather">
              <div>City: {this.state.city}</div>
              <div>Weather: {this.state.temperature}</div>
              <img
                src={this.state.weatherIcon}
                alt=""
                srcset=""
                style={{ height: 70 }}
              />
              <Button color="primary">5 day Forecast</Button>
            </div>
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
            // console.log(spot.address);
            const [lng, lat] = spot.location.coordinates;
            const address = spot.address;
            let varColor = "green";
            return {
              ...spot,
              marker: new mapboxgl.Marker({
                color: varColor
              })
                .setLngLat([lng, lat])
                .on("click", () => {
                  console.log("clicked");
                })
                .setPopup(
                  new mapboxgl.Popup({
                    offset: 30,
                    anchor: "center",
                    type: "line-center"
                  }).setText(address)
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
