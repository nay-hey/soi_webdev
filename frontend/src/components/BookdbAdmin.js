//displays book data
//can see entire book list in a table, add new books, delete books, search for book using keywords and edit
import React, { useEffect, useState}  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Dropdown, DropdownButton, Image } from 'react-bootstrap';
import axios from 'axios';
import './AdminPage.css';
import { Tooltip } from 'bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';

const Bookdb = () => {

  //connects to books db and retrieves all the data to display on book overview
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  //sets new book data on book-add
  const [newBookData, setNewBookData] = useState({
    title: '',
    description: '',
    author: '',
    genre: '',
    department: 'Computer Science',
    count: 0,
    vendor: '',
    vendor_id: 0,
    publisher: '',
    publisher_id: 0,
    imageUrl: ''
  });

  // Function to handle form submission (adding a new book)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/books', newBookData);
      setNewBookData({
        title: '',
        description: '',
        author: '',
        genre: '',
        department: 'Computer Science',
        count: 0,
        vendor: '',
        vendor_id: 0,
        publisher: '',
        publisher_id: 0,
        imageUrl: ''
      });
      fetchBooks(); // Refresh books list after adding
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };
  
  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBookData({ ...newBookData, [name]: value });
  };


  // Function to handle deleting a book by ID
  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      console.log('Book deleted');
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };


  // Function to handle searching books based on category and input
  const [profile, setProfile] = useState({
    _id: '',
    title: '',
    description: '',
    author: '',
    genre: '',
    department: '',
    count: 0,
    vendor: '',
    vendor_id: 0,
    publisher: '',
    publisher_id: 0,
    imageUrl: ''
  });

  const [searchInput, setSearchInput] = useState('');
  
  const [searchCategory, setSearchCategory] = useState('title');
  const handleSearch = async () => {
    console.log('Book search');
    try {
      const response = await axios.get(`http://localhost:5000/api/books/search?category=${searchCategory}&keyword=${searchInput}`);
      setProfile(response.data);
    } catch (error) {
      console.error('Error searching for book:', error);
    } finally {
    }
  };
  
    //to edit book data
  const [profileItem, setProfileItem] = useState(profile);  
  const handleEditBookDetails = async (e) => {
    e.preventDefault();
    try {
      const updatedProfileItem = {
        ...profileItem,
        title: e.target.elements.title.value,
        author: e.target.elements.author.value,
        description: e.target.elements.description.value,
        department: e.target.elements.department.value,
        vendor: e.target.elements.vendor.value,
        vendor_id: e.target.elements.vendor_id.value,
        publisher: e.target.elements.publisher.value,
        publisher_id: e.target.elements.publisher_id.value,
        count: e.target.elements.count.value,
        genre: e.target.elements.genre.value,
        _id: profile[0]._id,
        imageUrl: e.target.elements.imageUrl.value,
        // Add other fields similarly
      };
      // Example fetch request to update book details
      const response = await fetch(`http://localhost:5000/api/books/${updatedProfileItem._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfileItem),
      });

      if (!response.ok) {
        throw new Error('Failed to update book details');
      }

      console.log('Book details updated successfully');

      // Update state with updatedProfileItem

      setProfile(updatedProfileItem);
      
      fetchBooks(); // Refresh books list after adding
      // Optionally handle success, e.g., show a success message
    } catch (error) {
      console.error('Error updating book details:', error);
      // Optionally handle error, e.g., show an error message to the user
    }
  };

 

  
  //search feature for table  
  const [searchTerm, setSearchTerm] = useState('');
  // Function to handle search term change
  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
  };
   //paginate feature
   const [currentPage, setCurrentPage] = useState(1);
   const [entriesPerPage, setEntriesPerPage] = useState(5);
   // Filter books based on search term
   const filteredBooks = books.filter(book => {
   return Object.values(book).some(value =>
     String(value).toLowerCase().includes(searchTerm.toLowerCase())
   );
 });
 
   const indexOfLastEntry = currentPage * entriesPerPage;
   const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
   const currentEntries = filteredBooks.slice(indexOfFirstEntry, indexOfLastEntry);
 
   // Change page
   const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // manages sidebar toggle
   useEffect(() => {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        const tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => {
          return new Tooltip(tooltipTriggerEl);
        });
      }, []);
  
  // State to manage sidebar toggle
  const [isSidebarToggled, setIsSidebarToggled] = useState(false);

  // Effect to add event listener for the toggle button
  useEffect(() => {
    const toggleSidebar = () => {
      setIsSidebarToggled(prevState => !prevState);
    };

    const toggleButton = document.querySelector('.toggle-sidebar-btn');
    if (toggleButton) {
      toggleButton.addEventListener('click', toggleSidebar);
    }

    // Cleanup function to remove the event listener
    return () => {
      if (toggleButton) {
        toggleButton.removeEventListener('click', toggleSidebar);
      }
    };
  }, []);

  // Effect to add or remove 'toggle-sidebar' class on the body element
  useEffect(() => {
    if (isSidebarToggled) {
      document.body.classList.add('toggle-sidebar');
    } else {
      document.body.classList.remove('toggle-sidebar');
    }
  }, [isSidebarToggled]);
  useEffect(() => {
    // Sticky header on scroll
    const selectHeader = document.querySelector('#header');

    const handleScroll = () => {
      if (selectHeader) {
        window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
      }
    };

    document.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <section id="admin">
        <header id="header" className="header fixed-top d-flex align-items-center">
          <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
            <div className="logo d-flex align-items-center">
              <img src="/static/logo.svg.png" alt="IIT Dharwad Logo" />
              <h1>IIT Dharwad</h1>
            </div>
          </div>
        
          <nav id="navbar" className="navbar">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/AboutUs/team">Library Committee</a></li>
              <li><a href="asklib.html">Ask a Librarian</a></li>
              <li><a href="/AboutUs">About</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </nav>
          
          <nav className="header-nav ms-auto">
            <ul className="d-flex align-items-center list-unstyled m-0">
              <li className="nav-item dropdown">
                <DropdownButton
                  menuAlign="right"
                  title={
                    <span className="nav-link nav-profile d-flex align-items-center pe-0">
                      <Image
                      src="/static/adminpage/profile.png"
                      alt="Profile"
                      className="rounded-circle me-2"
                      />
                      <span className="d-none d-md-block">
                      User
                      </span>
                    </span>
                  }
                  id="dropdown-profile"
                >
                  <Dropdown.Header>
                    <h6>User</h6>
                  </Dropdown.Header>
                  <Dropdown.Divider />
                  <Dropdown.Item>
                    <Link className="dropdown-item d-flex align-items-center" to="/AdminPage/profile">
                      <i className="bi bi-person"></i>
                      <span>My Profile</span>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>
                    <Link className="dropdown-item d-flex align-items-center" to="/AdminPage/studentprofile">
                      <i className="bi bi-gear"></i>
                      <span>Account Settings</span>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>
                    <Link className="dropdown-item d-flex align-items-center" to="/Login">
                      <i className="bi bi-box-arrow-right"></i>
                      <span>Sign Out</span>
                    </Link>
                  </Dropdown.Item>
                </DropdownButton>
              </li>
            </ul>
          </nav>
          <i className="bi bi-list toggle-sidebar-btn"></i>
        </header>
          <aside id="sidebar" className="sidebar">
            <ul className="sidebar-nav" id="sidebar-nav">
              <li className="nav-item">
                  <Link className="nav-link collapsed" to="/AdminPage">
                  <i className="bi bi-grid"></i>
                  <span>Home</span>
                  </Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link collapsed" to="/AdminPage/studentdb">
                  <i className="bi bi-layout-text-window-reverse"></i><span>Student Database</span>
                  </Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link " to="/AdminPage/bookdb">
                  <i className="bi bi-book"></i><span>Book Database</span>
                  </Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link collapsed" to="/AdminPage/circulationmanagement">
                  <i className="bi bi-nut-fill"></i><span>Circulation Management</span>
                  </Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link collapsed" to="/AdminPage/reminder">
                  <i className="bi bi-alarm-fill"></i><span>Reminder</span>
                  </Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link collapsed" to="/AdminPage/studentprofile">
                  <i className="bi bi-person"></i>
                  <span>Profile Edit</span>
                  </Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link collapsed" to="/AdminPage/notification">
                  <i className="bi bi-envelope"></i>
                  <span>Notification</span>
                  </Link>
              </li>
            </ul>
          </aside>
        
        <main id="main" className="main">

            <div className="pagetitle">
            <h1>Data Tables</h1>
              <nav>
                  <ol className="breadcrumb">
                  <li className="breadcrumb-item"  style={{ color: "#ccc" }}><Link style={{ color: "#ccc" }}  to="/AdminPage">Home</Link></li>
                  <li className="breadcrumb-item active"  style={{ color: "#ccc" }}>Book Database</li>
                  </ol>
              </nav>
            </div>

            <section className="section">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body pt-3">
                      <ul className="nav nav-tabs nav-tabs-bordered">

                        <li className="nav-item">
                        <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Book Data</button>
                        </li>

                        <li className="nav-item">
                        <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Add New Book</button>
                        </li>

                        <li className="nav-item">
                        <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-settings">Delete Book</button>
                        </li>

                        <li className="nav-item">
                        <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-search">Search Book Details</button>
                        </li>

                      </ul>
                      
                      <div className="tab-content pt-2">
                        <div className="tab-pane fade show active profile-overview" id="profile-overview">
                          <h6>Books Data</h6>
                          <div className="search-container">
                            <input
                              type="text"
                              placeholder="Search by title ..."
                              value={searchTerm}
                              onChange={handleSearchChange}
                            />
                            <select
                              className="form-control"
                              value={entriesPerPage}
                              onChange={(e) => setEntriesPerPage(parseInt(e.target.value))}
                            >
                              <option value="5">5 entries per page</option>
                              <option value="10">10 entries per page</option>
                              <option value={filteredBooks.length}>All entries</option>
                            </select>
                          </div>
                          <table className="table table-bordered table-hover">
                            <thead className="thead-dark">
                              <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Genre</th>
                                <th>Department</th>
                                <th>Count</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentEntries.map((book, index) => (
                                <tr key={book._id}>
                                  <td>{index + 1}</td>
                                  <td>{book.title}</td>
                                  <td>{book.author}</td>
                                  <td>{book.genre}</td>
                                  <td>{book.department}</td>
                                  <td>{book.count}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <div>
                            <nav aria-label="Page navigation example">
                              <ul className="pagination">
                                {Array.from({ length: Math.ceil(filteredBooks.length / entriesPerPage) }, (_, index) => (
                                  <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</button>
                                  </li>
                                ))}
                              </ul>
                            </nav>
                          </div>
                        </div>

                        <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
                          <form onSubmit={handleSubmit}>
                            <div className="row mb-3">
                              <label htmlFor="title" className="form-label">
                                Title
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={newBookData.title}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="description" className="form-label">
                                Description
                              </label>
                              <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                value={newBookData.description}
                                onChange={handleChange}
                              ></textarea>
                            </div>
                            <div className="mb-3">
                              <label htmlFor="author" className="form-label">
                                Authors
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="author"
                                name="author"
                                value={newBookData.author}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="genre" className="form-label">
                                Genre
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="genre"
                                name="genre"
                                value={newBookData.genre}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="department" className="form-label">
                                Department
                              </label>
                              <select
                                className="form-select"
                                id="department"
                                name="department"
                                value={newBookData.department}
                                onChange={handleChange}
                              >
                                <option value="Computer Science">
                                  Computer Science
                                </option>
                                <option value="Mechanical Engineering">
                                  Mechanical Engineering
                                </option>
                                <option value="Electrical Engineering">
                                  Electrical Engineering
                                </option>
                              </select>
                            </div>
                            <div className="mb-3">
                              <label htmlFor="count" className="form-label">
                                Count
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="count"
                                name="count"
                                value={newBookData.count}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="vendor" className="form-label">
                                Vendor
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="vendor"
                                name="vendor"
                                value={newBookData.vendor}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="vendor_id" className="form-label">
                                Vendor ID
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="vendor_id"
                                name="vendor_id"
                                value={newBookData.vendor_id}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="publisher" className="form-label">
                                Publisher
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="publisher"
                                name="publisher"
                                value={newBookData.publisher}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="publisher_id" className="form-label">
                                Publisher ID
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="publisher_id"
                                name="publisher_id"
                                value={newBookData.publisher_id}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="imageUrl" className="form-label">
                                Book Image Path
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="imageUrl"
                                name="imageUrl"
                                value={newBookData.imageUrl}
                                onChange={handleChange}
                              />
                            </div>
                            <button type="submit" className="btn btn-primary">Add Book</button>
                          </form>
                        </div>
                      
                        <div className="tab-pane fade pt-3" id="profile-settings">
                          <h6>Edit/Delete Books</h6>
                          <div className="search-container">
                            <input
                              type="text"
                              placeholder="Search by title ..."
                              value={searchTerm}
                              onChange={handleSearchChange}
                            />
                            <select
                              className="form-control"
                              value={entriesPerPage}
                              onChange={(e) => setEntriesPerPage(parseInt(e.target.value))}
                            >
                              <option value="5">5 entries per page</option>
                              <option value="10">10 entries per page</option>
                              <option value={filteredBooks.length}>All entries</option>
                            </select>
                          </div>
                          <table className="table table-bordered table-hover">
                            <thead className="thead-dark">
                              <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Genre</th>
                                <th>Department</th>
                                <th>Count</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentEntries.map((book, index) => (
                                <tr key={book._id}>
                                  <td>{index + 1}</td>
                                  <td>{book.title}</td>
                                  <td>{book.author}</td>
                                  <td>{book.genre}</td>
                                  <td>{book.department}</td>
                                  <td>{book.count}</td>
                                  <td>
                                  <button className="btn btn-danger" onClick={() => handleDeleteBook(book._id)}>Delete</button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <div>
                            <nav aria-label="Page navigation example">
                              <ul className="pagination">
                                {Array.from({ length: Math.ceil(filteredBooks.length / entriesPerPage) }, (_, index) => (
                                  <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</button>
                                  </li>
                                ))}
                              </ul>
                            </nav>
                          </div>
                        </div>
                    
                        <div className="tab-pane fade pt-3" id="profile-search">
                          <h6>Book Details</h6>
                          <div className="container">
                            <div className="row gy-4 justify-content-center justify-content-lg-between">
                              <div className="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center">
                                
                                <div className="col-xl-4 profile-search">
                                  <div className="search-box">
                                    <select id="search-category-title" style={{ borderRight: '1px solid #654321' }} onChange={(e) => setSearchCategory(e.target.value)}>
                                      <option value="title">Title</option>
                                      <option value="description">Description</option>
                                      <option value="author">Author</option>
                                      <option value="genre">Genre</option>
                                      <option value="department">Department</option>
                                      <option value="vendor">Vendor</option>
                                      <option value="publisher">Publisher</option>
                                    </select>
                                    <input
                                      type="text"
                                      id="keyword-input"
                                      placeholder="Enter Keyword..."
                                      value={searchInput}
                                      onChange={(e) => setSearchInput(e.target.value)}
                                    />
                                    <button id="search-button" onClick={handleSearch}>Search</button>
                                  </div>
                                </div>
                    
                                <div className="d-flex">
                                </div>

                              </div>
                              <div className="col-lg-5 order-1 order-lg-2 hero-img">
                                  <img src="/static/adminpage/booksearch.png" className="img-fluid" alt="" />
                              </div>
                            </div>
                          </div>
                          
                          {profile.length > 0 ? (
                            <div className="row">
                              {profile.map((profileItem, index) => (
                                <React.Fragment key={profileItem._id}>
                                  <div className="col-xl-4">
                                    <div className="card">
                                      <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                                        <img src={profileItem.imageUrl} alt="Profile" />
                                        <h2>{profileItem.title}</h2>
                                        <h3>{profileItem.description}</h3>
                                        <FontAwesomeIcon
                                          icon={profileItem.liked ? faHeartSolid : faHeartRegular}
                                          color={profileItem.liked ? 'red' : 'grey'}
                                        />
                                        {profileItem.likes}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-xl-8">
                                    <div className="card">
                                      <div className="card-body pt-3">
                                        <ul className="nav nav-tabs nav-tabs-bordered">
                                          <li className="nav-item">
                                            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#book-overview">Details</button>
                                          </li>
                                          <li className="nav-item">
                                            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#book-edit">Edit</button>
                                          </li>
                                          <li className="nav-item">
                                            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#book-comments">Comments</button>
                                          </li>
                                        </ul>
                                        <div className="tab-content pt-2">
                                          <div className="tab-pane fade show active profile-overview" id="book-overview">
                                            <h5 className="card-title">Book Details</h5>
                                            <div className="row">
                                              <div className="col-lg-3 col-md-4 label">Title</div>
                                              <div className="col-lg-9 col-md-8">{profileItem.title}</div>
                                            </div>
                                            <div className="row">
                                              <div className="col-lg-3 col-md-4 label">Description</div>
                                              <div className="col-lg-9 col-md-8">{profileItem.description}</div>
                                            </div>
                                            <div className="row">
                                              <div className="col-lg-3 col-md-4 label">Author</div>
                                              <div className="col-lg-9 col-md-8">{profileItem.author}</div>
                                            </div>
                                            <div className="row">
                                              <div className="col-lg-3 col-md-4 label">Genre</div>
                                              <div className="col-lg-9 col-md-8">{profileItem.genre}</div>
                                            </div>
                                            <div className="row">
                                              <div className="col-lg-3 col-md-4 label">Department</div>
                                              <div className="col-lg-9 col-md-8">{profileItem.department}</div>
                                            </div>
                                            <div className="row">
                                              <div className="col-lg-3 col-md-4 label">Count</div>
                                              <div className="col-lg-9 col-md-8">{profileItem.count}</div>
                                            </div>
                                            <div className="row">
                                              <div className="col-lg-3 col-md-4 label">Vendor</div>
                                              <div className="col-lg-9 col-md-8">{profileItem.vendor}</div>
                                            </div>
                                            <div className="row">
                                              <div className="col-lg-3 col-md-4 label">Vendor Id</div>
                                              <div className="col-lg-9 col-md-8">{profileItem.vendor_id}</div>
                                            </div>
                                            <div className="row">
                                              <div className="col-lg-3 col-md-4 label">Publisher</div>
                                              <div className="col-lg-9 col-md-8">{profileItem.publisher}</div>
                                            </div>
                                            <div className="row">
                                              <div className="col-lg-3 col-md-4 label">Publisher Id</div>
                                              <div className="col-lg-9 col-md-8">{profileItem.publisher_id}</div>
                                            </div>
                                            <div className="row">
                                              <div className="col-lg-3 col-md-4 label">Reservations</div>
                                              <div className="col-lg-9 col-md-8">
                                                {profileItem.reservedBy.length > 0 ? (
                                                  <ol>
                                                    {profileItem.reservedBy.map((userId, index) => (
                                                      <li key={index}>{userId}</li>
                                                    ))}
                                                  </ol>
                                                ) : (
                                                  <p>No reservations</p>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                        
                                          <div className="tab-pane fade profile-edit pt-3" id="book-edit">
                                            <form onSubmit={handleEditBookDetails}>
                                              <div className="row mb-3">
                                                <label htmlFor="profileImage" className="col-md-4 col-lg-3 col-form-label">
                                                  Book Image
                                                </label>
                                                <div className="col-md-8 col-lg-9">
                                                  <img src={profileItem.imageUrl} alt="Book" style={{ width: '100px', height: '150px' }} />
                                                  <div className="pt-2">
                                                    <div className="col-sm-10">
                                                      <input
                                                        type="text"
                                                        className="form-control"
                                                        id="imageUrl"
                                                        name="imageUrl"
                                                        defaultValue={profileItem.imageUrl}
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              
                                              <div className="row mb-3">
                                                <label htmlFor="inputText" className="col-sm-2 col-form-label">
                                                  Title
                                                </label>
                                                <div className="col-sm-10">
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    id="title"
                                                    name="title"
                                                    defaultValue={profileItem.title}
                                                  />
                                                </div>
                                              </div>
                                              
                                              <div className="row mb-3">
                                                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
                                                  Description
                                                </label>
                                                <div className="col-sm-10">
                                                  <textarea
                                                    className="form-control"
                                                    id="description"
                                                    name="description"
                                                    defaultValue={profileItem.description}
                                                  ></textarea>
                                                </div>
                                              </div>
                                              
                                              <div className="row mb-3">
                                                <label htmlFor="inputText" className="col-sm-2 col-form-label">
                                                  Author
                                                </label>
                                                <div className="col-sm-10">
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    id="author"
                                                    name="author"
                                                    defaultValue={profileItem.author}
                                                    />
                                                </div>
                                              </div>
                                              
                                              <div className="row mb-3">
                                                <label htmlFor="inputText" className="col-sm-2 col-form-label">
                                                  Genre
                                                </label>
                                                <div className="col-sm-10">
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    id="genre"
                                                    name="genre"
                                                    defaultValue={profileItem.genre}
                                                    />
                                                </div>
                                              </div>
                                              
                                              <div className="row mb-3">
                                                <label htmlFor="inputText" className="col-sm-2 col-form-label">
                                                  Department
                                                </label>
                                                <div className="col-sm-10">
                                                  <select
                                                    className="form-select"
                                                    id="department"
                                                    name="department"
                                                    defaultValue={profileItem.department}
                                                  >
                                                    <option value="Computer Science">Computer Science</option>
                                                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                                                    <option value="Electrical Engineering">Electrical Engineering</option>
                                                    <option value="Mathematics and Computing">Mathematics and Computing</option>
                                                    <option value="Civil Engineering">Civil Engineering</option>
                                                    <option value="Chemical Engineering">Chemical Engineering</option>
                                                  </select>
                                                </div>
                                              </div>
                                              
                                              <div className="row mb-3">
                                                <label htmlFor="inputNumber" className="col-sm-2 col-form-label">
                                                  Count
                                                </label>
                                                <div className="col-sm-10">
                                                  <input
                                                    type="number"
                                                    className="form-control"
                                                    id="count"
                                                    name="count"
                                                    defaultValue={profileItem.count}
                                                    />
                                                </div>
                                              </div>
                                              
                                              <div className="row mb-3">
                                                <label htmlFor="inputText" className="col-sm-2 col-form-label">
                                                  Vendor
                                                </label>
                                                <div className="col-sm-10">
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    id="vendor"
                                                    name="vendor"
                                                    defaultValue={profileItem.vendor}
                                                    />
                                                </div>
                                              </div>
                                              
                                              <div className="row mb-3">
                                                <label htmlFor="inputNumber" className="col-sm-2 col-form-label">
                                                  Vendor Id
                                                </label>
                                                <div className="col-sm-10">
                                                  <input
                                                    type="number"
                                                    className="form-control"
                                                    id="vendor_id"
                                                    name="vendor_id"
                                                    defaultValue={profileItem.vendor_id}
                                                    />
                                                </div>
                                              </div>
                                              
                                              <div className="row mb-3">
                                                <label htmlFor="inputText" className="col-sm-2 col-form-label">
                                                  Publisher
                                                </label>
                                                <div className="col-sm-10">
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    id="publisher"
                                                    name="publisher"
                                                    defaultValue={profileItem.publisher}
                                                    />
                                                </div>
                                              </div>
                                              
                                              <div className="row mb-3">
                                                <label htmlFor="inputNumber" className="col-sm-2 col-form-label">
                                                  Publisher Id
                                                </label>
                                                <div className="col-sm-10">
                                                  <input
                                                    type="number"
                                                    className="form-control"
                                                    id="publisher_id"
                                                    name="publisher_id"
                                                    defaultValue={profileItem.publisher_id}
                                                  />
                                                </div>
                                              </div>
                                              
                                              <button type="submit" className="btn btn-primary">
                                                Save Changes
                                              </button>
                                            </form>
                                          </div>
                                          <div class="tab-pane fade pt-3" id="book-comments">
                                          <h5 className="card-title">Comments:</h5>
                                            {profile.map((profileItem, index) => (
                                              <div key={index} className="mb-2">
                                                {profileItem.comments.map((comment, commentIndex) => (
                                                  <div className="comment d-flex alert border-dark alert-dismissible fade show"  key={commentIndex}>
                                                  <div className="flex-shrink-0">
                                                    <div className="avatar avatar-sm rounded-circle">
                                                      <img className="avatar-img" src="/static/adminpage/profile.png" alt=""  />
                                                    </div>
                                                  </div>
                                                  <div className="flex-shrink-1 ms-2 ms-sm-3">
                                                    <div className="comment-meta d-flex">
                                                      <h6 className="me-2">{comment.userRoll}</h6>
                                                      <span className="text-muted">{comment.timestamp}</span>
                                                    </div>
                                                    <div className="comment-body">
                                                    {comment.comment}
                                                    </div>
                                                  </div>
                                                </div>
                                                ))}
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </React.Fragment>
                              ))}
                            </div>
                          ) : (
                          <p>No book found</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

        </main>
        <footer id="footer" className="footer">

            <div className="container">
            <div className="row gy-3">
                <div className="col-lg-3 col-md-12 footer-info">
                <div className="logos">
                <img src="/static/logo.svg.png" alt="Logo" className="logo" />
                </div>
                <h3>Indian Institute of Technology Dharwad</h3>
                <p>Permanent Campus</p>
                <p>Chikkamalligawad Village</p>
                <p>Dharwad, Karnataka, India - 580007</p>
                <p>Email: <a href="mailto:pro@iitdh.ac.in">pro@iitdh.ac.in</a></p>
                </div>

                <div className="col-lg-2 col-6 footer-links">
                <h4>Academics</h4>
                    <ul>
                        <li><a href="#">Admissions</a></li>
                        <li><a href="#">Announcements</a></li>
                        <li><a href="#">Departments</a></li>
                        <li><a href="#">Programs</a></li>
                    </ul>
                </div>

                <div className="col-lg-2 col-6 footer-links">
                <h4>Research</h4>
                    <ul>
                        <li><a href="#">Consultancy Projects</a></li>
                        <li><a href="#">IRINS</a></li>
                        <li><a href="#">Project Vacancies</a></li>
                        <li><a href="#">Publications</a></li>
                        <li><a href="#">Sponsored Projects</a></li>
                    </ul>
                </div>

                <div className="col-lg-2 col-6 footer-links">
                <h4>People</h4>
                    <ul>
                        <li><a href="#">Administration</a></li>
                        <li><a href="#">Faculty</a></li>
                        <li><a href="#">Staff</a></li>
                        <li><a href="#">Students</a></li>
                    </ul>
                </div>

                <div className="col-lg-2 col-6 footer-links">
                <h4>Quick Access</h4>
                    <ul>
                    <li><a href="#">About Dharwad</a></li>
                        <li><a href="#">Bus Schedule</a></li>
                        <li><a href="#">Chief Vigilance Officer</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Counselling Center</a></li>
                        <li><a href="#">CSR</a></li>
                        <li><a href="#">Events</a></li>
                        <li><a href="#">Grievance Redressal</a></li>
                        <li><a href="#">ICC</a></li>
                        <li><a href="#">Intranet</a></li>
                        <li><a href="#">Old Website</a></li>
                        <li><a href="#">RTI</a></li>
                        <li><a href="#">SC-ST-OBC Liaison Cell</a></li>
                        <li><a href="#">Tenders</a></li>
                        <li><a href="#">Videos</a></li>
                        <li><a href="#">VPN Access</a></li>
                    </ul>
                </div>

            </div>
            </div>
            
            <div className="footer-legal">
            <div className="container">

                <div className="row justify-content-between">
                <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                    <div className="copyright">
                    © Copyright <strong><span>IIT Dharwad</span></strong>. All Rights Reserved
                    </div>

                    <div className="credits">
                    Designed by Pandas🐼
                    </div>

                </div>

                <div className="col-md-6">
                    <div className="social-links mb-3 mb-lg-0 text-center text-md-end">
                    <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                    <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                    <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                    <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
                    </div>

                </div>

                </div>

            </div>
            </div>
            </footer>
        </section>
    </div>
  );
};

export default Bookdb;
