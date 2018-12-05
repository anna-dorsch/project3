import React, { Component } from "react";
import axios from "axios";
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
import Autocomplete from "./Autocomplete";
// import { render } from "react-dom";

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mbxGeocoding({
  accessToken:
    "pk.eyJ1IjoiYW5uYS1kb3JzY2giLCJhIjoiY2pvenlweTBxMDEwcDN2cDZnODE1b3drbiJ9.90Qojat5txlmFGgTnbP9PA"
});
let mir;

class AddSpot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      diveSpot: false,
      surfSpot: false,
      title: "",
      description: "",
      rating: 0,
      lng: 13.3711224,
      lat: 52.5063688,
      message: null,
      searchResults: [],
      address: "",
      pictureUrl: "",
      file: null
    };
    this.mapRef = React.createRef();
    this.map = null;
    this.marker = null;
  }

  handleInputChange = event => {
    let name = event.target.name;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState(
      {
        [name]: value
      },
      () => {
        if (this.marker && (name === "lat" || name === "lng")) {
          this.marker.setLngLat([this.state.lng, this.state.lat]);
        }
      }
    );
  };

  getData = tag => {
    console.log("data", tag);
    mir = tag;
  };
  // add the place to the database
  handleClick(e) {
    e.preventDefault();

    let data = {
      tag: mir,
      diveSpot: this.state.diveSpot,
      surfSpot: this.state.surfSpot,
      title: this.state.title,
      description: this.state.description,
      rating: this.state.rating,
      lng: this.state.lng,
      lat: this.state.lat,
      address: this.state.searchText,
      pictureUrl: this.state.pictureUrl
    };
    // console.log("sss", data.tag);
    api
      .addSpot(data)
      // api
      //   .addPicture(this.state.file)
      //   .then(url => {
      //     this.setState({
      //       pictureUrl: url.pictureUrl,
      //       message: null
      //     });
      //     console.log("this is the url", this.state.pictureUrl);
      //   })
      .then(result => {
        console.log("SUCCESS!");
        this.setState({
          title: "",
          description: "",
          rating: 0,
          address: "",
          diveSpot: false,
          surfSpot: false,

          // pictureUrl: "",

          message: `Your spot has been created`
        });
        console.log(this.tagName);
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
      zoom: 1
    });

    // Add zoom control on the top right corner
    this.map.addControl(new mapboxgl.NavigationControl());

    // Create a marker on the map
    this.marker = new mapboxgl.Marker({ color: "blue", draggable: true })
      .setLngLat([this.state.lng, this.state.lat])
      .addTo(this.map);

    // Trigger a function every time the marker is dragged
    this.marker.on("drag", () => {
      let { lng, lat } = this.marker.getLngLat();

      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=pk.eyJ1IjoiYW5uYS1kb3JzY2giLCJhIjoiY2pvenlweTBxMDEwcDN2cDZnODE1b3drbiJ9.90Qojat5txlmFGgTnbP9PA`
        )
        .then(res => {
          // javascript magic right here
          if (res.data.features[0] === undefined) {
            this.setState({
              address: "",
              lng,
              lat
            });
          } else {
            this.setState({
              address: res.data.features[0].place_name,
              lng,
              lat
            });
          }
        });
    });
  }

  //trying to configure the searchbar
  handleSearchChange = e => {
    let value = e.target.value;
    console.log(value);
    this.setState({
      searchText: value
    });
    // This is for autocompletion
    geocodingClient
      .forwardGeocode({
        query: value,
        limit: 5
      })
      .send()
      .then(response => {
        this.setState({
          searchResults: response.body.features
        });
      });
  };

  handleTagSearchChange = e => {
    let value = e.target.value;

    this.setState({
      tagName: value
    }).then(response => {
      this.setState({
        tags: response.value
      });
    });
  };

  handleSearchResultClick({ center, place_name, context, ...props }) {
    this.setState({
      lng: center[0],
      lat: center[1],
      searchText: place_name,
      searchResults: []
    });
    this.map.setCenter(center);
    this.marker.setLngLat(center);
  }

  handleChange(e) {
    e.preventDefault();
    // console.log("picture1", e.target.files[0].name)
    this.setState({
      // pictureUrl: e.target.files[0].name,
      file: e.target.files[0]
    });
    api.addPicture(this.state.file).then(url => {
      this.setState({
        pictureUrl: url.pictureUrl,
        message: null
      });
      console.log("this is the url", this.state.pictureUrl);
    });
  }

  render() {
    return (
      <Container className="AddSpot">
        <h2>Add a Dive Spot</h2>

        <Row>
          <Col md={6}>
            <Form>
              {/* checking whether it is a dive or a surfspot */}
              <FormGroup check inline>
                <Label check for="type">
                  <Input
                    name="surfSpot"
                    type="checkbox"
                    value={this.state.surfSpot}
                    onChange={this.handleInputChange}
                  />
                  Surfspot
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check for="type">
                  <Input
                    name="diveSpot"
                    type="checkbox"
                    value={this.state.diveSpot}
                    onChange={this.handleInputChange}
                  />
                  Divespot
                </Label>
              </FormGroup>

              {/* the user can give the place a personal Name */}
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

              {/* the user has to add a description to the place he is about to add */}
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
                    rows="7"
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>

              {/* the user can add tags to the description */}
              <FormGroup row>
                <Label for="search" xl={3}>
                  Tags
                </Label>
                <Col xl={9}>
                  <Autocomplete
                    getData={this.getData}
                    type="text"
                    value={this.props.userResults}
                    name="tagName"
                    onChange={this.handleSearchChange}
                    suggestions={[
                      "summer",
                      "spring",
                      "fish",
                      "sharks",
                      "manta ray",
                      "turtles",
                      "reef",
                      "coral reef",
                      "sun",
                      "PADI",
                      "open water diving",
                      "scuba diving",
                      "freediving",
                      "divemaster",
                      "whale sharks",
                      "eels",
                      "sea horses",
                      "dolphins",
                      "whales",
                      "warm",
                      "cold",
                      "plastic",
                      "ship wreck",
                      "wreck",
                      "ships",
                      "beach",
                      "sandbeach",
                      "stonebeach",
                      "indoor",
                      "outdoor",
                      "cave",
                      "cave diving",
                      "apnea diving",
                      "beginner",
                      "advanced",
                      "intermediate",
                      "anemone",
                      "snorkeling",
                      "octopus",
                      "starfish",
                      "ray",
                      "lionfish"
                    ]}
                  />
                </Col>
              </FormGroup>

              {/* the user can add a picture to the place he is about to create */}
              <FormGroup row>
                <Label for="photo" xl={3}>
                  Add a photo
                </Label>
                <Col xl={9}>
                  <Input
                    type="file"
                    value={this.state.pictureUrl.name}
                    name="spotPhoto"
                    onChange={e => this.handleChange(e)}
                  />
                </Col>
              </FormGroup>

              {/* the user has to add a rating to the spot */}
              <FormGroup row>
                <Label for="rating" xl={3}>
                  Rating
                </Label>
                <Col xl={9}>
                  <Input
                    type="select"
                    name="rating"
                    id="exampleSelect"
                    value={this.state.rating}
                    onChange={this.handleInputChange}
                  >
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                  </Input>
                </Col>
              </FormGroup>

              {/* the user can get the address by typing in the latitude and longitude of the place he is about to enter */}
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

              {/* new code */}
              {/* the user can search for the address of the place he is about to add */}
              <FormGroup row>
                <Label for="search" xl={3}>
                  Place
                </Label>
                <Col xl={9}>
                  <Input
                    type="text"
                    value={this.state.searchText || this.state.address}
                    name="searchText"
                    onChange={this.handleSearchChange}
                  />

                  {this.state.searchResults.map(result => (
                    <div onClick={e => this.handleSearchResultClick(result)}>
                      {result.place_name}
                      <hr />
                    </div>
                  ))}
                </Col>
              </FormGroup>
              {/* /new code */}

              {/* button to create the place and save the data into the database */}
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
