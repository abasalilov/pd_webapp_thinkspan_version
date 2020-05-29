/* eslint-disable import/prefer-default-export */
import React from 'react';
import bigGear from "../../media/images/big-gear.png";
import smallGear from "../../media/images/small-gear.png";


export const Loader = () => (
  <div className="gears">
    <img src={bigGear} alt="gear" className="big" />
    <img src={smallGear} alt="gear" className="small" />
    <h1>Loading</h1>
  </div>
       );