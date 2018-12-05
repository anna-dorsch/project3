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
    // if (curSpot.diveSpot === true) {
    //   return <h4>Type: Divespot</h4>;
    // }
    // console.log("props", curSpot.diveSpot);
    // let diveSpot = curSpot.diveSpot;
    // let surfSpot = curSpot.diveSpot;
    return (
      <Col col-sm={2} className="col-text">
        <div>
          <h2>{curSpot.title}</h2>
          <img
            src={curSpot.pictureUrl}
            style={{ width: 150 }}
            alt="picture"
            // srcset=""
          />

          <h4>Type</h4>
          {/* // <h4>{diveSpot === true}Divespot</h4>
          // <h4>{curSpot.surfSpot} Surfspot</h4> */}
          <h4>Description</h4>
          {curSpot.description}
          <h4>Rating</h4>
          {curSpot.rating}
          <h4>Address</h4>
          {curSpot.address}
          <h4>Tags</h4>
          {curSpot.tag.map(e => (
            <div className="tag" key={e}>
              {e}
            </div>
          ))}
          <h4>Owner</h4>
          {curSpot._owner.username}
        </div>
      </Col>
    );
  }
}
