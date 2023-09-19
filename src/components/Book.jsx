import { Badge, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectBookAction } from "../redux/actions";
import { FaShoppingBag } from "react-icons/fa";

const Book = ({ book }) => {
  const dispatch = useDispatch();
  const bookSelected = useSelector(state => state.bookSelected.content);
  const cart = useSelector(state => state.cart.content);

  return (
    <Card
      className={`border border-2 ${bookSelected?.id === book.id ? "border-primary mt-3" : "mt-3"}`}
      onClick={() => {
        // dispatch({ type: SELECT_BOOK, payload: book });
        dispatch(selectBookAction(book));
      }}
      style={{ cursor: "pointer" }}
    >
      <Card.Body className="d-flex">
        <img className="book-image" src={book.imageUrl} alt="book cover" />
        <div className="flex-grow-1">
          <Card.Text className="font-weight-bold">{book.title}</Card.Text>
          <div className="d-flex justify-content-between align-items-center">
            <Badge bg="primary">{book.price}€</Badge>
            {cart.findIndex(cartItem => cartItem.id === book.id) !== -1 && (
              <Badge bg="success">
                <FaShoppingBag />
              </Badge>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Book;
