import axios from "axios";


import { API_BASE_URL } from "../../../config/api";
import {
    ADD_ITEM_TO_CART_REQUEST,
    ADD_ITEM_TO_CART_SUCCESS,
    ADD_ITEM_TO_CART_FAILURE,
  GET_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
} from "./ActionType";

export const addItemToCart = (reqData) => async (dispatch) => {
    console.log("req data ",reqData)
  try {
   
    dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
    // This line dispatches an action to indicate that the request to add an item to the cart has started.
    
    // API Call Configuration
    const config = {
      headers: {
        Authorization: `Bearer ${reqData.jwt}`,
        "Content-Type": "application/json",
        // Content-Type: This is an HTTP header used to indicate the media type of the resource. It tells the server what the data actually is, so that the server can correctly parse the incoming data.
      },
    };

    // API Call 
    // Makes an asynchronous PUT request to the API to add an item to the cart and waits for the response.
    const { data } = await axios.put(`${API_BASE_URL}/api/cart/add`, 
      // The await keyword pauses execution of the function until the promise is resolved, meaning that the function will wait for the PUT request to complete before continuing.
      reqData.data,
      config,
    );
    // const { data } = ...: This line uses destructuring assignment to extract the data property from the response object returned by axios.put. The data variable will contain the response data returned by the server.

console.log("add item to cart ",data)

// Dispatches an action to indicate that the item was successfully added to the cart, with the response data as the payload.
    dispatch({
      type:ADD_ITEM_TO_CART_SUCCESS,

// dispatch is typically a function provided by Redux (or similar state management libraries) that is used to send actions to the store.
// Actions are plain JavaScript objects that represent events or payloads of data that are sent to the store. They are the only source of information for the store
// type is a mandatory property in Redux actions. It indicates the type of action being performed.
// ADD_ITEM_TO_CART_SUCCESS is likely a constant (usually defined elsewhere in your code) that represents the action type dispatched when adding an item to the cart is successful. Action types are typically defined as strings, often stored in a central place to ensure consistency across the application.  
      payload: data,
      // The payload property can contain any data that needs to be passed along with the action. It could be the new state, server response data, or any other relevant information
    });
  } catch (error) {
    dispatch({
      type: ADD_ITEM_TO_CART_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    // If error.response exists and error.response.data.message exists, then payload is set to error.response.data.message. This assumes that the API call returned an error response with a specific error message.
  }
};
export const getCart = (jwt) => async (dispatch) => {
  try {
    dispatch({ type: GET_CART_REQUEST });
    const config = {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type":"application/json"
        },
      };
    const { data } = await axios.get(`${API_BASE_URL}/api/cart/`,config);
console.log("cart ",data)
    dispatch({
      type: GET_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CART_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeCartItem = (reqData) => async (dispatch) => {
    try {
      dispatch({ type: REMOVE_CART_ITEM_REQUEST });
      const config = {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
          "Content-Type":"application/json"
        },
      };
      await axios.delete(`${API_BASE_URL}/api/cart_items/${reqData.cartItemId}`,config);
  
      dispatch({
        type: REMOVE_CART_ITEM_SUCCESS,
        payload: reqData.cartItemId,
      });
    } catch (error) {
      dispatch({
        type: REMOVE_CART_ITEM_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const updateCartItem = (reqData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_CART_ITEM_REQUEST });
      const config = {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
          "Content-Type":"application/json"
        },
      };
      const { data } = await axios.put(
        `${API_BASE_URL}/api/cart_items/${reqData.cartItemId}`,
        reqData.data,config
      );
  console.log("udated cartitem ",data)
      dispatch({
        type: UPDATE_CART_ITEM_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_CART_ITEM_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  



  //learning purpose 

  // Why Action Types Are Necessary:

// Uniquely Identifying Actions:
// Action types provide a clear and unique identifier for each action that can be dispatched within your application. This helps in understanding and tracking what specific action is being triggered at any given time.

// Clear Intent and Documentation:
// By defining action types as constants (typically in a central place like a constants file), you document what actions are available in your application. This makes it easier for developers to understand what actions are supported and how they are used.

// Enforcing Consistency:
// Using action types ensures consistency across your application. Actions that are dispatched and handled by reducers need to match on the action type. This prevents errors where actions might be misinterpreted or handled incorrectly.

// Concepts Involved
// Redux: A state management library for JavaScript applications.
// Thunk Middleware: Allows writing action creators that return a function instead of an action. Used for handling asynchronous operations.
// Axios: A promise-based HTTP client for making requests to the backend API.
// Action Creators: Functions that create and return action objects.
// Reducers: Functions that specify how the application's state changes in response to actions.
// State Management: Centralized management of application state.