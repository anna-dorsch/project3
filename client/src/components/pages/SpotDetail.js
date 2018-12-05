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
    // // }
    // console.log("props", curSpot.address);
    // let diveSpot = curSpot.diveSpot;
    // let surfSpot = curSpot.diveSpot;
    return (
      <Col col-sm={2} className="col-text">
        <div>
          {curSpot.title === "" ? (
            <h2>{curSpot.address}</h2>
          ) : (
            <h2>{curSpot.title}</h2>
          )}

          {curSpot.pictureUrl === "" ? (
            <br />
          ) : (
            <img src={curSpot.pictureUrl} style={{ width: 150 }} />
          )}

          <h4>Type</h4>
          <div>
            {curSpot.diveSpot === true ? <h6>Divespot</h6> : <h6>Surfspot</h6>}
            {curSpot.description === "" ? (
              <br />
            ) : (
              <div>
                <h4>Description</h4>
                <p>{curSpot.description}</p>
              </div>
            )}

            <h4>Rating</h4>
            {curSpot.rating}

            {curSpot.address === "" ? (
              <p>{curSpot.location.coordinates}</p>
            ) : (
              <div>
                <h4>Address</h4>
                <p>{curSpot.address}</p>
              </div>
            )}

            {curSpot.tag !== [] ? (
              <div>
                <h4>Tags</h4>
                {curSpot.tag.map(e => (
                  <div className="tag" key={e}>
                    {e}
                  </div>
                ))}
              </div>
            ) : (
              <br />
            )}
          </div>

          <h4>Owner</h4>
          {curSpot._owner.username}
        </div>
      </Col>
    );
  }
}
