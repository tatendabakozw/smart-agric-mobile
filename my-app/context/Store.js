import { createContext, useReducer } from "react";
import asyncstorage from "../utils/asyncstorage";

const initialState = {
  darkMode: false,
  ip_address: asyncstorage.getItem("ip_address")
    ? asyncstorage.getItem("ip_address")
    : null,
  signed_in: true,
  search_query: "",
};

export const Store = createContext();

function reducer(state = { search_category: "" }, action) {
  switch (action.type) {
    case "DARK_MODE_ON":
      return { ...state, darkMode: true };
    case "DARK_MODE_OFF":
      return { ...state, darkMode: false };
    case "SETUP_IP":
      asyncstorage.setItem("ip_address", action.payload);
      return { ...state, ip_address: action.payload };
    case "USER_SIGNED_IN":
      return { ...state, signed_in: action.payload };
    case "USER_LOGOUT":
      asyncstorage.removeItem("ip_address");
      return { ...state, ip_address: null };
    case "SET_SEARCH_QUERY":
      return { ...state, search_query: action.payload };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
