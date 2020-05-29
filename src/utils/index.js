/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
const key = "hell or high water";
const encryptor = require("simple-encryptor")(key);

export const isMobile = w => {
  if (typeof w === "undefined") {
    return false;
  }
  return w.outerWidth < 760;
};

export const isUndefined = o => {
  if (typeof o === "undefined") {
    return true;
  }
  return false;
};

const decrypt = str => {
  return encryptor.decrypt(str);
};

const encrypt = str => {
  return encryptor.encrypt(str);
};

export const getUserData = d => {
  const { name, email, providers, address1, address2, city, state, zip } = d;
  return { name, email, providers, address1, address2, city, state, zip };
};

export const getProviderData = c => {
  const { napaAuto, api } = c;
  const toEncrypt = JSON.stringify({ napaAuto, api });
  return encrypt(toEncrypt);
};

export const verifyRegistrationReqs = c => {
  return true;
}

export const parseAAItems = arr => {
  const aaItems = []
  for(let i = 0; i < arr.length; i++){
    arr[i].part.forEach((j) => {
      const part = {...j}
      part.URL = arr[i].URL;
      part.vendor = 'AA';
      aaItems.push(part);
    })
  }
  return aaItems;
};


export const sortTrimData = (trimData) => {
  const start = trimData.indexOf('{"Trims":') + 10;
  const cut = trimData.slice(start);
  const splitData = cut.split("},");
  const trimSpecs = []

  splitData.map(sd => {
    const a = sd.slice(1).split(",");
    const attrs = {};
    a.map(sub => {
      if(sub.indexOf("null") === -1){
      const centerCut = sub.indexOf(":");
      const k = sub.slice(0, centerCut).replace(/\W/g, '')
      const value = sub.slice(centerCut + 1, sub.lastIndexOf(`"`)).replace(/\W/g, '')
      attrs[k] = value;
      }
      return sub
    });
      trimSpecs.push(attrs)
  })
  return trimSpecs;
}

// thumbImgSrc,
//   price,
//   brandMfg,
//   itemName,
//   partNumber,
//   itemDescription,

const sortEbayData = (data, searchTerm) => {
  return data.itemSummaries.map(itemData => {
    const newItem = { ...itemData};
    newItem.hasCompatability = typeof itemData.compatibilityProperties !== "undefined";
    newItem.thumbImgSrc = itemData.image.imageUrl;
    newItem.price = itemData.price.value;
    newItem.itemName = itemData.title;
    newItem.itemDescription = itemData.title;
    newItem.partNumber = itemData.epid;
    newItem.seller = itemData.seller.username;
    newItem.vendor = "EBAY";
    newItem.quantity = 1;
    newItem.topCategory = data.topCategory;
    newItem.searchTerm = searchTerm;
    if (newItem.hasCompatability) {
      newItem.compatibility = itemData.compatibilityProperties;
    }
    newItem.isEbay = true;
    return newItem
  })
}


const sortNapaData = (data, searchTerm) => {
  const final = []
  const { napa } = data;
  const {parts = []} = napa;
  parts.map(itemData => {
    const newItem = { ...itemData };
    const hasQuantity = itemData.description.indexOf("Part Not Found") === -1;
    newItem.thumbImgSrc = itemData.imgFileItems[1];
    newItem.price = itemData.price;
    newItem.brandMfg = itemData.mfg;
    newItem.itemName = `${itemData.mfg} ${itemData.partNumber}`;
    newItem.itemDescription = `${hasQuantity ? "" : itemData.description}`;
    newItem.vendor = "NAPA";
    newItem.searchTerm = searchTerm;
    newItem.isNapa = true;
    newItem.quantity = 1;
    if (hasQuantity) {
      final.push(newItem)
    } 
  });
  return final;
}

export const sortParts = (data, searchTerm) => {
  const isNapa = typeof data.napa !== "undefined";
  if (data.isEbay) {
    return sortEbayData(data, searchTerm);
  }
  if(isNapa) {
    return sortNapaData(data, searchTerm);
  }
}