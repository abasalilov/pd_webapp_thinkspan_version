/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React, {createRef} from "react";
import Autosuggest from "react-autosuggest";
import {Input} from "@mobiscroll/react";
import { connect } from "react-redux";
import { updateSearchTerm } from '../../actions'
import { carParts } from "../../ref";

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toUpperCase();
  const inputLength = inputValue.length;
  const sugg = inputLength === 0
    ? []
    : carParts.filter(lang => lang.name.slice(0, inputLength) === inputValue);

  return sugg.slice(0, 9)
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion =>( 
  <div className="searchLi" data-icon="line-settings"> 
    {suggestion.name}
  </div>
)

class SmartSearchComponent extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: "",
      suggestions: []
    };
  }

  onChange = (event, {newValue}) => {
    this.setState({
      value: newValue
    });
    this.props.updateSearch(newValue)
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    // const { active } = this.props;
    // const suggestions = active ? getSuggestions(value) : []
    const suggestions =  getSuggestions(value);

    this.setState({
      suggestions
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  selectSuggestion = (a, b) => {
    this.props.updateSearch(b.suggestion.name)
  };

  render() {
    const { value, suggestions } = this.state;
    const { middle } = this.props;
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      value,
      onChange: this.onChange
    };
    // Finally, render it!
    const clName = middle
      ? "react-autosuggest__container_middle"
      : "react-autosuggest__container";

    return (
      <Autosuggest
        theme={{ container: clName }}
        suggestions={suggestions}
        id={middle ? "middleAuto" : "topAuto"}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        focusInputOnSuggestionClick={false}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={this.selectSuggestion}
        renderInputComponent={props => {
          return (
            <Input
              labelStyle="floating"
              inputStyle="outline"
              type="text"
              {...props}
              style={{
                backgroundColor: middle ? "#FFFFFF" : "#DDDDDD"
              }}
            >
              {`${middle ? "Enter part" : "Search for part, brand, etc."}`}
            </Input>
          );
        }}
      />
    );
  }
}


const mapStateToProps = state => {
  return {
    isMobile: state.mobile,
    car: state.car,
    modal: state.modal,
    search: state.search.searchTerm
  };
};

const mapDispatchToProps = dispatch => ({
  updateSearch: searchTerm => dispatch(updateSearchTerm(searchTerm))
});

 const SmartSearchConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SmartSearchComponent);

export const SmartSearch = React.forwardRef((props, ref) => <SmartSearchConnected innerRef={ref} {...props} />);