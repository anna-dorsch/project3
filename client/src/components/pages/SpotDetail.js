import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { Col } from "reactstrap";

export default class SpotDetail extends Component {
  render() {
    let curId = this.props.match.params.id;
    let curSpot = this.props.spots.find(spot => spot._id === curId);

    if (!curSpot) {
      return <div />;
    }

    return (
      <Col col-sm={2} className="col-text">
        <div>
          <h2>{curSpot.title}</h2>
          <h4>Description</h4>
          {curSpot.description}
          <h4>Rating</h4>
          {curSpot.rating}
          <h4>Address</h4>
          {curSpot.address}
          <h4>Tags</h4>
          {curSpot.tags} TAGS
          <h4>Owner</h4>
          {curSpot._owner.username}
        </div>
      </Col>
    );
  }
}
