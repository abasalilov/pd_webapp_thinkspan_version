/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-const-assign */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-unused-state */
/* eslint-disable new-cap */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React from "react";
import { connect } from "react-redux";
import AALogo from "../../media/images/advanceauto-logo.png";
import NapaLogo from "../../media/images/napa-logo.png";
import EbayLogo from "../../media/images/ebay-logo.png";
import { updateCart } from "../../actions";
// const ebay = new Ebay({
//   clientID: "PartsDet-PartsDet-PRD-0ca83364c-5075a574",
//   clientSecret: "PRD-ca83364cd6d7-1521-4134-8792-a6ff",
//   // countryCode: 'EBAY-MOTOR',
//   body: {
//     grant_type: "client_credentials",
//     // you may need to define the oauth scope
//     scope: "https://api.ebay.com/oauth/api_scope"
//   }
// });

import "./item.css";

class PartItemComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      currentImgIdx: 0
    };
    this.addToCart = this.addToCart.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this)
  }

  async componentDidMount() {
    if (this.props.isEbay) {
      // const url = `http://i.ebayimg.com/images/i/${
      //   this.props.itemId[0]
      // }-0-1/s-l${300}/p.jpg`;
      // const d = await axios.get(url);
    }
  }

  addToCart() {
    const { addItemToCart } = this.props;
    addItemToCart(this.props);
  }

  handleChangeImage(add) {
    const { currentImgIdx } = this.state;
    console.log('PartItem.js, 57 ==> currentImgIdx', currentImgIdx);

    if(add) {
      this.setState({ currentImgIdx: currentImgIdx + 1 })
    } else {
      const currentLoc = currentImgIdx >= 2 ? currentImgIdx : 1;
      this.setState({ currentImgIdx: currentLoc - 1})
    }
  }


  render() {
    const { isMobile } = this.props;
    const mainURL = `http://i.ebayimg.com/images/i/${
      this.props.itemId[0]
    }-0-1/s-l${isMobile ? 225 : 600}/p.jpg`;
    const {
      mfg,
      lineAbbrev,
      partNumber,
      description,
      stock,
      price,
      imgFileItems,
      id,
      vendor,
      manufacturer = false,
      information,
      additionalImages = [],
      onClick
    } = this.props;

    const { currentImgIdx = 0 } = this.state;
    
    if (manufacturer) {
      return (
        <div
          className="container-fluid"
          style={{
            backgroundColor: "#FEFEFE",
            border: "solid orange 3px",
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
                  src={mainURL}
                  alt={`brand ${manufacturer} line ${id.line} part number ${id.number} stock ${stock}`}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (vendor === "NAPA") {
      const idx = this.props.attribute.indexOf("Style:") + 6;
      const cut = this.props.attribute.slice(idx);
      const idx2 = cut.indexOf(",");
      const descriptionBase = cut.slice(0, idx2);
      return (
        <div>
          <div className="closeContainer" onClick={this.props.close}>
            <div className="mbsc-float-ic-closed mbsc-ic mbsc-ic-close" />
          </div>
          <div className="container-fluid part-container" onClick={onClick}>
            <div className="row" style={{ padding: ".5rem" }}>
              <div className="col-xs-12 img-container">
                <img
                  src={NapaLogo}
                  alt="Napa Auto Logo"
                  style={{ width: "125px" }}
                />
                <div className="addtocart" onClick={this.addToCart}>
                  <div className="cart mbsc-float-ic-closed mbsc-ic mbsc-ic-cart" />
                  <div className="cartplus mbsc-float-ic-closed mbsc-ic mbsc-ic-plus" />
                </div>
              </div>
              <div className="col-xs-12 part-title">
                <h4>
                  <strong>{`Part: ${descriptionBase}`}</strong>
                </h4>
              </div>
              <div className="col-xs-12 part-img">
                <img
                  style={{ width: "90%" }}
                  src={
                    typeof imgFileItems !== "undefined" ? imgFileItems[0] : ""
                  }
                  alt={`brand ${mfg} line ${lineAbbrev} part number ${partNumber} stock ${stock}`}
                />
              </div>
              <div className="col-xs-12 part-img">
                <span
                  style={{ fontSize: "6rem" }}
                  className="mbsc-ic mbsc-ic-material-keyboard-arrow-left"
                />
                <img
                  style={{ width: "70%" }}
                  src={
                    typeof imgFileItems !== "undefined" ? imgFileItems[1] : ""
                  }
                  alt={`brand ${mfg} line ${lineAbbrev} part number ${partNumber} stock ${stock}`}
                />
                <span
                  style={{ fontSize: "6rem" }}
                  className="mbsc-ic mbsc-ic-material-keyboard-arrow-right"
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-start",
                  border: "solid red 4px !important"
                }}
                className="col-xs-6"
              >
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
        </div>
      );
    }

    if (vendor === "EB") {
      // TODO: FIX MOBILE
      // TODO: CONFIG FOR ALL VENDORS
      const {selectedItemURL } = this.props;
      const hasSelected = selectedItemURL.length > 0;
      const imgSrc = hasSelected
        ? `${selectedItemURL.replace(/['"]+/g, "")}`
        : this.props.image.imageUrl;
      const imgIdx = imgSrc.indexOf("225.jpg"); 
      const finalCut = `${imgSrc.slice(0, imgIdx)  }600.jpg`;
      const hasPrior = currentImgIdx > 0;
      const hasAdditional = additionalImages.length > 0 && currentImgIdx < additionalImages.length - 1;
      const currentUrl = hasAdditional && currentImgIdx > 0 ? additionalImages[currentImgIdx].imageUrl : finalCut;
      const imgCN = isMobile ? "item-img-fluid-mobile" : "item-img-fluid";
      const compatName = isMobile ? "compatabilityList-mobile" :"compatabilityList";
      return (
        <div className="col-sm-12">
          <div className="col-xs-12 img-container">
            <img
              src={EbayLogo}
              alt="eBay Auto Logo"
              style={{ width: "125px" }}
            />
            <div className="addtocart" onClick={this.addToCart}>
              Add Item To Cart
              <div className="cartplus mbsc-float-ic-closed mbsc-ic mbsc-ic-plus" />
            </div>
          </div>
          <div className="car-item gray-bg text-center">
            <div className="closeContainer" onClick={this.props.close}>
              <div className="mbsc-float-ic-closed mbsc-ic mbsc-ic-close" />
            </div>
            <div className="bigImage">
              <span
                style={{ fontSize: isMobile ? "3em" : "6em" }}
                id="arrow-left"
                className={`mbsc-ic mbsc-ic-material-keyboard-arrow-left ${hasPrior ? `hasPrior` : `noPrior`}`}
                onClick={() => this.handleChangeImage(false)}
              />
              <div className="car-image">

                <img
                  className={imgCN}
                  src={currentUrl}
                  alt={this.props.title}
                  style={{ width: "600px !important" }}
                />
              </div>
              {hasAdditional && (
              <span
                style={{ fontSize: isMobile ? "3em" : "6em" }}
                className="mbsc-ic mbsc-ic-material-keyboard-arrow-right"
                id="arrow-right"
                onClick={() => this.handleChangeImage(true)}
              />
            )}
            </div>
            <div>
              {this.props.compatibility && (
              <h5 className={compatName} style={{ textAlign: "left" }}>
                <strong>Compatability:</strong>
                {this.props.compatibility.map(compat => {
                      return (
                        <span className="compatList">
                          <strong>{`${compat.name} : ${compat.value}`}</strong>
                        </span>
                      )
                    })}
              </h5>
                )}
            </div>
            <div className="car-content">
              <a id="itemName">{this.props.itemName}</a>
              <div className="separator" />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-start",
                }}
                className="col-xs-6"
              >
                {/* <h5><strong>Price: $22.00 USD</strong></h5> */}
                <h5>{`Price: $${this.props.price} USD`}</h5>
                {this.props.subtitle && (
                  <h5>
                    <strong>{`Notes: ${this.props.title}`}</strong>
                  </h5>
                )}
                <div className="extra-item-data">{}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }  
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user,
    isMobile: state.isMobile,
  };
};

const mapDispatchToProps = dispatch => ({
  addItemToCart: item => dispatch(updateCart(item)),
});

export const PartItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(PartItemComponent);
