// qui definiamo la nostra funzione PURA che sarà il reducer principale
// il reducer prende lo STATO CORRENTE dell'applicazione nel momento in cui viene "risvegliato",
// prende anche l'ACTION che gli inviamo con una dispatch() (dal componente)

import { ADD_TO_CART, REMOVE_FROM_CART, SELECT_BOOK, SET_ADMIN, SET_USER } from "../actions";

// a quel punto prenderà l'ACTION en e leggerà il "type", con queste due informazioni (state, action) genererà il nuovo stato globale dell'applicazione

// da dove cominciare? da uno stato iniziale

const initialState = {
  cart: {
    content: []
  },
  bookSelected: {
    content: null
  },
  admin: { content: "" }, // inutilizzato, ci serve come esempio di proprietà esterna a cart che venga mantenuta anche dopo il cambio di stato
  user: { content: "" },
  isLoggedIn: false
};

// lo stato iniziale è quello che viene generato automaticamente ad ogni refresh del browser
// dovrà poi essere modificato in maniera IMMUTABLE

// il reducer è una funzione PURA e quindi non modificherà MAI i suoi parametri direttamente (state & action), li leggerà solamente
// e in base ad operazioni matematiche prevedibili, computerà il nuovo stato di ritorno della funzione stessa
const mainReducer = (state = initialState, action) => {
  // da questa funzione, IN OGNI CASO o SITUAZIONE, dovrà PER FORZA ritornare IL NUOVO STATO o quanto meno quello PRECEDENTE

  switch (action.type) {
    // qui dentro ci inseriremo i vari casi, per i diversi "type" con cui l'action arriverà in momenti diversi dopo una "dispatch"

    case ADD_TO_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          content: [...state.cart.content, action.payload]
          // Alternativa valida:
          // content: state.cart.content.concat()

          // da NON FARE ASSOLUTAMENTE
          // content: state.cart.content.push(action.payload)
          // questo non va fatto perché muterebbe l'array originario e lo sostituirebber per di più con un numero (la nuova length dell'array, ritornata dal push())
        }
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          content: state.cart.content.filter((_, i) => i !== action.payload)
          // Alternativa valida:
          //   content: [...state.cart.content.slice(0, action.payload), ...state.cart.content.slice(action.payload + 1)]
          //   content: state.cart.content.slice(0, action.payload).concat(state.cart.content.slice(action.payload + 1)

          // da NON FARE ASSOLUTAMENTE
          // content: state.cart.content.splice(action.payload, 1) // NON SI PUO' FARE!!! questo metodo muta l'array originario e ritorna un array di elementi rimossi
        }
      };

    case SELECT_BOOK:
      return {
        ...state,
        bookSelected: {
          ...state.bookSelected,
          content: action.payload
        }
      };
    case SET_ADMIN:
      return {
        ...state,
        admin: {
          ...state.admin,
          content: action.payload
        }
      };
    case SET_USER:
      return {
        ...state,
        user: {
          ...state.user,
          content: action.payload
        }
      };
    default:
      return state;
  }
};

export default mainReducer;
