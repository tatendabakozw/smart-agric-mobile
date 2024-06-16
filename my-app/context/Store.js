import React, { createContext, useReducer, useEffect } from "react";
import asyncstorage from "../utils/asyncstorage";

// Initial state
const initialState = {
  darkMode: false,
  ip_address: null,
  signed_in: true,
  search_query: "",
};

// Create context
export const Store = createContext();

// Reducer function
function reducer(state, action) {
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

// Store provider component
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load initial IP address from async storage
  useEffect(() => {
    const loadIpAddress = async () => {
      const storedIpAddress = await asyncstorage.getItem("ip_address");
      if (storedIpAddress) {
        dispatch({ type: "SETUP_IP", payload: storedIpAddress });
      }
    };
    loadIpAddress();
  }, []);

  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
