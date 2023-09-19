import { useSelector } from "react-redux";
import Book from "./Book";
import { Badge, Card, Placeholder } from "react-bootstrap";

const BookList = () => {
  const books = useSelector(state => state.books.content);
  const isLoading = useSelector(state => state.books.isLoading);
  return (
    <div className="mb-3">
      {isLoading
        ? [...Array(3).keys()].map(num => (
            <Card className="mb-3" key={`placeholder-${num}`}>
              <div className="d-flex align-items-center p-3">
                <div style={{ width: "62px", height: "80px", backgroundColor: "lightgray" }}></div>
                <Card.Body>
                  <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={6} />
                  </Placeholder>
                  <Badge variant="primary" style={{ width: "54px", height: "21px" }}>
                    {"  "}
                  </Badge>
                </Card.Body>
              </div>
            </Card>
          ))
        : books.map(book => <Book key={book.id} book={book} />)}
    </div>
  );
};

export default BookList;
