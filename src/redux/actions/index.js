// qui dentro definiamo i TYPE come COSTANTI
export const ADD_TO_CART = "ADD_TO_CART";
// sbagliare l'import di una costante ci avvertirà a "compile-time" (in VSCode) che c'è un problema, in anticipo
// ci permette di evitare errori "silenziosi", che non produrrebbero un vero e proprio errore in console.
// riusciamo quindi così ad avere errori più "parlanti" che riescono a darci un indizio vero se un problema si presenta
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const SELECT_BOOK = "SELECT_BOOK";
export const SET_ADMIN = "SET_ADMIN";
export const SET_USER = "SET_USER";
export const GET_BOOKS = "GET_BOOKS";
export const GET_BOOKS_LOADING_ON = "GET_BOOKS_LOADING_ON";
export const GET_BOOKS_LOADING_OFF = "GET_BOOKS_LOADING_OFF";
export const GET_BOOKS_ERROR_ON = "GET_BOOKS_ERROR_ON";
export const GET_BOOKS_ERROR_OFF = "GET_BOOKS_ERROR_OFF";

// ACTION CREATORS — funzioni che tornano l'azione (oggetto)

// export const addToCartAction = (bookSelected) => {
//     return { type: ADD_TO_CART, payload: bookSelected }
// }

// export const addToCartAction = bookSelected => ({ type: ADD_TO_CART, payload: bookSelected });
export const removeFromCartAction = i => ({ type: REMOVE_FROM_CART, payload: i });
export const selectBookAction = book => ({ type: SELECT_BOOK, payload: book });
export const setAdminAction = str => ({ type: SET_ADMIN, payload: str });
export const setUserNameAction = str => ({ type: SET_USER, payload: str });

export const addToCartActionWithThunk = bookSelected => {
  return (dispatch, getState) => {
    const currentState = getState();
    const checkBookInCart = currentState.cart.content.findIndex(book => book.id === bookSelected.id);

    if (checkBookInCart === -1) {
      dispatch({ type: ADD_TO_CART, payload: bookSelected });
    } else {
      console.log("LIBRO GIA' PRESENTE NEL CARRELLO");
    }
  };
};

// grazie a redux-thunk, che è un middleware GIA' INTEGRATO nel nostro configure store di redux toolkit
// possiamo creare degli action creator che ritornino non solo una singola ACTION (oggetto JS)
// ma anche una funzione!

export const getBooksAction = () => {
  // la funzione RITORNATA dal nostro action creator è quella che possiamo rendere async
  return async (dispatch, getState) => {
    // come primo parametro ci viene regalata la funzione dispatch(), SEMPRE necessaria per l'invio di una action al reducer,
    // e per essere sincronizzati col momento effettivo in cui siamo pronti ad inviarla, dopo l'arrivo dei dati da una fetch asincrona

    // getState() è una funzione che, una volta chiamata, ritorna lo stato globale (oggetto)
    console.log("GET STATE", getState());
    try {
      dispatch({ type: GET_BOOKS_LOADING_ON });

      let resp = await fetch("https://striveschool-api.herokuapp.com/food-books");
      if (resp.ok) {
        let fetchedBooks = await resp.json();
        // a questo punto avremo aspettato la risoluzione della fetch e
        // potremo fare il dispatch di un'action con fetchedBooks come payload!
        dispatch({ type: GET_BOOKS, payload: fetchedBooks });
        dispatch({ type: GET_BOOKS_ERROR_OFF });
      } else {
        console.log("error");
        throw new Error("Errore nel reperimento dei dati 😰");
      }
    } catch (error) {
      dispatch({ type: GET_BOOKS_ERROR_ON, payload: error.message });
      console.log(error);
    } finally {
      dispatch({ type: GET_BOOKS_LOADING_OFF });
    }
  };
};
