/* eslint-disable react/no-array-index-key */
/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { PartItem } from "../../components";
import { getEbayImage, updateCart } from "../../actions";

const getPrice = part => {
  if (part.vendor === "NAPA") {
    return part.price;
  }
  if (part.vendor === "EB") {
    return part.price;
  }
};

const getImage = part => {
  if (part.vendor === "NAPA") {
    return part.imgFileItems.length > 1
      ? part.imgFileItems[1]
      : part.imgFileItems[0];
  }
  if (part.vendor === "EB") {
    return part.image.imageUrl;
  }
};

const getName = part => {
  if (part.vendor === "NAPA") {
    return part.description;
  }
  if (part.vendor === "EB") {
    return part.itemName;
  }
};

class ResultsPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: {},
      showItem: false
    };
    this.handleItemSelect = this.handleItemSelect.bind(this);
    this.handleCloseItem = this.handleCloseItem.bind(this);
    this.goToCart = this.goToCart.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const { parts = [], history } = this.props;
    if (parts.length === 0) {
      history.push("/");
    }
  }

  async handleItemSelect(v, isIconCall, add) {
    if (isIconCall) {
      /* Here make it check for add/remove */
      if (add) {
        /* make a props call here */
      }
    } else {
      await this.props.getAsyncEbayImage(v);
      this.setState({ selectedItem: v, showItem: true });
    }
  }

  handleCloseItem() {
    this.setState({ selectedItem: {}, showItem: false });
  }

  goToCart() {
    const { history } = this.props;
    history.push("/cart");
  }

  render() {
    const { selectedItemURL } = this.props;
    const { showItem, selectedItem } = this.state;
    if (showItem) {
      return (
        <CSSTransition
          in={showItem}
          timeout={300}
          classNames="alert"
          unmountOnExit
        >
          <div className="alert bottomMobileGroup">
            <div className="searchResultsFocus">
              <PartItem
                close={this.handleCloseItem}
                {...selectedItem}
                selectedItemURL={selectedItemURL}
              />
            </div>
          </div>
        </CSSTransition>
      );
    }
    const { isMobile, parts = [], car, items, addItemToCart } = this.props;
    // const marginTop = isMobile ? "60px" : "60px";
    // const itemW = isMobile ? "mbsc-col-12" : "mbsc-col-8"
    // const headText = parts.length > 0 ? parts[0].searchTerm : "Search";
    const intro = isMobile ? "inner-intro-mobile bg-6" : "inner-intro bg-6";
    return (
      <div>
        <section className={intro}>
          <div className="container">
            <div className="row text-center intro-title">
              <div className="col-md-6 text-md-left d-inline-block">
                <h1 className="text-white">Results </h1>
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
                    <span>Results</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="product-listing page-section-ptb">
          <div className="container">
            <div className="results-top">
              <div id="ex4" onClick={this.goToCart}>
                <span
                  className="p1 fa-stack fa-2x has-badge"
                  data-count={`${items.length}`}
                >
                  <i
                    id="cart-count"
                    className="p3 fa fa-shopping-cart fa-stack-1x xfa-inverse"
                    data-count={`${items.length}b`}
                  />
                </span>
              </div>
              <div onClick={this.goToCart}>
                <span>
                  <h4 className="gtc" id="go-to-cart-btn">Go to Cart</h4>
                </span>
              </div>
            </div>
            <div className="row" id="search-results">
              {parts.map((part, idx) => {
                const img = getImage(part);
                const itemName = getName(part);
                const price = getPrice(part);
                return (
                  <div key={idx + 2} className="col-lg-3">
                    <div className="car-item gray-bg text-center">
                      <div className="car-image">
                        <img className="img-fluid" src={img} alt="" />
                        <div className="car-overlay-banner">
                          <ul className="car-overlay-banner-options">
                            <li>
                              <a onClick={() => this.handleItemSelect(part)}>
                                <i className="fa fa-search-plus" id="review-item" />
                              </a>
                            </li>
                            <li>
                              <a onClick={() => addItemToCart(part)}>
                                <i
                                  className="fa fa-shopping-cart"
                                  title="Add To Cart"
                                  id="add-to-cart-icon"
                                />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="car-list">
                        <ul className="list-inline">
                          <li>
                            <i className="fa fa-registered" id="itemYear" />
                            {car.year}
                          </li>
                          <li>
                            <i className="fa fa-cog" id="itemModel"  />
                            {car.model}
                          </li>
                          <li>
                            <i className="fa fa-shopping-cart" />
                            {`$${price}`}
                          </li>
                        </ul>
                      </div>
                      <div className="car-content">
                        <a id="itemName">{itemName}</a>
                        <a id="itemPrice">
                          {`Price: $${price}`}
                        </a>
                        <div className="separator" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="pagination-nav d-flex justify-content-center">
              <ul className="pagination">
                <li>
                  <a href="#">«</a>
                </li>
                <li className="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li>
                  <a href="#">»</a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
  parts: state.search.parts,
  selectedItemURL: state.search.selectedItemUrl,
  isMobile: state.isMobile,
  car: state.car,
  items: state.cart.addedItems,
  questions: state.search.questions,
  showAAQuestions: state.search.showAAquestions,
  showAAResults: state.search.showAAResults
});

const mapDispatchToProps = dispatch => ({
  getAsyncEbayImage: d => dispatch(getEbayImage(d)),
  addItemToCart: item => dispatch(updateCart(item))
});

export const ResultsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsPageComponent);

// <AddRemove add={() => this.handleItemSelect(part, true, true)} remove={() => this.handleItemSelect(part, true, false)} />
