/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React, { Component } from "react";
import {Select, Input, Dropdown} from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css"

export default class DDSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      value: 1
    };
  }

  componentDidMount() {
    const { data = [] } = this.props;
    if (data[0]){
      this.setState({ value: data[0].value });
    } else {
      this.setState({ value: `select option`, });
    }
  }

  render() {
    const { isMobile, data, onSelect, value, label, icon="line-settings", id } = this.props;
    const idLabel = typeof id === "undefined" ? label : id;
      return isMobile ? (
        <Select display="bubble" data={data} filter={true} id={idLabel} onSet={onSelect} width={400} placeholder="Please select">
          <Input inputStyle="box" placeholder="Please Select...">{label}</Input>
        </Select>
      ) : (
        <Dropdown label={label} onSelect={onSelect} icon={icon} id={idLabel} inputStyle="box" iconAlign="left" value={value} onChange={onSelect}>
          {data.map(d => (
            <option key={d.value} value={d.value}>{d.text}</option>
          ))}
        </Dropdown>
      );
    }
}

