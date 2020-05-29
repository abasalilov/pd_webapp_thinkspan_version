/* eslint-disable import/prefer-default-export */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable max-classes-per-file */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-string-refs */
import React, { Suspense } from "react";
import { FormGroup, Form, FormGroupTitle, Button, Input, Radio } from "@mobiscroll/react";
import { connect } from "react-redux";
import { ebaySearch } from "../../actions";
import { PartListItem, Loader } from "../../components";
import "./test.css";

class ListItem extends React.Component {
  render() {
    return <li data-icon={this.props.item.icon}>{this.props.item.text}</li>;
  }
}

class TestPageComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [
        {
          id: 1,
          text: "Wifi",
          icon: "connection"
        },
        {
          id: 2,
          text: "Location",
          icon: "location"
        },
        {
          id: 3,
          text: "Sound",
          icon: "volume-medium"
        },
        {
          id: 4,
          text: "Rotation",
          icon: "fa-rotate-left"
        },
        {
          id: 5,
          text: "Bluetooth",
          icon: "ion-bluetooth"
        },
        {
          id: 6,
          text: "Settings",
          icon: "cogs"
        },
        {
          id: 7,
          text: "Reading",
          icon: "user4"
        },
        {
          id: 8,
          text: "Data",
          icon: "download"
        },
        {
          id: 9,
          text: "Eye comfort",
          icon: "eye"
        },
        {
          id: 10,
          text: "Screenshot",
          icon: "mobile"
        },
        {
          id: 11,
          text: "Airplane Mode",
          icon: "airplane"
        },
        {
          id: 12,
          text: "Alarm",
          icon: "alarm2"
        },
        {
          id: 13,
          text: "Messages",
          icon: "material-message"
        },
        {
          id: 14,
          text: "Weather",
          icon: "meteo-weather4"
        },
        {
          id: 15,
          text: "Camera",
          icon: "camera"
        },
        {
          id: 16,
          text: "Edit",
          icon: "material-photo-size-select-large"
        }
      ]
    };
  }

  async componentDidMount() {
    // const one = await this.props.submitEbaySearch(
    //   "2007 Toyota Solara Oil Filter"
    // );
  }

  showPopup = () => {
    this.refs.Popup.instance.show();
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
    this.refs.scrollable.instance.hide();
  };

  showScrollable = () => {
    this.refs.scrollable.instance.show();
  };

  render() {
    const parts = [];
    return (
      <div>
        <Loader />
        <Form>
          <FormGroup>
            <FormGroupTitle>
              Without return value
            </FormGroupTitle>
            <div className="mbsc-btn-group-block">
              <Button onClick={this.showPopup}>
                Show Popup
              </Button>
            </div>
          </FormGroup>
          <Suspense fallback={<Loader />}>
            {parts.map(part => (
              <PartListItem {...part} />
            ))}
          </Suspense>
          <FormGroup>
            <FormGroupTitle>
              With return value
            </FormGroupTitle>
            <Input
              onClick={this.showList}
              value={this.state.checked}
              placeholder="Please Select..."
              readOnly
            >
              Update
            </Input>
          </FormGroup>
          <FormGroup>
            <FormGroupTitle>
              With scrollable content
            </FormGroupTitle>
            <div className="mbsc-btn-group-block">
              <Button onClick={this.showScrollable}>
                Show Popup
              </Button>
            </div>
          </FormGroup>

            <FormGroup inset>
              <p>
                Some updates are available for you. 
                {' '}
                <br />
                {' '}
                When would you like
                to install them?
              </p>
            </FormGroup>
            <FormGroup inset>
              <Radio
                name="update"
                value="Right now"
                checked={this.state.radio === "Right now"}
                onChange={this.myRadioChanged}
              >
                Right now
              </Radio>
              <Radio
                name="update"
                value="Later on today"
                checked={this.state.radio === "Later on today"}
                onChange={this.myRadioChanged}
              >
                Later on today
              </Radio>
              <Radio
                name="update"
                value="Remind me tomorrow"
                checked={this.state.radio === "Remind me tomorrow"}
                onChange={this.myRadioChanged}
              >
                Remind me tomorrow
              </Radio>
            </FormGroup>
          </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    parts: state.search.parts,
    isMobile: state.mobile,
    eBayResults: state.search.ebay.parts
  };
};

const mapDispatchToProps = dispatch => ({
  submitEbaySearch: terms => dispatch(ebaySearch(terms))
});

export const TestPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TestPageComponent);
