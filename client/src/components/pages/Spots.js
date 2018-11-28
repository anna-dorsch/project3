import React, { Component } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import { Button, Col, ListGroup, ListGroupItem, Row } from "reactstrap";
import SpotDetail from "./SpotDetail";
import api from "../../api";

import mapboxgl from "mapbox-gl/dist/mapbox-gl";

class Spots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spots: []
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
      center: [0, 0], // Africa lng,lat
      zoom: 5
    });

    // Add zoom control on the top right corner
    this.map.addControl(new mapboxgl.NavigationControl());
  }
  handleSpotSelection(iSelected) {
    this.map.setCenter(this.state.spots[iSelected].location.coordinates);
  }
  render() {
    return (
      <div className="spots">
        <Row>
          <Col sm={3} className="col-text">
            <ListGroup>
              {this.state.spots.map((h, i) => (
                <ListGroupItem
                  key={h._id}
                  action
                  tag={NavLink}
                  to={"/spots/" + h._id}
                  onClick={() => this.handleSpotSelection(i)}
                >
                  {h.title} by {h._owner.username}
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col sm={4} className="col-text">
            <Switch>
              <Route
                path="/spots/:id"
                render={props => (
                  <SpotDetail {...props} spots={this.state.spots} />
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
        console.log(spots);
        this.setState({
          spots: spots.map(spot => {
            const [lng, lat] = spot.location.coordinates;
            return {
              ...spot,
              marker: new mapboxgl.Marker({ color: "red" })
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
