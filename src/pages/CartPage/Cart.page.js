/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-fragments */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {connect} from "react-redux"
import { CartItem } from "../../components"
import { removeItem, updatedItemQty, checkout } from "../../actions"

class CartPageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.handleCheckout = this.handleCheckout.bind(this)
    }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  async handleCheckout() {
    const {history, startCheckout, items} =  this.props
            window.open(
              "https://auth.sandbox.ebay.com/oauth2/consents?client_id=PartsDet-PartsDet-SBX-3ca83364c-161c0239&redirect_uri=Parts_Detect_LL-PartsDet-PartsD-ggtlms&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope+https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fbuy.order.readonly+https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fbuy.guest.order+https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.marketing.readonly+https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.marketing+https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.inventory.readonly+https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.inventory+https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.account.readonly+https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.account+https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.fulfillment.readonly+https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.fulfillment+https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.analytics.readonly+https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.marketplace.insights.readonly+https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fcommerce.catalog.readonly+https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fbuy.shopping.cart+https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fbuy.offer.auction+https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fcommerce.identity.readonly+https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fcommerce.identity.email.readonly+https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fcommerce.identity.phone.readonly+https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fcommerce.identity.address.readonly+https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fcommerce.identity.name.readonly+https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fcommerce.identity.status.readonly+https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.finances+https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.item.draft+https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.payment.dispute+https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.item&state&response_type=code&hd&consentGiven=false"
            );

    history.push(
      
    );
  }

    render() {
      const { isMobile, items, remove, updateQty } = this.props;
      let cartTotal = 0;
      items.map(item => {
        if (typeof item.quantity === "undefined"){
          cartTotal += Number(item.price) * 1;
        } else {
          const sub = Number(item.price) * Number(item.quantity);
          cartTotal += sub;
        }
      })
        return (
          <React.Fragment>
            <section className="inner-intro bg-5">
              <div className="container">
                <div className="row text-center intro-title">
                  <div className="col-md-6 text-md-left d-inline-block">
                    <h2 className="text-white">Cart </h2>
                  </div>
                  <div className="col-md-6 text-md-right float-right">
                    <ul className="page-breadcrumb">
                      <li>
                        <a href="#">
                          <i className="fa fa-home" />
                          Home
                        </a> 
                        <i className="fa fa-angle-double-right" />
                      </li>
                      <li>
                        <span>Cart</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="login-form page-section-ptb ">
              <div className="container">
                <div className="row d-block mb">
                  <form className="cart-form" action="#" method="post">
                    <table className="table cart_table_responsive cart cart-form__contents" cellSpacing="0">
                      <thead>
                        <tr>
                          <th className="product-remove">&nbsp;</th>
                          <th className="product-thumbnail">&nbsp;</th>
                          <th className="product-name">Product</th>
                          <th className="product-price">Price</th>
                          <th className="product-quantity">Quantity</th>
                          <th className="product-subtotal">Total</th>
                        </tr>
                      </thead>
                      <tbody>

                        {items.map((part,idx) => (
                          <CartItem key={idx + 22} remove={remove} updateQty={updateQty} {...part} />
                          ))}
                      </tbody>
                    </table>
                  </form>

                  <div className="cart-collaterals">
                    <div className="cart_totals ">


                      <h2>Cart totals</h2>
                      <table cellSpacing="0" className="table cart_table_responsive">

                        <tr className="cart-subtotal">
                          <th>Subtotal</th>
                          <td data-title="Subtotal">
                            <span className="Price-amount amount">
                              {`$${cartTotal.toFixed(2)}`}
                            </span>

                          </td>
                        </tr>
                        <tr className="order-total">
                          <th>Total</th>
                          <td data-title="Total">
                            <strong>
                              <span className="Price-amount amount">
                                {`$${cartTotal.toFixed(2)}`}
                              </span>
                            </strong>
                          </td>
                        </tr>


                      </table>

                      <div className="proceed-to-checkout">
                        <button
                          type="button"
                          id="proceed-to-checkout"
                          className="checkout-button button alt cart_btn"
                          onClick={this.handleCheckout}
                        >
                          Proceed to checkout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    items: state.cart.addedItems,
    isMobile: state.isMobile,
    eBayResults: state.search.ebay.parts,
  };
};

const mapDispatchToProps = dispatch => ({
  remove: id => dispatch(removeItem(id)),
  updateQty: (id, q) => dispatch(updatedItemQty(id, q)),
  startCheckout: (items) => dispatch(checkout(items))
});

export const CartPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(CartPageComponent);


