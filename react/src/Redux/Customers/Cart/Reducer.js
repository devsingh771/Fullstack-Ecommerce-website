// The reducer handles state transitions based on the actions dispatched. It takes the current state and an action as arguments and returns a new state.import {
  import {
    ADD_ITEM_TO_CART_FAILURE,
    ADD_ITEM_TO_CART_REQUEST,
    ADD_ITEM_TO_CART_SUCCESS,
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
  

  // Concept: The initial state is the default state of the Redux store when the application first loads. It defines the shape and initial values of the state. Here, we have:

// cart: Holds the overall cart object (initially null).
// loading: Indicates whether an async operation is in progress (initially false).
// error: Holds any error messages (initially null).
// cartItems: An array to hold the items in the cart (initially empty).
const initialState = {
  cart: null,
  loading: false,
  error: null,
  cartItems: [],
};

// In Redux, a reducer is a pure function that takes the current state and an action as arguments and returns a new state. The reducer is the only place where state changes occur in a Redux application. Reducers listen for actions dispatched to the store and modify the state accordingly.



const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_ITEM_TO_CART_SUCCESS:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload.cartItems],
        loading: false,
        // state.cartItems: This is the current array of items in the cart.
// action.payload.cartItems: This is the new item (or items) that was added to the cart. It comes from the action payload, which typically contains the result of the API call.
      };
      // Purpose: The purpose of this case is to update the Redux store with the new state of the cart after an item has been successfully added. It ensures that the cartItems array is updated with the newly added item and the loading state is correctly reset.
      // User Interface: Once this state is updated, any components connected to this part of the Redux store will receive the updated cartItems and loading state. This allows the UI to reflect the new state of the cart, such as displaying the newly added item in the cart list and hiding the loading spinner.
      case ADD_ITEM_TO_CART_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CART_SUCCESS:
      return {
        ...state,
        cartItems: action.payload.cartItems,
        cart:action.payload,
        loading: false,
      };
    case GET_CART_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case REMOVE_CART_ITEM_REQUEST:
    case UPDATE_CART_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_CART_ITEM_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload
        ),
        loading: false,
      };
    
// state.cartItems: This represents the current array of items in the cart.
// action.payload: This is the ID of the item that was successfully removed from the cart. It is included in the action payload.
// state.cartItems.filter((item) => item.id !== action.payload): The filter method creates a new array excluding the item with the ID specified in action.payload.
// The filter method iterates over each item in the cartItems array.
// For each item, it checks if the item's ID is not equal to action.payload.
// Items that do not match the condition (i.e., their ID is not equal to the payload ID) are included in the new array
    case UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        loading: false,
      };
    case REMOVE_CART_ITEM_FAILURE:
    case UPDATE_CART_ITEM_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default cartReducer;



//learning purpose 
//Step-by-Step Explanation
// Function Declaration

// javascript
// Copy code
// const cartReducer = (state = initialState, action) => {
// const cartReducer: This declares a constant named cartReducer and assigns it a function.
// (state = initialState, action) => { ... }: This is an arrow function that takes two parameters:
// state: Represents the current state of the cart. If no state is provided (i.e., the state is undefined), it defaults to initialState.
// action: An object that describes what happened and might contain additional data (payload).
// Switch Statement

// javascript
// Copy code
// switch (action.type) {
// The switch statement evaluates the action.type to determine which case block to execute. Each case corresponds to a different action type that the reducer can handle.
// Default Case

// javascript
// Copy code
// default:
//   return state;
// The default case is executed if no matching case is found for the action.type.
// return state;: This returns the current state unchanged. It ensures that the state remains the same if the action type is not recognized.



// Spread Operator Overview
// The spread operator (...) allows you to spread the elements of an array or the properties of an object into a new array or object. In the context of Redux reducers, it helps to create a new object that includes all the properties of the current state, ensuring that the original state remains unchanged.