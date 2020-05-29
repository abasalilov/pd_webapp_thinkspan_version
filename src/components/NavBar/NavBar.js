/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import React, { Component } from 'react';
import { connect } from 'react-redux';

class NavBarComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            route: '/#/'
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
      this.setState({ route: window.location.hash})
    }

    handleClick(route) {
      this.setState({route})
    }

    render() {
      const { route } = this.state;
        return (
          <header id="header" className="light header-top">
            <div className="menu">
              <nav id="menu" className="mega-menu">
                <section className="menu-list-items">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <ul className="menu-logo">
                          <li>
                            <a href="index.html">
                              <img
                                id="logo_dark_img"
                                src="images/logo.png"
                                alt="logo"
                              />
                            </a>
                          </li>
                        </ul>
                        <ul className="menu-links">
                          <li className={route === "#/" ? "active" : ""}> 
                            <a onClick={(e) => this.handleClick("#/")} href="/#/"> Home</a>
                          </li>
                          <li className={route === "/#login" ? "active" : ""}> 
                            <a onClick={(e) => this.handleClick("/#login")} href="/#login">Login</a>
                          </li>
                          <li className={route === "/#cart" ? "active" : ""}> 
                            <a onClick={(e) => this.handleClick("/#cart")} href="/#cart">Cart</a>

                          </li>
                          <li><a onClick={(e) => this.handleClick("/#contact")} href="/#contact"> Contact Us</a></li>
                          <li>
                            <div className="search-top">
                              <a className="search-btn not_click d-none d-lg-block">
                                Search Button
                              </a>
                              <div className="search-box not-click">
                                <div className="row">
                                  <div className="col-lg-2 col-sm-6">
                                    <div className="selected-box">
                                      <select className="selectpicker">
                                        <option>Make </option>
                                        <option>BMW</option>
                                        <option>Honda </option>
                                        <option>Hyundai </option>
                                        <option>Nissan </option>
                                        <option>Mercedes Benz </option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-lg-2 col-sm-6">
                                    <div className="selected-box">
                                      <select className="selectpicker">
                                        <option>Model</option>
                                        <option>3-Series</option>
                                        <option>Carrera</option>
                                        <option>GT-R</option>
                                        <option>Cayenne</option>
                                        <option>Mazda6</option>
                                        <option>Macan</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-lg-2 col-sm-6">
                                    <div className="selected-box">
                                      <select className="selectpicker">
                                        <option>Year</option>
                                        <option>2010</option>
                                        <option>2011</option>
                                        <option>2012</option>
                                        <option>2013</option>
                                        <option>2014</option>
                                        <option>2015</option>
                                        <option>2016</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-lg-2 col-sm-6">
                                    <div className="selected-box">
                                      <select className="selectpicker">
                                        <option>Body style</option>
                                        <option>2dr Car</option>
                                        <option>4dr Car</option>
                                        <option>Convertible</option>
                                        <option>Sedan</option>
                                        <option>Sports Utility</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-lg-2 col-sm-6">
                                    <div className="selected-box">
                                      <select className="selectpicker">
                                        <option>Vehicle Status</option>
                                        <option>Condition</option>
                                        <option>All Conditions</option>
                                        <option>Condition</option>
                                        <option>Brand New</option>
                                        <option>Slightly Used</option>
                                        <option>Used</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-lg-2 col-sm-6">
                                    <div className="text-center">
                                      <button className="button red" type="button">
                                        Search
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
              </nav>
            </div>
          </header>
        );
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    // simpleAction: () => dispatch(simpleAction())
});

export const NavBar = connect(mapStateToProps, mapDispatchToProps)(NavBarComponent);
