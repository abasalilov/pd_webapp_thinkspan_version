/* eslint-disable import/prefer-default-export */
/* eslint-disable no-restricted-syntax */
import axios from "axios";

const confirmValue = arg => (typeof arg !== "undefined");

const genRecallURL = (modelyear, make, model) =>
  `https://one.nhtsa.gov/webapi/api/Recalls/vehicle/modelyear/${modelyear}/make/${make}/model/${model}?format=json`;

const baseURL = [
  "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/",
  "?format=json"
];

const makeVinReq = url =>
  axios.create({
    timeout: 10000,
    method: "get",
    url: url.replace(/\s/g, "")
  });


  const makeRecallReq = url =>
    axios.create({
      timeout: 10000,
      method: "POST",
      url: url.replace(/\s/g, "")
    });


const sortData = data => {
  const nonEmptyData = {};
  const vars = ["Series", "Trim", "Model Year", "Model", "Manufacturer Name", "Body Class"];
  data.map((attr) => {
    const { Variable } = attr;
    if(vars.indexOf(Variable) === -1) {
      // continue;
    } else {
      nonEmptyData[Variable] = attr.Value;
    }
  })
  nonEmptyData.results = true;
  return nonEmptyData;
};

async function decode(vin) {
  if (vin === undefined || vin.length < 1 || vin === null) {
    return { results: false };
  }
  const url = baseURL[0] + vin + baseURL[1];
  const vinReq = makeVinReq(url);
  try {
    const vinResponse = await vinReq();
    const sortedVinResponse = sortData(vinResponse.data.Results);
    const { Model } = sortedVinResponse;
    if (
      confirmValue(Model) &&
      confirmValue(sortedVinResponse["Manufacturer Name"]) &&
      confirmValue(sortedVinResponse["Model Year"])
    ) { 
      const makeIdx = sortedVinResponse["Manufacturer Name"].indexOf(` `);
      const make = sortedVinResponse["Manufacturer Name"].slice(0, makeIdx);
      sortedVinResponse.make = make;
      const data = {
        year: sortedVinResponse["Model Year"],
        make,
        model: Model
      };

      const recall = await axios.post("https://partsdetect-api-test.herokuapp.com/recall", data)
      if (recall.data > 0) {
        sortedVinResponse.hasRecall = true;
        sortedVinResponse.recallDetails = recall.data.Results;
      } else {
        sortedVinResponse.hasRecall = false;
      }
    }
    return sortedVinResponse;
  } catch (e) {
    console.log("Error in the request", e);
    return e;
  }
}

export const decodeVin = decode;
