/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React from "react";
import AALogo from "../../media/images/advanceauto-logo.png";
import NapaLogo from "../../media/images/napa-logo.png";
// import EbayLogo from "../../media/images/ebay-logo.png";

class CartItemComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      qty:1
    };

    this.handleQtyUpdate = this.handleQtyUpdate.bind(this)
  }

  handleQtyUpdate(e) {
    this.setState({qty: e.target.value});
    this.props.updateQty(this.props.itemId, e.target.value);
  }

  render() {
    const { qty } = this.state;
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
    if (this.props.isEbay) {
      const multiTotal = this.props.price * qty
      return (
        <tr className="cart-form__cart-item cart_item">
          <td className="product-remove">
            <button
              type="button"
              className="remove"
              aria-label="Remove this item"
              onClick={() => {
                return this.props.remove(this.props.itemId)
              }}
            >
              &times;
            </button>
          </td>

          <td className="product-thumbnail">
            <a href="#"><img width="200" height="200" src={this.props.image.imageUrl} alt="" /></a>
          </td>

          <td className="product-name" data-title="Product">
            <div className="item-text">
              {this.props.itemName}
            </div>
          </td>

          <td className="product-price" data-title="Price">
            <span className="woocommerce-Price-amount amount">
              <span
                className="woocommerce-Price-currencySymbol"
              />
              {`$${this.props.price}`}
            </span>
          </td>

          <td className="product-quantity" data-title="Quantity">
            <div className="quantity">
              <label className="screen-reader-text" htmlFor="quantity">Quantity</label>
              <input
                type="text"
                id="quantity"
                className="input-text qty text"
                step="1"
                min="0"
                max=""
                name="[qty]"
                value={qty}
                title="Qty"
                size="3"
                pattern="[0-9]*"
                onChange={this.handleQtyUpdate}
              />
            </div>
          </td>

          <td className="product-subtotal" data-title="Total">
            <span className="Price-amount amount">
              <span
                className="Price-currencySymbol"
              />
              {`$${multiTotal.toFixed(2)}`}
            </span>
          </td>
        </tr>
      );
    }
    return null;
  }
}

export const CartItem = CartItemComponent;
