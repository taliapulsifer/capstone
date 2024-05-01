import './App.css';
import React, {useState, useEffect} from 'react';
import BookForm from './components/BookForm';

function App() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [showAddBookForm, setShowAddBookForm] = useState(false);
  //const [title, setTitle] = useState('');
  //const [author, setAuthor] = useState('');

  async function fetchBooks() {
    try {
      const response = await fetch('http://localhost:5000/api/books');
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setBooks(data);
      console.log('');
    } catch (error) {
      console.error('Error fetching books: ', error);
    }
  }

  useEffect(() => {
    console.log('Fetching books...')
    fetchBooks();
  }, []);

  
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/books?search=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Failed to search books');
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error searching books: ', error);
    }
  }
  
  const handleBookClick = (book) => {
    console.log("Clicked book:", book);
    setSelectedBook(book);
  }

  const archiveBook = async (book) => {
    console.log("In archiveBook function...")

    try {
      console.log("Trying to archive book...")
      const response = await fetch('http://localhost:5000/api/archiveBooks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
      });
      console.log(response);
  
      if (!response.ok) {
        throw new Error('Failed to archive book');
      }
      
    } catch (error) {
      console.error('Error archiving book: ', error);
    }
  };

  const handleCheckout = async () => {
    const currentDate = new Date();
    const dueDate = new Date(currentDate);
    dueDate.setMonth(currentDate.getMonth() + 1);
  
    const formattedDueDate = dueDate.toISOString().split('T')[0];
  
    const updatedBook = { ...selectedBook, avail: false, due: formattedDueDate};
    try {
      const response = await fetch(`http://localhost:5000/api/books/${selectedBook._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBook),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update book availability');
      }
  
      const updatedBooks = books.map(book => (book._id === selectedBook._id ? updatedBook : book));
      setBooks(updatedBooks);
      setSelectedBook(updatedBook);
  
      await archiveBook(selectedBook);
    } catch (error) {
      console.log('Error updating book: ', error);
    }
  };
  

  const handleReturn = async () => {
    const updatedBook = {
      ...selectedBook,
      avail: true,
      due: null,
    };

    try {
      const response = await fetch(`http://localhost:5000/api/books/${selectedBook._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBook),
      });

      if(!response.ok){
        throw new Error('Failed to update book availability');
      }

      const updatedBooks = books.map(book => (book._id === selectedBook._id ? updatedBook : book));
      setBooks(updatedBooks);
      setSelectedBook(updatedBook);
      
    } catch (error) {
      console.log('Failed to update book: ', error);
    }
  }

  const handleSubmitBook = async (formData) => {
    try {
      // Add the 'avail' field with a value of true to the form data
      const bookData = { ...formData, avail: true };
  
      const response = await fetch('http://localhost:5000/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
      });
      
      // Refresh the book list after adding a new book
      fetchBooks();
    } catch (error) {
      console.error('Error adding book: ', error);
    }
  };
  

  return (
    <div>
      <h1>LIBRARY</h1>
      
      <nav className="navbar navbar-light bg-light">
        <form className="form-inline" onSubmit={handleSearch}>
          <input 
          className="form-control mr-sm-2 search-bar" 
          type="search" 
          placeholder="Search" 
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-outline-success my-2 my-sm-0 search-button" type="submit">
            Search
            </button>
        </form>
      </nav>
      {/* Create buttons to represent the books in the database */}
      <div className="button-container2">
        {books.map(book => (
          <button key={book._id} type="button" className="btn btn-light" onClick={() => handleBookClick(book)}>
            <div className="button-content">
            <img src={book.avail ? "/book.png" : "/unavailableBook.png"} alt='Book Icon'/>
              <span className="book-title">{book.title}</span>
            </div>
          </button>
        ))}
      </div>
      <div className='libraryCard'>
        {/* put the book information here. It should change based on what 
        book in the line of book buttons you press */}
        {selectedBook && (
          <div>
            <h2>{selectedBook.title}</h2>
            <p>{selectedBook.author}</p>
            <p>{selectedBook.who}</p>
            <p>{selectedBook.avail ? "Available" : "Not Available"}</p>
            {selectedBook.avail === false && <p>Due Date: {selectedBook.due}</p>}
          </div>
        )}
        <div className='check-out'>
          <button type="button" className="btn btn-primary check-out-button" onClick={handleCheckout}>
            Check Out
          </button>
          <button type="button" className="btn btn-primary return-button" onClick={handleReturn}>
            Return
          </button>
        </div>
      </div>
      <div>
        {/* Form should go here */}
        <BookForm onSubmit={handleSubmitBook} />
      </div>
      <div className='footer'>
      <a href="https://www.flaticon.com/free-icons/reading" title="reading icons">Reading icons created by Leremy - Flaticon</a>
      <a href="https://www.flaticon.com/free-icons/reading" title="reading icons">Reading icons created by Leremy - Flaticon</a>
      </div>
    </div>
    
  );
}

export default App;
