/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/prefer-default-export */
import React from 'react';


export const AddRemove = (props) => {
  return (
    <div>
      <div className="addtocart" onClick={props.add}>
        <div className="cart mbsc-float-ic-closed mbsc-ic mbsc-ic-cart" />
        <div className="cartplus mbsc-float-ic-closed mbsc-ic mbsc-ic-plus" />
      </div>
      <div className="addtocart" onClick={props.remove}>
        <div className="cart mbsc-float-ic-closed mbsc-ic mbsc-ic-cart" />
        <div className="cartplus mbsc-float-ic-closed mbsc-ic mbsc-ic-minus" />
      </div>
    </div>
       )
  }