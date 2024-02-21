import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookReadingtable from "./components/BookReadingtable.jsx";
import AddBookForm from "./components/AddBook.jsx";
import UpdateBook from "./components/UpdateBook.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookReadingtable />} />
        <Route path="/addbook" element={<AddBookForm />} />
        <Route path="/updatebook" element={<UpdateBook />} />
      </Routes>
    </Router>
  );
}

export default App;
