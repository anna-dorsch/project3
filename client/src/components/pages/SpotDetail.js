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
      <Col
        col-sm={2}
        className="col-text panel panel-primary scroll"
        // id="result_panel"
      >
        <div className="spotDetail">
          {curSpot.title === "" ? (
            <h4>{curSpot.address}</h4>
          ) : (
            <h4>{curSpot.title}</h4>
          )}
          {curSpot.pictureUrl === "" ? (
            <br />
          ) : (
            <img
              class="spotImage"
              src={curSpot.pictureUrl}
              // style={{ width: 300, height:200}}
            />
          )}
          <h5>Type</h5>
          <div>
            {curSpot.diveSpot === true ? <h6>Divespot</h6> : <h6>Surfspot</h6>}
            {curSpot.description === "" ? (
              <br />
            ) : (
              <div>
                <h5>Description</h5>
                <p className="description">{curSpot.description}</p>
              </div>
            )}

            <h5>Rating: {curSpot.rating}</h5>

            {curSpot.address === "" ? (
              <p>{curSpot.location.coordinates}</p>
            ) : (
              <div>
                <h5>Address</h5>
                <p>{curSpot.address}</p>
              </div>
            )}

            {curSpot.tag !== [] ? (
              <div className="tagContainer">
                <h5 className="tagHeadline">Tags</h5>
                <br />
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
          {/* // <h4>Owner: {curSpot._owner.username}</h4> */}
        </div>
      </Col>
    );
  }
}
