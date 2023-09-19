import { useEffect } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import BookList from "./BookList";
import BookDetail from "./BookDetail";
import { useDispatch, useSelector } from "react-redux";
import { getBooksAction } from "../redux/actions";

const BookStore = () => {
  // const [books, setBooks] = useState([]);
  const dispatch = useDispatch();
  const booksHasError = useSelector(state => state.books.hasError);
  const booksErrorMessage = useSelector(state => state.books.errorMessage);

  useEffect(() => {
    // l'action creator getBooksAction ritorna una funzione e non un semplice oggetto come altri action creators più comuni
    // grazie a thunk la funzione ritornata può essere asincrona e quindi risolvere una chiamata api in un tempo indefinito
    // è importante chiamare la dispatch internamente all'action creator (nel nostro caso getBooksAction) per far sì che
    // la dispatch in questo contesto possa venire chiamata al momento giusto ed EFFETTIVAMENTE inviare la consueta ACTION al REDUCER

    // se la dispatch interna dovesse mancare, mancheremmo il momento esatto in cui arrivano i dati, e di conseguenza nessuna dispatch risulterà emessa

    dispatch(getBooksAction());
    // getBooksAction si sostituisce alla precedente getBooks() locale qui di seguito.
    // questo ci dà il vantaggio di poter chiamare getBooksAction da qualsiasi punto della nostra applicazione qualora
    // volessimo aggiornare la lista con i dati più recenti

    // getBooks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const getBooks = async () => {
  //   try {
  //     let resp = await fetch("https://striveschool-api.herokuapp.com/food-books");
  //     if (resp.ok) {
  //       let fetchedBooks = await resp.json();
  //       setBooks(fetchedBooks);
  //     } else {
  //       console.log("error");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <Row className="center-row">
      {booksHasError ? (
        <Col>
          <Alert variant="danger">{booksErrorMessage}</Alert>
        </Col>
      ) : (
        <>
          <Col lg={4}>
            {/* <BookList books={books} /> */}
            {/* booklist non ha più bisogno di props, leggerà direttamente lo stato globale */}
            <BookList />
          </Col>
          <Col lg={8}>
            <BookDetail />
          </Col>
        </>
      )}
    </Row>
  );
};

export default BookStore;
