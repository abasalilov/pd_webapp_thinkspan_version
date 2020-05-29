/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React from "react";
import AALogo from "../../media/images/advanceauto-logo.png";
import NapaLogo from "../../media/images/napa-logo.png";
import EbayLogo from "../../media/images/ebay-logo.png";

import "./part.css";

class PartListItemComponent extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      mfg,
      lineAbbrev,
      partNumber,
      description,
      stock,
      price,
      imgFileItems,
      id,
      URL = "",
      vendor,
      manufacturer = false,
      information,
      isMobile,
      onClick
    } = this.props;
    if (manufacturer) {
      return (
        <div
          className="container-fluid"
          style={{
            backgroundColor: "#FEFEFE",
            border: "solid #e96023 3px",
            margin: "1rem",
            borderRadius: ".5rem"
          }}
        >
          <div className="row" style={{ padding: ".5rem" }}>
            <div
              className="col-xs-8"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <img
                src={AALogo}
                alt="Advance Auto Logo"
                style={{ width: "125px" }}
              />
              <div className="col-xs-8">
                <h4>{`${description}`}</h4>
              </div>
            </div>
            <div data-id="col1" className="col-xs-8">
              MFG:
              {`${manufacturer}`}
              <br />
              Line:
              {`${id.line}`}
              <br />
              Part #:
              {`${id.number}`}
              <br />
              Price $: 
              {' '}
              {`${information.buyPrice.amount}`}
            </div>
            <div data-id="col2" className="col-xs-4">
              <div
                className="col-xs-8"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <img
                  src={URL}
                  style={{ width: "140px" }}
                  alt={`brand ${manufacturer} line ${id.line} part number ${id.number} stock ${stock}`}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (vendor === "NAPA") {
      return (
        <div
          className="container-fluid"
          style={{
            backgroundColor: "#FEFEFE",
            border: "solid #e96023 3px",
            margin: "1rem",
            borderRadius: ".5rem"
          }}
          onClick={onClick}
        >
          <div className="row" style={{ padding: ".5rem" }}>
            <div
              className="col-xs-8"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <img
                src={NapaLogo}
                alt="Napa Auto Logo"
                style={{ width: "125px" }}
              />
              <div className="col-xs-8">
                <h4>{`${description.length > 40 ? "" : description}`}</h4>
              </div>
            </div>
            <div
              className="col-xs-8"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <img
                style={{ width: "140px" }}
                src={typeof imgFileItems !== "undefined" ? imgFileItems[0] : ""}
                alt={`brand ${mfg} line ${lineAbbrev} part number ${partNumber} stock ${stock}`}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-start"
                }}
                className="col-xs-6"
              >
                <div data-id="col1">
                  Brand:
                  {`${mfg}`}
                  <br />
                  Line:
                  {`${lineAbbrev}`}
                  <br />
                  Part #:
                  {`${partNumber}`}
                  <br />
                  <div data-id="col2" className="col-xs-4">
                    Price :$
                    {`${price}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (vendor === "EB") {
      return (
        <div
          className="container-fluid"
          style={{
            backgroundColor: "#FEFEFE",
            border: "solid #e96023 3px",
            margin: "1rem",
            borderRadius: ".5rem"
          }}
          onClick={onClick}
        >
          <div className="row" style={{ padding: ".5rem" }}>
            <div
              className="col-xs-12"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent:"flex-start"
              }}
            >
              <img
                src={EbayLogo}
                alt="eBay Auto Logo"
                style={{ width: "125px" }}
              />
            </div>
            <div className="col-xs-12">
              <h5><strong>{`Part: ${this.props.title[0]}`}</strong></h5>
            </div>
            <div
              className="col-xs-12"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {this.props.galleryURL && (
                <img src={this.props.galleryURL[0]} alt={this.props.title[0]} style={{width:"140px"}} />
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
              className="col-xs-12"
            />
            {this.props.compatibility && (
              <h5 style={{ textAlign: "left" }}>{`Compatability: ${this.props.compatibility[0].name}, ${this.props.compatibility[0].value}}`}</h5>
            )}
            {this.props.subtitle && (<h5>{`Notes: ${this.props.subtitle[0]}`}</h5>)}
            <h5>{`Price: $${this.props.sellingStatus["0"].currentPrice["0"].__value__} USD`}</h5>
          </div>
        </div>
      );
    }
  }
}

export const PartListItem = PartListItemComponent;
