/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable max-classes-per-file */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/prefer-default-export */
import React from 'react'
import { Input, Listview } from '@mobiscroll/react'
import "@mobiscroll/react/dist/css/mobiscroll.min.css"

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


class ListItem extends React.Component {
  render() {
    return (
      <div className="searchLi" data-icon="line-settings">
        {this.props.item.text}
      </div>
    );
  }
}


const CarFoundSearchSection = props => {
  const { car, searchTerm, hideListView, isMobile, options, showMakes,searchErrors, ...rest } = props;
    if (car.confirmed){
      const splitName = isMobile ? "mobileSplitBase" : "splitBase";
      const canName = isMobile ? "mobileCan" : "can";
      const searchPartName = isMobile
        ? "col-lg-2 mobilePartSearch"
        : "col-lg-6 partSearch";
      const make = showMakes ? car.make : car.make.slice(0,car.make.indexOf(` `))
      const fGroup = isMobile ? "mobile-form-group" : "form-group";
      const vehicleProfile = `Vehicle Found: ${car.year} ${make} ${car.model}`;
      const hasErrors = searchErrors.length > 0;
      const land = isMobile ? 'mobile_lander' : 'lander';

    return (
      <div className="col-md-12 section-title-middle">
        <h6 className={`text-white ${land}`} id="vehicle-found">
          {vehicleProfile}
        </h6>
        <div className={fGroup}>
          <div className={splitName}>
            <div className="midSearch">
              <div className="col-lg-8 fullW">
                <BasicInput
                  {...rest}
                  placeholder="Enter Part Name"
                  value={searchTerm}
                  onChange={props.handleInputChange}
                />
              </div>
              {!hideListView && (
                <div className="middleListResultContainer">
                  <Listview
                    enhance
                    striped
                    swipe={false}
                    className="middleListResult"
                    itemType={ListItem}
                    data={options}
                    onItemTap={props.onItemTap}
                    onClick={props.onItemTap}
                  />
                </div>
              )}
            </div>
            <div className={searchPartName}>
              <div className="text-center">
                <button
                  className="button btn-block red btnMobile"
                  type="button"
                  onClick={props.handleSearch}
                  id="searchbtn"
                >
                  Search Part
                </button>
              </div>
              {!isMobile && (
              <div className="col-xs-2">
                <span
                  onClick={props.handleClearSearchTerm}
                  className={`mbsc-ic mbsc-ic-remove ${canName}`}
                />
              </div>
                )}
            </div>
          </div>
          {hasErrors && (
          <div>
            <div className="errorContainer">
              {searchErrors.map(err => (
                <div className="searchError">
                  <strong>{`${err}`}</strong>
                </div>
                  ))}
              <button
                className="clearErrBtn button btn-block red"
                type="button"
                onClick={props.clearErrors}
              >
                Clear Errors
              </button>
            </div>
          </div>
            )}
        </div>
      </div>
    );
    }
    return null;
}

export default CarFoundSearchSection