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
import api from "../../api";

import mapboxgl from "mapbox-gl/dist/mapbox-gl";

class AddSpot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      rating: 0,
      lng: 13.3711224,
      lat: 52.5063688,
      message: null
    };
    this.mapRef = React.createRef();
    this.map = null;
    this.marker = null;
  }

  handleInputChange = event => {
    let name = event.target.name;
    this.setState(
      {
        [name]: event.target.value
      },
      () => {
        if (this.marker && (name === "lat" || name === "lng")) {
          this.marker.setLngLat([this.state.lng, this.state.lat]);
        }
      }
    );
  };

  handleClick(e) {
    e.preventDefault();
    console.log(this.state.title, this.state.description);
    let data = {
      title: this.state.title,
      description: this.state.description,
      rating: this.state.rating,
      lng: this.state.lng,
      lat: this.state.lat
    };
    api
      .addSpot(data)
      .then(result => {
        console.log("SUCCESS!");
        this.setState({
          title: "",
          description: "",
          rating: 0,
          message: `Your spot has been created`
        });
        setTimeout(() => {
          this.setState({
            message: null
          });
        }, 2000);
      })
      .catch(err => this.setState({ message: err.toString() }));
  }
  componentDidMount() {
    this.initMap();
  }
  initMap() {
    // Init the map where "this.mapRef" is defined in the render
    this.map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: "mapbox://styles/mapbox/streets-v10",
      center: [this.state.lng, this.state.lat],
      zoom: 5
    });

    // Add zoom control on the top right corner
    this.map.addControl(new mapboxgl.NavigationControl());

    // Create a marker on the map
    this.marker = new mapboxgl.Marker({ color: "red", draggable: true })
      .setLngLat([this.state.lng, this.state.lat])
      .addTo(this.map);

    // Trigger a function every time the marker is dragged
    this.marker.on("drag", () => {
      let { lng, lat } = this.marker.getLngLat();
      console.log("DEBUG lng, lat", lng, lat);
      this.setState({
        lng,
        lat
      });
    });
  }
  render() {
    return (
      <Container className="AddSpot">
        <h2>Add a Dive Spot</h2>

        <Row>
          <Col md={6}>
            <Form>
              <FormGroup row>
                <Label for="title" xl={3}>
                  Name
                </Label>
                <Col xl={9}>
                  <Input
                    type="text"
                    value={this.state.title}
                    name="title"
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="description" xl={3}>
                  Description
                </Label>
                <Col xl={9}>
                  <Input
                    type="textarea"
                    value={this.state.description}
                    name="description"
                    cols="30"
                    rows="10"
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="rating" xl={3}>
                  Rating
                </Label>
                <Col xl={9}>
                  <Input
                    type="number"
                    value={this.state.rating}
                    name="rating"
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="title" xl={3}>
                  Longitude/Latitude
                </Label>
                <Col xl={9}>
                  <Row>
                    <Col sm={6}>
                      <Input
                        type="number"
                        value={this.state.lng}
                        name="lng"
                        onChange={this.handleInputChange}
                      />
                    </Col>
                    <Col sm={6}>
                      <Input
                        type="number"
                        value={this.state.lat}
                        name="lat"
                        min="-90"
                        max="90"
                        onChange={this.handleInputChange}
                      />
                    </Col>
                  </Row>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xl={{ size: 9, offset: 3 }}>
                  <Button color="primary" onClick={e => this.handleClick(e)}>
                    Create it!
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </Col>
          <Col md={6}>
            <div
              className="map"
              ref={this.mapRef}
              style={{ height: "100%", minHeight: 400 }}
            />
          </Col>
        </Row>

        {this.state.message && <div className="info">{this.state.message}</div>}
      </Container>
    );
  }
}

export default AddSpot;
