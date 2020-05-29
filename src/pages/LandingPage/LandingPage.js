/* eslint-disable no-nested-ternary */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/no-string-refs */
/* eslint-disable max-classes-per-file */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prefer-stateless-function */
import React, {lazy} from "react";
import axios from "axios";
import { connect } from "react-redux";
import {Input} from "@mobiscroll/react";
import {
  vinSearch,
  ebaySearch,
  decodeVinNumber,
  updateSearchTerm,
  updateCar,
  getCarModels,
  clearSearchErrors
} from "../../actions";
import { sortTrimData } from "../../utils";
import { years, carParts } from "../../ref";
import "@mobiscroll/react/dist/css/mobiscroll.min.css"

const DropDownSelect = lazy(() => import('../../components/DropDownSelect/DropDownSelect'));
const CarFoundSearchSection = lazy(() => import('../../components/CarFoundSearchSection/CarFoundSearchSection'));



class BasicInput extends React.Component {
  render() {
    return (
      <Input
        icon='{"left": "material-search" }'
        {...this.props}
        labelStyle="floating"
        inputStyle="box"
        type="text"
        style={{ minWidth: "100%" }}
      />
    );
  }
}


const getSuggestions = value => {
  const inputValue = value.trim().toUpperCase();
  const inputLength = inputValue.length;
  const sugg =
    inputLength === 0
      ? []
      : carParts.filter(lang => lang.name.slice(0, inputLength) === inputValue);

  const updatedList = sugg.slice(0, 5);
  const finalList = updatedList.map((item, idx) => {
    return { text: item.name, id: idx };
  });
  return finalList;
};

class LandingPageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      nextVal: 0,
      searchOption: "",
      vin: "JTMZK33V576008418",
      step: 0,
      options: [],
      loading: true,
      placeholder: "By Vin Number",
      hideListView: false,
      isDropDown: false
    };
    this.decode = this.decode.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleVin = this.handleVin.bind(this);
    this.handleGenericSearch = this.handleGenericSearch.bind(this);
    this.selectAutoSearchOption = this.selectAutoSearchOption.bind(this);
    this.handleSelectYear = this.handleSelectYear.bind(this);
    this.handleSelectMake = this.handleSelectMake.bind(this);
    this.handleSelectModel = this.handleSelectModel.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectTrim = this.handleSelectTrim.bind(this);
    this.handleClearVinSearch = this.handleClearVinSearch.bind(this);
    this.handleClearSearchTerm = this.handleClearSearchTerm.bind(this);
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    const newParts = this.props.parts.length || 0;
    const oldParts = prevProps.parts.length || 0;
    if (oldParts !== newParts) {
      this.props.history.push("/results");
    }
  }

  showPopup = () => {
  };

  showList = () => {
    this.refs.list.instance.show();
  };

  onSet = (event, inst) => {
    this.setState({ checked: this.state.radio });
  };

  myRadioChanged = (event, inst) => {
    this.setState({ radio: event.target.value });
  };

  onItemTap = (event, inst) => {
    const term =
      event.target.innerText[0] + event.target.innerText.slice(1).toLowerCase();
    this.props.updateSearch(term);
    this.setState({ hideListView: true });
  };

  showScrollable = () => {
    this.refs.scrollable.instance.show();
  };

  update = () => {
    if (this.state.updateVal >= 100) {
      this.setState({
        updateVal: 0
      });
    } else {
      this.setState({
        updateVal: this.state.updateVal + 25
      });
    }
  };

  next = () => {
    const { nextVal } = this.state
    if (nextVal >= 100) {
      this.setState({
        nextVal: 0
      });
    } else {
      this.setState({
        nextVal: nextVal + 50
      });
    }
  };

  handleSearch() {
    const { isDropDown } = this.state;
    const { searchTerm, car, isLoggedIn } = this.props;
    const { year, make, model } = car;
    let newMake = make;
    if (car.confirmed && !isDropDown) {
      newMake = make.slice(0, make.indexOf(` `));
    }
    const searchText = `${year} ${newMake} ${model} ${searchTerm}`;
    if (
      typeof year === "undefined" ||
      typeof make === "undefined" ||
      typeof model === "undefined"
    ) {
      alert(
        "Warning: Empty Year. Please Enter a car year make model in order to submit a search"
      );
    }
    if (searchTerm.length === 0) {
      alert(
        "Warning: Empty Term. Please Enter a search term before submitting search."
      );
    } else if (isLoggedIn) {
      this.props.submitSearch(car.vin, searchTerm);
    } else {
      this.props.submitEbaySearch(searchText);
    }
  }

  handleClearVinSearch() {
    this.setState({ hideListView: false, options: [], vin: "" });
  }

  handleClearSearchTerm() {
    this.setState({ searchTerm: "", hideListView: false, options: [] });
  }

  handleVin(e) {
    this.setState({ vin: e.target.value });
  }

  handleGenericSearch(searchText) {
    this.props.submitEbaySearch(searchText);
  }

  selectAutoSearchOption(searchOption) {
    this.setState({ searchOption });
  }

  async handleSelectYear(v, inst) {
    const { isMobile } = this.props;
    const searchYear = isMobile ? v.valueText : v.target.value;
    const { data } = await axios.get(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
    );
    const { Results } = data;
    const makes = [
      {
        text: "Select Make",
        value: ""
      }
    ];
    Results.forEach(mk => {
      mk.value = mk.MakeId;
      mk.dataValue = mk.MakeId;
      mk.text = mk.MakeName;
      makes.push(mk);
    });
    const sortedMakes =  makes.sort((a, b) => {
      if (typeof a.MakeName !== "undefined" && typeof b.MakeName !== "undefined"){
        const textA = a.MakeName.trim().toUpperCase();
        const textB = b.MakeName.trim().toUpperCase();
        const val = (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        return val
      } 
    })
    this.setState({
      makes: sortedMakes,
      searchYear,
      showMakes: true,
      placeholder: "Enter Part Name",
      isDropDown:true
    });
    this.props.updateCarInfo("year", searchYear);
  }

  async handleSelectTrim(e, inst) {
    const { isMobile } = this.props;
    const searchTrim = isMobile ? e.valueText : e.target.value;
    this.setState({ showPartsInput: true, searchTrim });
    this.props.updateCarInfo("trim", searchTrim);
    this.props.updateCarInfo("confirmed", true);
  }

  async handleSelectModel(e, inst) {
    const { isMobile, models } = this.props;
    const { searchMake, searchYear } = this.state;
    const searchModelId = isMobile ? inst._wheelArray[0] : e.target.value;
    const searchModel = models.filter(md => {
      return md.Model_ID === Number(searchModelId);
    });
    const model = searchModel[0].Model_Name;
    const data = {
      model: model.toString(),
      make: searchMake,
      year: searchYear
    };
    const trimCall = await axios.post("http://partsdetect-api.herokuapp.com/trims", data);

    const trimData = sortTrimData(trimCall.data);

    const trims = [
      {
        text: "Select Trim",
        value: ""
      }
    ];

    trimData.forEach(trm => {
      trm.test = `${trm.model_engine_cc} ${trm.model_engine_type}${trm.model_engine_cyl}`;
      trm.value = trm.model_trim;
      trm.dataValue = trm.model_trim;
      trm.text = trm.model_trim;
      if (trm.model_trim.length > 0){
        trims.push(trm);
      } else {
        console.log('LandingPage.js, 290 ==> trm', trm);
        trims.push({ text: "No trims available", dataValue:"No trims available"})
      }
    });

    this.setState({
      searchModelId,
      searchModel: model,
      trims,
      showTrims: true
    });
    this.props.updateCarInfo("model", model);
  }

  async handleSelectMake(e, inst) {
    const { isMobile } = this.props;
    const selectedValue = isMobile ? e.valueText : e.target.value;
    const makeName = this.state.makes.filter(mk => {
      if (isMobile) {
        return mk.MakeId === Number(inst._wheelArray[0]);
      }
      return mk.MakeId === Number(selectedValue);
    });
    const { searchYear } = this.state;
    const searchMakeId = makeName[0].MakeId;
    const searchMake = makeName[0].MakeName;
    const models = await this.props.getModels(searchMakeId, searchYear);
    this.setState({ models, showModels: true, searchMakeId, searchMake });
    this.props.updateCarInfo("make", searchMake);
  }

  async decode() {
    const { vin } = this.state;
    const { decodeVin } = this.props;
    decodeVin(vin);
  }

  handleNext() {
    this.setState({ step: 1 });
  }

  handleInputChange(e) {
    const searchTerm = e.target.value;
    const options = getSuggestions(searchTerm);
    this.setState({ options });
    this.props.updateSearch(searchTerm);
  }

  renderVendorQuestion(){
    return (
      <section className="bg-2 bg-overlay-black-60">
        <div className="container">
          <div className="row no-gutter">
            <div className="col-lg-6 col-md-12">
              <div className="content-box-3">
                <div className="row">
                  <div className="col-lg-8 col-md-12">
                    <div className="info">
                      <h5 className="text-white" id="header_vendor">Are you online Vendor?</h5>
                      <p className="text-white">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        {" "}
                      </p>
                      <a className="button" href="/#">
                        Contact
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="content-box-3">
                <div className="row">
                  <div className="col-lg-8 col-md-12">
                    <div className="info">
                      <h5 className="text-white">Are you online Vendor?</h5>
                      <p className="text-white">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        {" "}
                      </p>
                      <a className="button white" href="/#">
                        Contact
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  renderYMMSearch() {
    const {
      showMakes,
      showModels,
      showTrims
    } = this.state;
    const { isMobile } = this.props;
    const ddProps = {};
    ddProps.isMobile = isMobile;
    ddProps.icon = isMobile ? "" : "line-calendar";
    if (!isMobile) {
      ddProps.label = "YEAR";
      ddProps.id = "modal";
      ddProps.className = "custom-select" 
      ddProps.name = "modal"
    }
    ddProps.onSelect = this.handleSelectYear;
    const land = isMobile ? 'mobile_lander' : 'lander';
    return (
      <div>
        <h6 className={`text-white ${land} `}>By Year Make Model</h6>
        <DropDownSelect {...ddProps} id="yeardd" data={years} />
        {showMakes && this.renderMakes()}
        {showModels && this.renderModels()}
        {showTrims && this.renderTrims()}
      </div>
    );
  }

  renderMakes() {
    const { makes } = this.state;
    const { isMobile } = this.props;
    const props = {
      isMobile
    };
    props.icon = isMobile ? "" : "cogs";
    props.onSelect = this.handleSelectMake;

    if (!isMobile) {
      props.label = "Make";
    }
    return (
      <div className="form-group black-select">
        <DropDownSelect id="makedd" data={makes} {...props} />
      </div>
    );
  }

  renderModels() {
    const { isMobile, models } = this.props;
    const props = { isMobile };
    if (!isMobile) {
      props.label = "Model";
    }
    props.icon = isMobile ? "" : "cogs";
    props.onSelect = this.handleSelectModel;

    return (
      <div className="form-group black-select">
        <DropDownSelect id="modeldd" {...props} data={models} />
      </div>
    );
  }

  renderTrims() {
    const { trims } = this.state;
    const { isMobile } = this.props;
    const props = { isMobile };
    if (!isMobile) {
      props.label = "Trim";
    }
    props.icon = isMobile ? "" : "cogs";
    props.onSelect = this.handleSelectTrim;

    return (
      <div className="form-group black-select">
        <DropDownSelect id="trimsdd" {...props} data={trims} />
      </div>
    );
  }

  renderVinput() {
    const { isMobile } = this.props
    const { showMakes, vin } = this.state;
    const land = isMobile ? 'mobile_lander' : 'lander';

    const inputProps = {
      id: "vin", 
      type:"text", 
      className: `form-control placeholder ${land}`,
      name:"name"
    }

    if (!showMakes) {
      return (
        <div>
          <h6 className={`text-white ${land}`}>By Vin</h6>
          <BasicInput
            {...inputProps}
            value={vin}
            placeholder="Enter Vin"
            onChange={this.handleVin}
          />
        </div>
      );
    }
    return null;
  }


  renderMiddleSearch(showMakes) {
    const {  searchErrors, searchTerm, car, isMobile } = this.props;

    const {
      options = [],
      hideListView
    } = this.state;
    return (
      <div className="topSelectorContainer">
        <CarFoundSearchSection
          options={options}
          showMakes={showMakes}
          car={car}
          isMobile={isMobile}
          searchTerm={searchTerm}
          hideListView={hideListView}
          handleInputChange={this.handleInputChange}
          handleSearch={this.handleSearch}
          handleClearSearchTerm={this.handleClearSearchTerm}
          onItemTap={this.onItemTap}
          searchErrors={searchErrors}
        />
      </div>
    );
  }

  render() {
    const { isMobile, user, isLoggedIn, car } = this.props;

    const {
      showMakes,
    } = this.state;
    const btnContainerName = isMobile
      ? "row justify-content-center mSearchBtn"
      : "col-lg-12 checkBtn";
    const sliderName = isMobile
      ? "slider-content-middle-mobile"
      : "slider-content-middle";
    const rowName = isMobile
      ? "col-xs-12 select-row-mobile"
      : "col-xs-12 select-row";
    const renderYMM = isMobile ? !car.confirmed : true;
    return (
      <div className={`${isMobile ? `mobile-top` : ""}`}>
        <section className="slider-parallax car-directory-banner bg-3">
          {isLoggedIn && (
            <div className="welcome-msg">
              <h6 className="text-white ">{`Welcome back ${user.name}!`}</h6>
            </div>
          )}
          <div className="slider-content-middle">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="slider-content text-center">
                    <h2 className="text-white" id="idVehicle">Identify Your Vehicle</h2>
                    <div className="search-tab ">
                      <div className="row justify-content-center">
                        <div className="section-title">
                          <h2 className="text-white" id="selectVehicle">Select Your Vehicle</h2>
                          <div className="separator" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group black-select">
                            {renderYMM && this.renderYMMSearch()}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group black-select">
                            {!showMakes && this.renderVinput()}
                            {!showMakes && (
                            <div className="btnContainer">
                              <button
                                className="button btn-block red btnMobile"
                                type="button"
                                data-id="decodebtn"
                                onClick={this.decode}
                              >
                                Decode Vin Number
                              </button>
                            </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {this.renderMiddleSearch(showMakes)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>  
        {this.renderVendorQuestion()}
        <section className="feature-car new-arrival gray-bg page-section-ptb">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="section-title">
                  <span>Check out our new parts</span>
                  <h2>Recent Searches </h2>
                  <div className="separator" />
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-sm-10">
                <div
                  className="owl-carousel owl-theme"
                  data-nav-arrow="true"
                  data-items="4"
                  data-md-items="4"
                  data-sm-items="2"
                  data-xs-items="1"
                  data-space="30"
                >
                  <div className="item">
                    <div className="car-item text-center">
                      <div className="car-image">
                        <img className="img-fluid" src="https://res.cloudinary.com/dbfv0bfmw/image/upload/v1588022721/01.jpg" alt="" />
                        <div className="car-overlay-banner">
                          <ul>
                            <li>
                              <a href="/#">
                                <i className="fa fa-link" />
                              </a>
                            </li>
                            <li>
                              <a href="/#">
                                <i className="fa fa-dashboard" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="car-list">
                        <ul className="list-inline">
                          <li>
                            <i className="fa fa-registered" />
                            {' '}
                            2017
                          </li>
                          <li>
                            <i className="fa fa-cog" />
                            {' '}
                            Manual
                            {" "}
                          </li>
                          <li>
                            <i className="fa fa-dashboard" />
                            {' '}
                            6,000 mi
                          </li>
                        </ul>
                      </div>
                      <div className="car-content">
                        <div className="star">
                          <i className="fa fa-star orange-color" />
                          <i className="fa fa-star orange-color" />
                          <i className="fa fa-star orange-color" />
                          <i className="fa fa-star orange-color" />
                          <i className="fa fa-star-o orange-color" />
                        </div>
                        <a href="/#">Acura Rsx</a>
                        <div className="separator" />
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="car-item text-center">
                      <div className="car-image">
                        <img className="img-fluid" src="https://res.cloudinary.com/dbfv0bfmw/image/upload/v1588022721/02.jpg" alt="" />
                        <div className="car-overlay-banner">
                          <ul>
                            <li>
                              <a href="/#">
                                <i className="fa search-plus" />
                              </a>
                            </li>
                            <li>
                              <a href="/#">
                                <i className="fa fa-dashboard" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="car-list">
                        <ul className="list-inline">
                          <li>
                            <i className="fa fa-registered" />
                            {' '}
                            2017
                          </li>
                          <li>
                            <i className="fa fa-cog" />
                            {' '}
                            Manual
                            {" "}
                          </li>
                          <li>
                            <i className="fa fa-dashboard" />
                            {' '}
                            6,000 mi
                          </li>
                        </ul>
                      </div>
                      <div className="car-content">
                        <div className="star">
                          <i className="fa fa-star orange-color" />
                          <i className="fa fa-star orange-color" />
                          <i className="fa fa-star orange-color" />
                          <i className="fa fa-star orange-color" />
                          <i className="fa fa-star-o orange-color" />
                        </div>
                        <a href="/#">Lexus GS 450h</a>
                        <div className="separator" />
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="car-item text-center">
                      <div className="car-image">
                        <img className="img-fluid" src="https://res.cloudinary.com/dbfv0bfmw/image/upload/v1588022721/03.jpg" alt="" />
                        <div className="car-overlay-banner">
                          <ul>
                            <li>
                              <a href="/#">
                                <i className="fa fa-link" />
                              </a>
                            </li>
                            <li>
                              <a href="/#">
                                <i className="fa fa-dashboard" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="car-list">
                        <ul className="list-inline">
                          <li>
                            <i className="fa fa-registered" />
                            {' '}
                            2017
                          </li>
                          <li>
                            <i className="fa fa-cog" />
                            {' '}
                            Manual
                            {" "}
                          </li>
                          <li>
                            <i className="fa fa-dashboard" />
                            {' '}
                            6,000 mi
                          </li>
                        </ul>
                      </div>
                      <div className="car-content">
                        <div className="star">
                          <i className="fa fa-star orange-color" />
                          <i className="fa fa-star orange-color" />
                          <i className="fa fa-star orange-color" />
                          <i className="fa fa-star orange-color" />
                          <i className="fa fa-star-o orange-color" />
                        </div>
                        <a href="/#">GTA 5 Lowriders DLC</a>
                        <div className="separator" />
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="car-item text-center">
                      <div className="car-image">
                        <img className="img-fluid" src="https://res.cloudinary.com/dbfv0bfmw/image/upload/v1588022721/04.jpg" alt="" />
                        <div className="car-overlay-banner">
                          <ul>
                            <li>
                              <a href="/#">
                                <i className="fa fa-link" />
                              </a>
                            </li>
                            <li>
                              <a href="/#">
                                <i className="fa fa-dashboard" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="car-list">
                        <ul className="list-inline">
                          <li>
                            <i className="fa fa-registered" />
                            {' '}
                            2017
                          </li>
                          <li>
                            <i className="fa fa-cog" />
                            {' '}
                            Manual
                            {" "}
                          </li>
                          <li>
                            <i className="fa fa-dashboard" />
                            {' '}
                            6,000 mi
                          </li>
                        </ul>
                      </div>
                      <div className="car-content">
                        <div className="star">
                          <i className="fa fa-star orange-color" />
                          <i className="fa fa-star orange-color" />
                          <i className="fa fa-star orange-color" />
                          <i className="fa fa-star orange-color" />
                          <i className="fa fa-star-o orange-color" />
                        </div>
                        <a href="/#">Toyota avalon hybrid </a>
                        <div className="separator" />
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="car-item text-center">
                      <div className="car-image">
                        <img className="img-fluid" src="https://res.cloudinary.com/dbfv0bfmw/image/upload/v1588022721/02.jpg" alt="" />
                        <div className="car-overlay-banner">
                          <ul>
                            <li>
                              <a href="/#">
                                <i className="fa fa-link" />
                              </a>
                            </li>
                            <li>
                              <a href="/#">
                                <i className="fa fa-dashboard" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="car-list">
                        <ul className="list-inline">
                          <li>
                            <i className="fa fa-registered" />
                            {' '}
                            2017
                          </li>
                          <li>
                            <i className="fa fa-cog" />
                            {' '}
                            Manual
                            {" "}
                          </li>
                          <li>
                            <i className="fa fa-dashboard" />
                            {' '}
                            6,000 mi
                          </li>
                        </ul>
                      </div>
                      <div className="car-content">
                        <div className="star">
                          <i className="fa fa-star orange-color" />
                          <i className="fa fa-star orange-color" />
                          <i className="fa fa-star orange-color" />
                          <i className="fa fa-star orange-color" />
                          <i className="fa fa-star-o orange-color" />
                        </div>
                        <a href="/#">Hyundai santa fe sport</a>
                        <div className="separator" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="feature-car new-arrival gray-bg page-section-ptb">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="section-title">
                  <span>View Category By</span>
                  <h2>Car Parts</h2>
                  <div className="separator" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-3">
                    <div className="car-item text-center">
                      <div className="car-image">
                        <img className="img-fluid" src="https://res.cloudinary.com/dbfv0bfmw/image/upload/v1588023420/cat-01.jpg" alt="" />
                        <div className="overlay-banner">
                          <h3>Headlights</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="car-item text-center">
                      <div className="car-image">
                        <img className="img-fluid" src="https://res.cloudinary.com/dbfv0bfmw/image/upload/v1588023420/cat-02.jpg" alt="" />
                        <div className="overlay-banner">
                          <h3>Tyres</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="car-item text-center">
                      <div className="car-image">
                        <img className="img-fluid" src="https://res.cloudinary.com/dbfv0bfmw/image/upload/v1588023420/cat-03.jpg" alt="" />
                        <div className="overlay-banner">
                          <h3>Tools</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="car-item text-center">
                      <div className="car-image">
                        <img className="img-fluid" src="https://res.cloudinary.com/dbfv0bfmw/image/upload/v1588023420/cat-04.jpg" alt="" />
                        <div className="overlay-banner">
                          <h3>Oil</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="car-item text-center">
                      <div className="car-image">
                        <img className="img-fluid" src="https://res.cloudinary.com/dbfv0bfmw/image/upload/v1588023420/cat-05.jpg" alt="" />
                        <div className="overlay-banner">
                          <h3>Gear</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="car-item text-center">
                      <div className="car-image">
                        <img className="img-fluid" src="https://res.cloudinary.com/dbfv0bfmw/image/upload/v1588023420/cat-06.jpg" alt="" />
                        <div className="overlay-banner">
                          <h3>Engine</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="car-item text-center">
                      <div className="car-image">
                        <img className="img-fluid" src="https://res.cloudinary.com/dbfv0bfmw/image/upload/v1588023420/cat-07.jpg" alt="" />
                        <div className="overlay-banner">
                          <h3>PIPE</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="car-item text-center">
                      <div className="car-image">
                        <img className="img-fluid" src="https://res.cloudinary.com/dbfv0bfmw/image/upload/v1588023420/cat-08.jpg" alt="" />
                        <div className="overlay-banner">
                          <h3>BRAKES</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonial-4 testimonial-dark bg-1  page-section-ptb">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="section-title">
                  <span className="text-white">
                    What Our Happy Clients say about us
                  </span>
                  <h2 className="text-white">Our testimonial</h2>
                  <div className="separator" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div
                  className="owl-carousel owl-theme"
                  data-nav-dots="true"
                  data-items="1"
                  data-md-items="1"
                  data-sm-items="1"
                  data-xs-items="1"
                  data-space="30"
                >
                  <div className="item">
                    <div className="testimonial-block text-center">
                      <i className="fa fa-quote-left" />
                      <p className="text-white">
                        {" "}
                        You will begin to realize why this exercise is called
                        the Dickens Pattern with reference to the ghost showing
                        Scrooge some different futures as you notice that the
                        idea of this exercise.
                      </p>
                      <h6 className="text-red">John Doe</h6>
                    </div>
                  </div>
                  <div className="item">
                    <div className="testimonial-block text-center">
                      <i className="fa fa-quote-left" />
                      <p className="text-white">
                        {" "}
                        You will begin to realize why this exercise is called
                        the Dickens Pattern with reference to the ghost showing
                        Scrooge some different futures as you notice that the
                        idea of this exercise.
                      </p>
                      <h6 className="text-red">Michael Bean</h6>
                    </div>
                  </div>
                  <div className="item">
                    <div className="testimonial-block text-center">
                      <i className="fa fa-quote-left" />
                      <p className="text-white">
                        {" "}
                        You will begin to realize why this exercise is called
                        the Dickens Pattern with reference to the ghost showing
                        Scrooge some different futures as you notice that the
                        idea of this exercise.
                      </p>
                      <h6 className="text-red">Mellissa Doe</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="our-service white-bg page-section-ptb">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="section-title">
                  <span>This is what we do and we do it perfectly</span>
                  <h2>our services</h2>
                  <div className="separator" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="feature-box-2">
                  <div className="icon">
                    <i className="glyph-icon flaticon-car" />
                  </div>
                  <div className="content">
                    <h5>SUPER FAST </h5>
                    <p>
                      Leap lorem Ipsum is simply dummy text the printin k a
                      galley of type and bled it to make a type specimenbook.
                      but also the into.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="feature-box-2">
                  <div className="icon">
                    <i className="glyph-icon flaticon-wallet" />
                  </div>
                  <div className="content">
                    <h5>AFFORDABLE</h5>
                    <p>
                      Also lorem Ipsum is simply dummy text the printin k a
                      galley of type and bled it to make a type specimenbook.
                      but the leap into.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="feature-box-2">
                  <div className="icon">
                    <i className="glyph-icon flaticon-gas-station" />
                  </div>
                  <div className="content">
                    <h5>OIL CHANGES </h5>
                    <p>
                      Lorem Ipsum is simply dummy text the printin k a galley of
                      type and bled it to make a type specimenbook. but also the
                      leap into.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="feature-box-2">
                  <div className="icon">
                    <i className="glyph-icon flaticon-air-conditioning" />
                  </div>
                  <div className="content">
                    <h5>AIR conditioning</h5>
                    <p>
                      {" "}
                      Specimenbook lorem Ipsum is simply dummy text the printin
                      k a galley of type and bled it to make a type. but also
                      the leap into.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="feature-box-2">
                  <div className="icon">
                    <i className="glyph-icon flaticon-gearstick" />
                  </div>
                  <div className="content">
                    <h5>transmission</h5>
                    <p>
                      Printin lorem Ipsum is simply dummy text the k a galley of
                      type and bled it to make a type specimenbook. but also the
                      leap into.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="feature-box-2">
                  <div className="icon">
                    <i className="glyph-icon flaticon-key" />
                  </div>
                  <div className="content">
                    <h5>DEALERSHIP</h5>
                    <p>
                      Type lorem Ipsum is simply dummy text the printin k a
                      galley of and bled it to make a type specimenbook. but
                      also the leap into.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="counter counter-style-2 bg-red bg-1 bg-overlay-red-90 page-section-ptb">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 item">
                <div className="counter-block text-md-left text-center">
                  <div className="separator" />
                  <div className="info">
                    <h6 className="text-white">Vehicles In Stock</h6>
                    <i className="glyph-icon flaticon-beetle" />
                    <b
                      className="timer text-white"
                      data-to="561"
                      data-speed="10000"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 item">
                <div className="counter-block  text-md-left text-center">
                  <div className="separator" />
                  <div className="info">
                    <h6 className="text-white">Dealer Reviews</h6>
                    <i className="glyph-icon flaticon-interface" />
                    <b
                      className="timer text-white"
                      data-to="856"
                      data-speed="10000"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 item">
                <div className="counter-block  text-md-left text-center">
                  <div className="separator" />
                  <div className="info">
                    <h6 className="text-white">Happy Customer</h6>
                    <i className="glyph-icon flaticon-circle" />
                    <b
                      className="timer text-white"
                      data-to="789"
                      data-speed="10000"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 item">
                <div className="counter-block  text-md-left text-center">
                  <div className="separator" />
                  <div className="info">
                    <h6 className="text-white">Awards</h6>
                    <i className="glyph-icon flaticon-cup" />
                    <b
                      className="timer text-white"
                      data-to="356"
                      data-speed="10000"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user,
    parts: state.search.parts,
    isMobile: state.isMobile,
    eBayResults: state.search.ebay.parts,
    car: state.car,
    searchTerm: state.search.searchTerm,
    hx: state.search.hx,
    termSelected: state.search.termSelected,
    searchErrors: state.search.searchErrors,
    models: state.search.models
  };
};

const mapDispatchToProps = dispatch => ({
  submitSearch: (vin, kw) => dispatch(vinSearch(vin, kw)),
  submitEbaySearch: terms => dispatch(ebaySearch(terms)),
  decodeVin: v => dispatch(decodeVinNumber(v)),
  updateSearch: str => dispatch(updateSearchTerm(str)),
  updateCarInfo: (a, v) => dispatch(updateCar(a, v)),
  clearErrors: () => dispatch(clearSearchErrors()),
  getModels: (mkId, yr) => dispatch(getCarModels(mkId, yr))
});

export const LandingPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPageComponent);

