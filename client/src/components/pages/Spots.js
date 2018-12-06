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
  Button,
  CustomInput
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
      originalArray: [],

      city: "",
      temperature: "",
      weatherIcon: "",
      cityID: "",
      spotType: "",

      surfCheck: "",
      diveCheck: ""
    };
    this.mapRef = React.createRef();
    this.map = null;
    this.markers = [];
    this.layer = null;
    // this.newMarker;
    this.handleOptionChange = this.handleOptionChange.bind(this);
    // this.handleSurfOption = this.handleSurfOption.bind(this);
    // this.handleOption = this.handleOption.bind(this);
  }

  initMap() {
    // Embed the map where "this.mapRef" is defined in the render
    this.map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: "mapbox://styles/mapbox/streets-v10",
      center: [this.state.lng, this.state.lat], // Africa lng,lat
      zoom: 3
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

  getForecast(a, b) {
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${a}&lon=${b}&APPID=9daf49e00d734c44819461be295f9144`;
    axios
      .get(url)
      .then(response => {
        for (let i = 6; i < response.data.list.length; i + 6) {
          console.log("DATA", response.data);
          let cityName = response.data.city.name;
          let currentTemperature =
            Math.floor(response.data.list[i].main.temp - 273.15) + "°C";

          let icon = response.data.list[i].weather[0].icon;
          let cityID = response.data.city.id;
          console.log("CityName", cityName);
          // console.log("ICON", icon);
          // this.setState({
          //   city: cityName,
          //   temperature: currentTemperature,
          //   weatherIcon: "https://openweathermap.org/img/w/" + icon + ".png",
          //   cityID: cityID
          // });
        }
      })
      .catch(error => {
        console.log(error);
      });

    axios.get(URL).then(res => {
      console.log("response", res.data);
    });
  }

  getWeather(c, d) {
    let api_key = "9daf49e00d734c44819461be295f9144";
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${c}&lon=${d}&APPID=9daf49e00d734c44819461be295f9144`;

    axios
      .get(url)
      .then(response => {
        console.log("DATA", response.data);
        let cityName = response.data.city.name;
        let currentTemperature =
          Math.floor(response.data.list[0].main.temp - 273.15) + "°C";

        let icon = response.data.list[0].weather[0].icon;
        let cityID = response.data.city.id;
        console.log("IDDDD", cityID);
        // console.log("ICON", icon);
        this.setState({
          city: cityName,
          temperature: currentTemperature,
          temperatureItems: response.data.list.filter(
            item => item.dt_txt.substr(-8) === "12:00:00"
          ),
          weatherIcon: "https://openweathermap.org/img/w/" + icon + ".png",
          cityID: cityID
        });
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

  handleSpotSelection(iSelected) {
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

  handleClick = e => {
    console.log("hello");
  };

  setStateBack() {
    this.setState({
      spots: this.state.originalArray
    });
  }

  handleOptionChange(spots) {
    // this.setStateBack();
    // // console.log("spots", this.state.spot.div);
    this.setState({
      spotType: spots.target.value,
      diveCheck: !this.state.diveCheck
      //   spots: this.state.spots.filter(item => item.diveSpot)
    });
    setTimeout(() => {
      if (this.state.spotType === "getBothSpots") {
        this.initMap();
        this.setState({
          spots: this.state.originalArray.sort().map(spot => {
            const [lng, lat] = spot.location.coordinates;
            const address = spot.address;
            var varColor;

            if (spot.surfSpot && spot.diveSpot) {
              varColor = "";
            } else if (spot.surfSpot) {
              varColor = "#c7d6d7";
            } else {
              varColor = "#155662";
            }

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
                  }).setText(address || spot.title)
                )
                .addTo(this.map)
            };
          })
        });

        // console.log("all", this.state.spots);
      } else if (this.state.spotType === "getDiveSpots") {
        this.setStateBack();
        this.initMap();
        this.setState({
          spots: this.state.spots
            .filter(spot => spot.diveSpot)
            .sort()
            .map(spot => {
              const [lng, lat] = spot.location.coordinates;
              const address = spot.address;
              var varColor = "#155662";

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
                    }).setText(address || spot.title)
                  )
                  .addTo(this.map)
              };
            })
          // console.log("divepots", this.state.spots);
        });
      } else {
        this.setStateBack();
        this.initMap();
        this.setState({
          spots: this.state.spots
            .filter(item => item.surfSpot)
            .sort()
            .map(spot => {
              const [lng, lat] = spot.location.coordinates;
              const address = spot.address;
              var varColor = "#c7d6d7";

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
                    }).setText(address || spot.title)
                  )
                  .addTo(this.map)
              };
            })
        });
        // console.log("surfspots", this.state.spots);
      }
    }, 1);
  }

  render() {
    console.log(this.props.location.query);
    console.log("state porps", this.state.surfCheck);
    return (
      <div className="spots">
        <Row className="spotsRow">
          <Col md={2} className="col-text">
            <CustomInput
              type="radio"
              value="getDiveSpots"
              name="customRadio"
              label="Divespots"
              id="getDiveSpots"
              checked={this.state.diveCheck}
              onChange={e => this.handleOptionChange(e)}
              s
            />
            <CustomInput
              type="radio"
              value="getSurfSpots"
              name="customRadio"
              label="Surfspots"
              id="getSurfSpots"
              onChange={e => this.handleOptionChange(e)}
            />

            <CustomInput
              type="radio"
              value="getBothSpots"
              name="customRadio"
              label="All Apots"
              id="getBothSpots"
              onChange={e => this.handleOptionChange(e)}
            />
            {/* new code */}
            <FormGroup row>
              {/* <Label for="searchPlace" xl={3}>
                Search for Places
              </Label> */}
              <Col xl={9}>
                <Input
                  className="spotSearch"
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
                {/* <h3 className="panel-title">The Best Spots</h3> */}
              </div>
              <ListGroup>
                {this.state.spots.sort().map((h, i) => (
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

          <Col sm={6}>
            <div ref={this.mapRef} className="map" style={{ height: 400 }} />

            <div className="curWeather">
              {this.state.temperature !== "" && (
                <div class="Weather">
                  Today: {this.state.temperature}{" "}
                  <img
                    src={this.state.weatherIcon}
                    alt=""
                    srcset=""
                    style={{ height: 70 }}
                  />
                  {/* <Button color="primary" onClick={e => this.getForecast(e)}>
                    5 day Forecast
                  </Button> */}
                  <hr />
                  <div class="weatherForecast">
                    {this.state.temperatureItems.map(item => (
                      <div key={item.dt_txt} class="weatherItems">
                        <img src={this.getIcon(item)} />
                        <br />
                        {this.getCelcius(item)}
                        <br />
                        {this.getDay(item)}
                        {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Col>
          <Col sm={4} className="col-text">
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
        </Row>
      </div>
    );
  }

  getIcon(temperatureItem) {
    return (
      "https://openweathermap.org/img/w/" +
      temperatureItem.weather[0].icon +
      ".png"
    );
  }

  getCelcius(temperatureItem) {
    return Math.round(temperatureItem.main.temp - 273.15) + "°C";
  }

  getDay(temperatureItem) {
    switch (new Date(temperatureItem.dt_txt).getDay()) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      default:
        return "Saturday";
    }
  }

  componentDidMount() {
    api
      .getSpots()
      .then(spots => {
        this.setState({
          diveCheck: this.props.location.query,
          originalArray: spots
        });
        console.log("checkes?", this.state.diveCheck);
        if (this.state.diveCheck === "checked") {
          this.setStateBack();
          this.initMap();
          this.setState({
            spots: this.state.spots
              .filter(spot => spot.diveSpot)
              .sort()
              .map(spot => {
                const [lng, lat] = spot.location.coordinates;
                const address = spot.address;
                var varColor = "#155662";

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
                      }).setText(address || spot.title)
                    )
                    .addTo(this.map)
                };
              })
            // console.log("divepots", this.state.spots);
          });
        } else {
          spots: spots.sort().map(spot => {
            // console.log(spot.address);
            const [lng, lat] = spot.location.coordinates;
            const address = spot.address;
            var varColor;

            if (spot.surfSpot && spot.diveSpot) {
              varColor = "";
            } else if (spot.surfSpot) {
              varColor = "#c7d6d7";
            } else {
              varColor = "#155662";
            }

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
                  }).setText(address || spot.title)
                )
                .addTo(this.map)
            };
          });
        }

        // console.log("Spotsarray", this.state.spots);
        setTimeout(() => {
          console.log("originalArray", this.state.originalArray);
        }, 20);
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
