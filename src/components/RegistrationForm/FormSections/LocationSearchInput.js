/* eslint-disable react/no-did-update-set-state */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

import {Input} from "@mobiscroll/react";

export default class LocationSearchInputComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: ""};
  }

  componentDidUpdate(prevProps){
    const { address1 } = prevProps
    if(this.props.address1 !== address1){
      this.setState({ address: this.props.address1});
    }
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    const that = this;
    geocodeByAddress(address)
      .then(results => {
        const { formatted_address } = results[0];
        this.props.onSelectAddress(formatted_address);
        return getLatLng(results[0]);
      })
      .then(() => that.setState(address))
      .catch(error => console.error("Error", error));
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Input
              {...getInputProps({
                placeholder: "Start typing address...",
                className: "location-search-input"
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}
