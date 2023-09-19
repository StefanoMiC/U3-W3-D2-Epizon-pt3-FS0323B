import { Col, Row, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction, addToCartActionWithThunk } from "../redux/actions";

const BookDetail = () => {
  const dispatch = useDispatch();
  // useDispatch() ritorna la nostra funzione dispatch() che vorremo utilizzare per inviare l'ACTION al reducer
  // di conseguenza avviare il processo di modifica dello Stato Globale
  const bookSelected = useSelector(state => state.bookSelected.content);
  const userName = useSelector(state => state.user.content);
  const areBooksLoading = useSelector(state => state.books.isLoading);
  const booksHasError = useSelector(state => state.books.hasError);

  return (
    <div className="mt-3 mb-4 mb-lg-0">
      {!areBooksLoading && !bookSelected && !booksHasError && (
        <Row>
          <Col sm={12}>
            <h3 className="display-6">👈Start by clicking on a book!</h3>
          </Col>
        </Row>
      )}

      {bookSelected && (
        <>
          <Row>
            <Col sm={12}>
              <h1 className="display-3" style={{ lineHeight: 1, marginTop: "-6px" }}>
                {bookSelected.title}
              </h1>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col sm={4}>
              <div className="mt-2">
                <img className="book-cover" src={bookSelected.imageUrl} alt="book selected" />
              </div>
            </Col>
            <Col sm={8}>
              <p className="lead">
                <span className="font-weight-bold">Description:</span>&nbsp;
                {bookSelected.description}
              </p>
              <div className="d-flex justify-content-between mt-5">
                <p className="mb-2">
                  <span className="font-weight-bold">Price:</span>&nbsp;
                  <span className="display-6 text-primary">{bookSelected.price}€</span>
                </p>
                {userName ? (
                  <Button
                    variant="primary"
                    onClick={() => {
                      // dispatch({ type: ADD_TO_CART, payload: bookSelected });
                      // dispatch(addToCartAction(bookSelected));
                      dispatch(addToCartActionWithThunk(bookSelected));
                    }}
                  >
                    ADD TO CART
                  </Button>
                ) : (
                  <Alert variant="info">Loggati prima di procedere</Alert>
                )}
              </div>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default BookDetail;
