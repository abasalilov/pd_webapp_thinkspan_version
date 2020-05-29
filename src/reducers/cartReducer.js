/* eslint-disable max-len */
/* eslint-disable camelcase */
import {
  ADD_TO_CART,
  REMOVE_ITEM,
  SUB_QUANTITY,
  ADD_QUANTITY,
  ADD_SHIPPING,
  INIT_CART, 
  UPDATE_QTY
} from "../actions";

const initState = {
  items: [],
  addedItems: [
    {
    itemId:"v1|321293296952|0",title:"Toyota Lexus Scion Genuine OEM Oil Filter 04152-YZZA1 Set of Three",
    image:{imageUrl:"https://i.ebayimg.com/thumbs/images/g/q38AAOSw~l1Z9ZSZ/s-l225.jpg"},
    price:18.95,
    itemHref:"https://api.ebay.com/buy/browse/v1/item/v1|321293296952|0",
    seller:"turboflexautoparts",
    marketingPrice:{
      originalPrice:{value:"24.45", currency:"USD"},
      discountPercentage:"22",
      discountAmount:{value:"5.50",currency:"USD"}
    },
      condition:"New",
      conditionId:"1000",
      thumbnailImages:[{imageUrl:"https://i.ebayimg.com/00/s/ODk4WDE2MDA=/z/q38AAOSw~l1Z9ZSZ/$_0.JPG?set_id=8800005007"}],
      shippingOptions:[{shippingCostType:"FIXED",shippingCost:{value:"0.00",currency:"USD"}}],
      buyingOptions:["FIXED_PRICE"],
      epid:"656009142",
      itemWebUrl:"https://www.ebay.com/itm/Toyota-Lexus-Scion-Genuine-OEM-Oil-Filter-04152-YZZA1-Set-of-Three/321293296952?fits=Year%3A2007%7CModel%3ARAV4%7CMake%3AToyota&hash=item4ace92a538:g:q38AAOSw~l1Z9ZSZ",
      itemLocation:{postalCode:"913**",country:"US"},
      categories:[{categoryId:"33661"},{categoryId:"6000"},{categoryId:"6028"},{categoryId:"6030"},{categoryId:"33658"}],
      additionalImages:[{imageUrl:"https://galleryplus.ebayimg.com/ws/web/321293296952_2_0_1/225x225.jpg"},
      {imageUrl:"https://galleryplus.ebayimg.com/ws/web/321293296952_3_0_1/225x225.jpg"},
      {imageUrl:"https://galleryplus.ebayimg.com/ws/web/321293296952_4_0_1/225x225.jpg"},
      {imageUrl:"https://galleryplus.ebayimg.com/ws/web/321293296952_5_0_1/225x225.jpg"}],
      adultOnly:false,
      compatibilityProperties:[{"name":"Year","value":"2007"},{"name":"Make","value":"Toyota"},{"name":"Model","value":"RAV4"}],
      hasCompatability: true,
      thumbImgSrc:"https://i.ebayimg.com/thumbs/images/g/q38AAOSw~l1Z9ZSZ/s-l225.jpg",
      itemName:"Toyota Lexus Scion Genuine OEM Oil Filter 04152-YZZA1 Set of Three",
      itemDescription:"Toyota Lexus Scion Genuine OEM Oil Filter 04152-YZZA1 Set of Three",
      partNumber:"656009142",
      vendor:"EB","topCategory":{"Category":[{"CategoryID":"33661","CategoryLevel":5,"CategoryName":"Oil Filters","CategoryParentID":"33658","CategoryNamePath":"eBay Motors:Parts & Accessories:Car & Truck Parts:Filters:Oil Filters","CategoryIDPath":"6000:6028:6030:33658:33661","LeafCategory":true}]},"searchTerm":"2007 TOYOTA RAV4 Oil filter","compatibility":[{"name":"Year","value":"2007"},{"name":"Make","value":"Toyota"},{"name":"Model","value":"RAV4"}],
      isEbay:true}
  ],
  total: 18.95
};
export default (state = initState, action) => {
  // INSIDE HOME COMPONENT
  if(action.type === INIT_CART) {
    const startCart = {...state};
    startCart.items = action.payload.items;
    return startCart;
  }
  if (action.type === ADD_TO_CART) {
    const addedState = {...state};
    const addedItem = addedState.items.find(item => item.itemId === action.payload.item.itemId);
    // check if the action id exists in the addedItems
    const existed_item = addedState.addedItems.find(item => {
      return action.payload.item.itemId === item.itemId
    });

    if (existed_item) {
      addedItem.quantity += 1;
      return {
        ...addedState,
        total: addedState.total + addedItem.price
      };
    }
    addedItem.quantity = 1;
    // calculating the total
    const newTotal = addedState.total + Number(addedItem.price);

    return {
      ...addedState,
      addedItems: [...addedState.addedItems, addedItem],
      total: newTotal
    };
  }

  if (action.type === UPDATE_QTY) {
    const updateState = { ...state };
    // check if the action id exists in the addedItems
    const existed_item = updateState.addedItems.find(item => {
      return action.payload.id === item.itemId
    });
    if (existed_item) {
      existed_item.quantity = Number(action.payload.qty);
      return {
        ...updateState,
      };
    }
  }
  if (action.type === REMOVE_ITEM) {
    const removeState = { ...state };

    const itemToRemove = removeState.addedItems.find(item => action.payload.id === item.itemId);
    const new_items = removeState.addedItems.filter(item => action.payload.id !== item.itemId);
    // calculating the total
    const newTotal = removeState.total - itemToRemove.price * itemToRemove.quantity;
    return {
      ...removeState,
      addedItems: new_items,
      total: newTotal
    };
  }
  // INSIDE CART COMPONENT
  if (action.type === ADD_QUANTITY) {
    const addedItem = state.items.find(item => item.id === action.id);
    addedItem.quantity += 1;
    const newTotal = state.total + addedItem.price;
    return {
      ...state,
      total: newTotal
    };
  }
  if (action.type === SUB_QUANTITY) {
    const addedItem = state.items.find(item => item.id === action.id);
    // if the qt == 0 then it should be removed
    if (addedItem.quantity === 1) {
      const new_items = state.addedItems.filter(item => item.id !== action.id);
      const newTotal = state.total - addedItem.price;
      return {
        ...state,
        addedItems: new_items,
        total: newTotal
      };
    }

    addedItem.quantity -= 1;
    const newTotal = state.total - addedItem.price;
    return {
      ...state,
      total: newTotal
    };
  }

  if (action.type === ADD_SHIPPING) {
    return {
      ...state,
      total: state.total + 6
    };
  }

  if (action.type === "SUB_SHIPPING") {
    return {
      ...state,
      total: state.total - 6
    };
  }

  return state;
};
