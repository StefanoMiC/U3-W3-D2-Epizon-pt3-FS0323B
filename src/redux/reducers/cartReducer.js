import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions";

const initialState = {
  content: []
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // qui dentro ci inseriremo i vari casi, per i diversi "type" con cui l'action arriverà in momenti diversi dopo una "dispatch"

    case ADD_TO_CART:
      return {
        ...state,
        content: [...state.content, action.payload]
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        content: state.content.filter((_, i) => i !== action.payload)
      };

    default:
      return state;
  }
};

export default cartReducer;
