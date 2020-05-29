/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React from "react";
import { connect } from 'react-redux'
import NapaLogo from "../../media/images/napa-logo.png";
import { updateCart } from '../../actions'

import "./item.css";

class PartItemComponent extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.addToCart = this.addToCart.bind(this);
    }

    addToCart() {
        const { addItemToCart } = this.props;
        addItemToCart(this.props);
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
            const extraData = Object.entries(this.props).reverse();
            return (
              <div>
                <div className="closeContainer" onClick={this.props.close}>
                  <div className="mbsc-float-ic-closed mbsc-ic mbsc-ic-close" />
                </div>
                <div
                  className="container-fluid part-container"
                  onClick={onClick}
                >
                  <div className="row" style={{ padding: ".5rem" }}>
                    <div
                      className="col-xs-12 img-container"
                    >
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
                      <h4><strong>{`Part: ${descriptionBase}`}</strong></h4>
                    </div>
                    <div
                      className="col-xs-12 part-img"
                    >
                      <img
                        style={{ width: "90%" }}
                        src={typeof imgFileItems !== "undefined" ? imgFileItems[0] : ""}
                        alt={`brand ${mfg} line ${lineAbbrev} part number ${partNumber} stock ${stock}`}
                      />

                    </div>
                    <div
                      className="col-xs-12 part-img"
                    >
                      <img
                        style={{ width: "90%" }}
                        src={typeof imgFileItems !== "undefined" ? imgFileItems[1] : ""}
                        alt={`brand ${mfg} line ${lineAbbrev} part number ${partNumber} stock ${stock}`}
                      />

                    </div>

                    <div
                      style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-start",
                    border: "solid red 4px !important"}}
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
}


const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth.user,
    };
};

const mapDispatchToProps = dispatch => ({
    addItemToCart: item => dispatch(updateCart(item))
});

export const PartItem = connect(
    mapStateToProps,
    mapDispatchToProps
)(PartItemComponent);


