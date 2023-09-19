import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import CartIndicator from "./components/CartIndicator";
import BookStore from "./components/BookStore";
import Cart from "./components/Cart";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";

const App = () => {
  const adminName = useSelector(state => state.admin.content);
  const areBooksLoading = useSelector(state => state.books.isLoading);
  return (
    <BrowserRouter>
      <Container className="epizon-container">
        <Row>
          <Col sm={12}>
            <div className="text-center background-div shadow-sm">
              <Link to="/" className="text-decoration-none">
                <h1 className="display-2" style={{ letterSpacing: "-2.5px" }}>
                  Epizon Book Store{areBooksLoading && "..."}
                </h1>
                {adminName && <h2>Bentornato {adminName}</h2>}
              </Link>
            </div>
          </Col>
          <CartIndicator />
        </Row>
        <Routes>
          <Route path="/" element={<BookStore />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </Container>
    </BrowserRouter>
  );
};

export default App;
