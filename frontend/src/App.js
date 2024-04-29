import './App.css';
import React, {useState, useEffect} from 'react';

function App() {

  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch('/books');
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        console.log(data);
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books: ', error);
      }
    }
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
      <div className='button-container'>
      <button type="button" className="btn btn-primary book-button">
        <img src="/book.png" alt='Book Icon'/>
        <span className='book-title'>Book Title</span>
        </button>
      {/* Create buttons to represent the books in the database */}
      <div className="button-container2">
        {books.map(book => (
          <button key={book._id} type="button" className="btn btn-light">
            {book.title}
          </button>
        ))}
        </div>
      </div>
      <div className='libraryCard'>
        {/* put the book information here. It should change based on what 
        book in the line of book buttons you press */}
        <div className='check-out'>
          <button type="button" className="btn btn-primary check-out-button">
            Check Out
            </button>
        </div>
      </div>
      <div className='footer'>
      <a href="https://www.flaticon.com/free-icons/reading" title="reading icons">Reading icons created by Leremy - Flaticon</a>
      </div>
    </div>
    
  );
}

export default App;

//Colors:
//DCBE87 - Light Brown
//AD6A34 - Medium Brown
//4E1D04 - Dark Brown
//EF5D58 - Bright Pink
//517174 - Light Teal
//325453 - Dark Teal