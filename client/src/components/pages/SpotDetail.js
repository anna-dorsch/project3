import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class SpotDetail extends Component {
  render() {
    let curId = this.props.match.params.id;
    let curSpot = this.props.spots.find(spot => spot._id === curId);

    if (!curSpot) {
      return <div />;
    }

    return (
      <div>
        <h2>{curSpot.title}</h2>
        <h4>Description</h4>
        {curSpot.description}
        <h4>Rating</h4>
        {curSpot.rating}
        <h4>Address</h4>
        {curSpot.address}
        <h4>Owner</h4>
        {curSpot._owner.username}
      </div>
    );
  }
}
