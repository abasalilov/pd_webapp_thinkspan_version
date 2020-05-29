/* eslint-disable react/jsx-fragments */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-array-index-key */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { vinSearch, itemTypeNext, logoutUser } from "../../actions";
import AccountForm  from "../../components/RegistrationForm/FormSections/AccountForm";
import VendorForm from "../../components/RegistrationForm/FormSections/VendorForm";

class ProfilePageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      searchWithVin: true,
      vin: "JTMZK33V576008418",
      term: "OIL FILTER"
    };

    this.handleOptionItemClick = this.handleOptionItemClick.bind(this);
    this.handleHxSelect = this.handleHxSelect.bind(this);
    this.setSearchTerm = this.setSearchTerm.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleVinChange = this.handleVinChange.bind(this);
    this.handleSetSearchMode = this.handleSetSearchMode.bind(this);
    this.submitAATypeCall = this.submitAATypeCall.bind(this);
    this.getNapaImage = this.getNapaImage.bind(this);
  }

  componentDidMount() {
    const { isLoggedIn, history } = this.props;
    if (!isLoggedIn) {
      history.push("/login");
    }
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps, prevState) {
    const { isLoggedIn, history } = this.props;
    if (!isLoggedIn && isLoggedIn !== prevProps.isLoggedIn) {
      history.push("/login");
    }
  }   

  setSearchTerm(a, b) {
    const { vin } = this.state;
    this.setState({ term: b.suggestionValue });
  }

  async getNapaImage(part) {

    return part.information.image[0].uri;
  }

  handleOptionItemClick(e) {
    this.setState({ selected: e });
  }

  handleSetSearchMode() {
    const { searchWithVin } = this.state;
    this.setState({ searchWithVin: !searchWithVin });
  }

  handleHxSelect(hx) {
    // console.log("hx", hx)
  }

  handleSearch() {
    const { vin, term, searchWithVin } = this.state;
    const { searchByVin } = this.props;
    if (vin === null) {
      alert("Please enter a VIN before searching");
    } else if (term === null) {
      alert("Please enter a Part before searching");
    } else if (searchWithVin) {
      searchByVin(vin, term);
    }
  }

  submitAATypeCall(value) {
    const { itemTypesAANext } = this.props;
    itemTypesAANext(value);
  }

  handleVinChange(e) {
    this.setState({ vin: e.target.value });
  }

  renderPersonalDataForm() {
    const { user } = this.props;
    return (
      <div className="mbsc-form-group">
        <AccountForm prefill user={user} />
      </div>
    );
  }

  renderAuthenticatedVendors() {
    const { user = {} } = this.props;
    const { providers = [] } = user;
    return (
      <div className="mbsc-form-group">
        <div className="mbsc-form-group-title">Active Parts Vendors</div>
        <VendorForm prefill user={user} />
      </div>
    );
  }

  render() {
    const { isMobile, user, parts, logout, history } = this.props;
    const { searchHx = [] } = user;
    const marginTop = isMobile ? "0px" : "60px";
    const { selected, searchWithVin } = this.state;
    const shouldRenderParts = parts.length > 0;
    return (
      <React.Fragment>
        <section className="inner-intro inner-intro2 bg-color">
          <div className="container">
            <div className="row text-center intro-title">
              <div className="col-md-6 text-md-left d-inline-block">
                <h1 className="text-white">{`Hello ${user.name}`}</h1>
              </div>
              <div className="col-md-6 text-md-right float-right">
                <ul className="page-breadcrumb">
                  <li>
                    <a href="/#/">
                      <i className="fa fa-home" />
                      {' '}
                      Home
                    </a> 
                    {' '}
                    <i className="fa fa-angle-double-right" />
                  </li>
                  <li>
                    <span>Dashboard</span>
                    {' '}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="login-form page-section-ptb">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="section-title">
                  <h2>Dashboard</h2>
                  <div className="separator" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 order-md-2 mb-4">
                <div className="list-group profile-nav">
                  <button
                    type="button"
                    onClick={() => this.handleOptionItemClick(0)}
                    className={`list-group-item list-group-item-action ${selected === 0 ? "active" : ""}`}
                  >
                    <i className="fa fa-dashboard" /> 
                    <span>Dashboard</span>
                  </button>
                  <button
                    type="button" 
                    onClick={() => this.handleOptionItemClick(1)}
                    className={`list-group-item list-group-item-action ${selected === 1 ? "active" : ""}`}
                  >
                    <i className="fa fa-reorder" /> 
                    <span>Orders</span>
                  </button>
                  <button
                    type="button" 
                    onClick={() => this.handleOptionItemClick(2)}
                    className={`list-group-item list-group-item-action ${selected === 2 ? "active" : ""}`}
                  >
                    <i className="fa fa-location-arrow" /> 
                    <span>Vendors</span>
                  </button>
                  <button
                    type="button" 
                    onClick={() => this.handleOptionItemClick(3)}
                    className={`list-group-item list-group-item-action ${selected === 3 ? "active" : ""}`}
                  >
                    <i
                      className="fa fa-user"
                    /> 
                    <span>Account details</span>
                  </button>
                  <button type="button" onClick={logout} className="list-group-item list-group-item-action">
                    <i
                      className="fa fa-sign-out"
                    /> 
                    <span>Logout</span>
                  </button>
                </div>
              </div>
              <div className="col-md-8 order-md-1 mb-4 mobile-space">

                <div className="row">
                  <p>
                    Hello
                    {' '}
                    <strong>{user.name}</strong>
                    {' '}
                    (not
                    {' '}
                    <strong>admin</strong>
                    ?)
                    {' '}
                    <button type="button" className="reg_link" onClick={logout}>Log out</button>
                  </p>
                  <p>
                    From your account dashboard you can view your
                    {' '}
                    <div onClick={() => this.handleOptionItemClick(3)}>edit your password and account details</div>
                    .
                  </p>
                </div>
                <div className="col-lg-4 col-md-4">
                  <div className="text-center">
                    <button
                      className="button btn-block red"
                      type="button"
                      onClick={() => history.push("/")}
                    >
                      Search for parts
                    </button>
                  </div>
                </div>
                {selected === 2 && this.renderAuthenticatedVendors()}
                {selected === 3 && this.renderPersonalDataForm()}
              </div>
            </div>
          </div>
        </section>
        <section />
      </React.Fragment>
    );
  }
}



const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
  parts: state.search.parts,
  questions: state.search.questions,
  showAAQuestions: state.search.showAAquestions,
  showAAResults: state.search.showAAResults
});

const mapDispatchToProps = dispatch => ({
  searchByVin: (vin, keyword) => dispatch(vinSearch(vin, keyword)),
  itemTypesAANext: (value) => dispatch(itemTypeNext(value)),
  logout: () => dispatch(logoutUser())
});

export const ProfilePage =  connect(mapStateToProps, mapDispatchToProps)(ProfilePageComponent);
