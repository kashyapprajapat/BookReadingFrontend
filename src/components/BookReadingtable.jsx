import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_BASE_URL;

const BookReadingtable = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const addBook = () => {
    navigate('/addbook');
  };

  const handleUpdate = (book) => {
    navigate('/updatebook', { state: { book } });
  };

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${API}/getallbooks`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setBooks(data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this book?"
      );
      if (confirmDelete) {
        const response = await fetch(`${API}/deletebook/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete book");
        }
        fetchBooks();
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>My Total Reading Book List</h1>
      <button
        style={{
          display: "block",
          margin: "0 auto",
          padding: "10px 20px",
          border: "1px solid blue",
          borderRadius: "10px",
          color: "blue",
          backgroundColor: "transparent",
          cursor: "pointer",
          transition: "background-color 0.3s, color 0.3s",
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "blue";
          e.target.style.color = "white";
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "transparent";
          e.target.style.color = "blue";
        }}
        onClick={addBook}
      >
        Add Book
      </button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6" fontWeight="bold">
                  BookID
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="bold">
                  BookName
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="bold">
                  BookAuthor
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="bold">
                  BookGenre
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="bold">
                  BookType
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="bold">
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.BOOKID}>
                <TableCell>{book.BOOKID}</TableCell>
                <TableCell>{book.BOOKNAME}</TableCell>
                <TableCell>{book.BOOKAUTHOR}</TableCell>
                <TableCell>{book.BOOKGENRE}</TableCell>
                <TableCell>{book.BOOKTYPE}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    style={{
                      color: "green",
                      backgroundColor: "white",
                      border: "1px solid green",
                      "&:hover": {
                        color: "white",
                        backgroundColor: "green",
                      },
                    }}
                    onClick={() => handleUpdate(book)}
                  >
                    Update
                  </Button>{" "}
                  <Button
                    variant="contained"
                    style={{
                      color: "red",
                      backgroundColor: "white",
                      border: "1px solid red",
                      "&:hover": {
                        color: "white",
                        backgroundColor: "red",
                      },
                    }}
                    onClick={() => handleDelete(book.BOOKID)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BookReadingtable;
