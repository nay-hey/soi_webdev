import React, { useEffect, useRef, useState}  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './AdminPage.css';
import 'simple-datatables/dist/style.css';
import { Tooltip } from 'bootstrap';
import { DataTable } from 'simple-datatables'; // Import DataTable from simple-datatables
import { Link } from 'react-router-dom';

const Bookdb = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchCategory, setSearchCategory] = useState('title'); // Default category
    const [profile, setProfile] = useState(null);
    const handleSearch = () => {
      // Assuming you have a list of profiles
      const profiles = [
        {
            "title": "Introduction to Algorithms",
            "description": "Comprehensive guide to algorithms with detailed explanations.",
            "author": "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
            "genre": "Algorithms",
            "department": "Computer Science",
            "count": 9,
            "vendor": "Indian Book Depot",
            "vendor_id": 1003,
            "publisher": "Lpringer Nature",
            "publisher_id": 234567,
            "imageUrl": "static/book_img/Introduction to Algorithms.png"
          },
          {
            "title": "Artificial Intelligence: A Modern Approach",
            "description": "Fundamental concepts and techniques in AI, covering a wide range of topics.",
            "author": "Stuart Russell, Peter Norvig",
            "genre": "Artificial Intelligence",
            "department": "Computer Science",
            "count": 12,
            "vendor": "Kitab Mahal",
            "vendor_id": 1004,
            "publisher": "KarperMollins Publishers",
            "publisher_id": 345678,
            "imageUrl": "static/book_img/Artificial Intelligence.png"
          },
          {
            "title": "Clean Code: A Handbook of Agile Software Craftsmanship",
            "description": "Principles and best practices for writing clean, maintainable code.",
            "author": "Robert C. Martin",
            "genre": "Software Engineering",
            "department": "Computer Science",
            "count": 13,
            "vendor": "Indian Book Depot",
            "vendor_id": 1003,
            "publisher": "Mengage Learning",
            "publisher_id": 901234,
            "imageUrl": "static/book_img/Clean Code.png"
          },
          {
            "title": "Design Patterns: Elements of Reusable Object-Oriented Software",
            "description": "Classic book on design patterns for software development.",
            "author": "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
            "genre": "Software Engineering",
            "department": "Computer Science",
            "count": 8,
            "vendor": "Amazon India",
            "vendor_id": 1006,
            "publisher": "Lpringer Nature",
            "publisher_id": 234567,
            "imageUrl": "static/book_img/Design Patterns.png"
          },
          {
            "title": "The Pragmatic Programmer: Your Journey to Mastery",
            "description": "Practical advice for becoming a better programmer.",
            "author": "Andrew Hunt, David Thomas",
            "genre": "Software Engineering",
            "department": "Computer Science",
            "count": 10,
            "vendor": "Kitab Mahal",
            "vendor_id": 1004,
            "publisher": "JarperCollins Publishers",
            "publisher_id": 123456,
            "imageUrl": "static/book_img/The Pragmatic Programmer.png"
          },
          {
            "title": "Code Complete: A Practical Handbook of Software Construction",
            "description": "Detailed guide to software construction best practices.",
            "author": "Steve McConnell",
            "genre": "Software Engineering",
            "department": "Computer Science",
            "count": 12,
            "vendor": "World Book Store",
            "vendor_id": 1007,
            "publisher": "Rohn Wiley & Sons",
            "publisher_id": 456789,
            "imageUrl": "static/book_img/Code Complete.png"
          },
          {
            "title": "Introduction to the Theory of Computation",
            "description": "Comprehensive text on computational theory and complexity.",
            "author": "Michael Sipser",
            "genre": "Computational Theory",
            "department": "Computer Science",
            "count": 13,
            "vendor": "Amazon India",
            "vendor_id": 1006,
            "publisher": "Dambridge University Press",
            "publisher_id": 890123,
            "imageUrl": "static/book_img/Introduction to the Theory of Computation.png"
          },
          {
            "title": "The Art of Computer Programming",
            "description": "Seminal work covering many aspects of computer science.",
            "author": "Donald E. Knuth",
            "genre": "Algorithms",
            "department": "Computer Science",
            "count": 10,
            "vendor": "Indian Book Depot",
            "vendor_id": 1003,
            "publisher": "JarperCollins Publishers",
            "publisher_id": 123456,
            "imageUrl": "static/book_img/The Art of Computer Programming.png"
          },
          {
            "title": "Structure and Interpretation of Computer Programs",
            "description": "Foundational text on computer science principles and programming.",
            "author": "Harold Abelson, Gerald Jay Sussman",
            "genre": "Programming",
            "department": "Computer Science",
            "count": 10,
            "vendor": "Amazon India",
            "vendor_id": 1006,
            "publisher": "Bengage Learning",
            "publisher_id": 876543,
            "imageUrl": "static/book_img/Structure and Interpretation of Computer Programs.png"
          },
          {
            "title": "Compilers: Principles, Techniques, and Tools",
            "description": "Authoritative guide on compiler construction.",
            "author": "Alfred V. Aho, Monica S. Lam, Ravi Sethi, Jeffrey D. Ullman",
            "genre": "Compilers",
            "department": "Computer Science",
            "count": 13,
            "vendor": "Amazon India",
            "vendor_id": 1006,
            "publisher": "Mengage Learning",
            "publisher_id": 901234,
            "imageUrl": "static/book_img/Compilers.png"
          }
      ];
      
  
      const foundProfile = profiles.find(p => p[searchCategory].toLowerCase().includes(searchInput.toLowerCase()));
      setProfile(foundProfile);
    };
    const [books, setBooks] = useState([
        { title: 'Introduction to Algorithms', author: 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein', genre: 'Algorithms', department: 'Computer Science', count: '9' },
        { title: 'Introduction to Algorithms', author: 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein', genre: 'Algorithms', department: 'Computer Science', count: '9' },
        // ... other book data
      ]);
    
      const [newBook, setNewBook] = useState({ title: '', author: '', genre: '', department: '', count: '' });
    
      const handleAddBook = () => {
        setBooks([...books, newBook]);
        setNewBook({ title: '', author: '', genre: '', department: '', count: '' });
      };
    
      const handleDeleteBook = (index) => {
        setBooks(books.filter((_, i) => i !== index));
      };
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook({ ...newBook, [name]: value });
      };
    useEffect(() => {    
        // Initialize Datatables
        const datatables = document.querySelectorAll('.datatable');
        datatables.forEach(datatable => {
          new DataTable(datatable, {
            perPageSelect: [5, 10, 15, ["All", -1]],
            columns: [
              {
                select: 2,
                sortSequence: ["desc", "asc"]
              },
              {
                select: 3,
                sortSequence: ["desc"]
              },
              {
                select: 4,
                cellClass: "green",
                headerClass: "red"
              }
            ]
          });
        });
      }, []);
    
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
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
            <div className="logo d-flex align-items-center">
              <img src="static/logo.svg.png" alt="IIT Dharwad Logo" />
              <h1>IIT Dharwad</h1>
            </div>

        </div>
        

        <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">

            <li className="nav-item dropdown">

            <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                <i className="bi bi-bell"></i>
                <span className="badge bg-primary badge-number">4</span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                <li className="dropdown-header">
                You have 4 new notifications
                <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                </li>
                <li>
                <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                <i className="bi bi-exclamation-circle text-warning"></i>
                <div>
                    <h4>Lorem Ipsum</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>30 min. ago</p>
                </div>
                </li>

                <li>
                <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                <i className="bi bi-x-circle text-danger"></i>
                <div>
                    <h4>Atque rerum nesciunt</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>1 hr. ago</p>
                </div>
                </li>

                <li>
                <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                <i className="bi bi-check-circle text-success"></i>
                <div>
                    <h4>Sit rerum fuga</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>2 hrs. ago</p>
                </div>
                </li>

                <li>
                <hr className="dropdown-divider"/>
                </li>

                <li className="notification-item">
                <i className="bi bi-info-circle text-primary"></i>
                <div>
                    <h4>Dicta reprehenderit</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>4 hrs. ago</p>
                </div>
                </li>

                <li>
                <hr className="dropdown-divider"/>
                </li>
                <li className="dropdown-footer">
                <a href="#">Show all notifications</a>
                </li>

            </ul>
            </li>
            <li className="nav-item dropdown">

            <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                <i className="bi bi-chat-left-text"></i>
                <span className="badge bg-success badge-number">3</span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                <li className="dropdown-header">
                You have 3 new messages
                <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                </li>
                <li>
                <hr className="dropdown-divider"/>
                </li>

                <li className="message-item">
                <a href="#">
                    <img src="assets/img/messages-1.jpg" alt="" className="rounded-circle" />
                    <div>
                    <h4>Maria Hudson</h4>
                    <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                    <p>4 hrs. ago</p>
                    </div>
                </a>
                </li>
                <li>
                <hr className="dropdown-divider"/>
                </li>

                <li className="message-item">
                <a href="#">
                    <img src="assets/img/messages-2.jpg" alt="" className="rounded-circle" />
                    <div>
                    <h4>Anna Nelson</h4>
                    <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                    <p>6 hrs. ago</p>
                    </div>
                </a>
                </li>
                <li>
                <hr className="dropdown-divider"/>
                </li>

                <li className="message-item">
                <a href="#">
                    <img src="assets/img/messages-3.jpg" alt="" className="rounded-circle" />
                    <div>
                    <h4>David Muldon</h4>
                    <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                    <p>8 hrs. ago</p>
                    </div>
                </a>
                </li>
                <li>
                <hr className="dropdown-divider" />
                </li>

                <li className="dropdown-footer">
                <a href="#">Show all messages</a>
                </li>

            </ul>

            </li>

            <li className="nav-item dropdown pe-3">

            <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                <img src="static/adminpage/profile.png" alt="Profile" className="rounded-circle" />
                <span className="d-none d-md-block dropdown-toggle ps-2">K. Anderson</span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                <h6>Kevin Anderson</h6>
                <span>Admin</span>
                </li>
                <li>
                <hr className="dropdown-divider"/>
                </li>

                <li>
                <Link className="dropdown-item d-flex align-items-center" to="/profile">
                    <i className="bi bi-person"></i>
                    <span>My Profile</span>
                </Link>
                </li>
                <li>
                <hr className="dropdown-divider"/>
                </li>

                <li>
                <Link className="dropdown-item d-flex align-items-center" to="/profile">
                    <i className="bi bi-gear"></i>
                    <span>Account Settings</span>
                </Link>
                </li>
                <li>
                <hr className="dropdown-divider"/>
                </li>

                <li>
                <a className="dropdown-item d-flex align-items-center" href="#">
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Sign Out</span>
                </a>
                </li>

            </ul>
            </li>
        </ul>
        </nav>
           <i className="bi bi-list toggle-sidebar-btn"></i>
        </header>
        <aside id="sidebar" className="sidebar">

            <ul className="sidebar-nav" id="sidebar-nav">

            <li className="nav-item">
                <Link className="nav-link " to="/">
                <i className="bi bi-grid"></i>
                <span>Home</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link collapsed" to="/studentdb">
                <i className="bi bi-layout-text-window-reverse"></i><span>Student Database</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link collapsed" to="/bookdb">
                <i className="bi bi-book"></i><span>Book Database</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link collapsed" to="/circulationmanagement">
                <i className="bi bi-nut-fill"></i><span>Circulation Management</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link collapsed" to="/reminder">
                <i className="bi bi-alarm-fill"></i><span>Reminder</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link collapsed" to="/studentprofile">
                <i className="bi bi-person"></i>
                <span>Profile Edit</span>
                </Link>
            </li>
            </ul>

            </aside>
        <main id="main" className="main">

            <div className="pagetitle">
            <h1>Data Tables</h1>
            <nav>
                <ol className="breadcrumb">
                <li className="breadcrumb-item"  style={{ color: "#ccc" }}><Link style={{ color: "#ccc" }}  to="/">Home</Link></li>
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
                    <table className="table datatable">
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>Department</th>
                            <th>Count</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Introduction to Algorithms</td>
                            <td>Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein</td>
                            <td>Algorithms</td>
                            <td>Computer Science</td>
                            <td>9</td>
                        </tr>
                        <tr>
                            <td>Introduction to Algorithms</td>
                            <td>Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein</td>
                            <td>Algorithms</td>
                            <td>Computer Science</td>
                            <td>9</td>
                        </tr>
                        <tr>
                            <td>Introduction to Algorithms</td>
                            <td>Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein</td>
                            <td>Algorithms</td>
                            <td>Computer Science</td>
                            <td>9</td>
                        </tr>
                        <tr>
                            <td>Introduction to Algorithms</td>
                            <td>Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein</td>
                            <td>Algorithms</td>
                            <td>Computer Science</td>
                            <td>9</td>
                        </tr>
                        <tr>
                            <td>Introduction to Algorithms</td>
                            <td>Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein</td>
                            <td>Algorithms</td>
                            <td>Computer Science</td>
                            <td>9</td>
                        </tr>
                        <tr>
                            <td>Introduction to Algorithms</td>
                            <td>Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein</td>
                            <td>Algorithms</td>
                            <td>Computer Science</td>
                            <td>9</td>
                        </tr>
                        <tr>
                            <td>Introduction to Algorithms</td>
                            <td>Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein</td>
                            <td>Algorithms</td>
                            <td>Computer Science</td>
                            <td>9</td>
                        </tr>
                        <tr>
                            <td>Introduction to Algorithms</td>
                            <td>Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein</td>
                            <td>Algorithms</td>
                            <td>Computer Science</td>
                            <td>9</td>
                        </tr>
                        <tr>
                            <td>Introduction to Algorithms</td>
                            <td>Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein</td>
                            <td>Algorithms</td>
                            <td>Computer Science</td>
                            <td>9</td>
                        </tr>
                        <tr>
                            <td>Introduction to Algorithms</td>
                            <td>Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein</td>
                            <td>Algorithms</td>
                            <td>Computer Science</td>
                            <td>9</td>
                        </tr>
                        <tr>
                            <td>Introduction to Algorithms</td>
                            <td>Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein</td>
                            <td>Algorithms</td>
                            <td>Computer Science</td>
                            <td>9</td>  
                        </tr>
                        <tr>
                            <td>Introduction to Algorithms</td>
                            <td>Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein</td>
                            <td>Algorithms</td>
                            <td>Computer Science</td>
                            <td>9</td>
                        </tr>
                        <tr>
                            <td>Introduction to Algorithms</td>
                            <td>Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein</td>
                            <td>Algorithms</td>
                            <td>Computer Science</td>
                            <td>9</td>
                        </tr>
                        <tr>
                            <td>Introduction to Algorithms</td>
                            <td>Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein</td>
                            <td>Algorithms</td>
                            <td>Computer Science</td>
                            <td>9</td>
                        </tr>
                        <tr>
                            <td>Introduction to Algorithms</td>
                            <td>Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein</td>
                            <td>Algorithms</td>
                            <td>Computer Science</td>
                            <td>9</td>
                        </tr>
                        <tr>
                            <td>Introduction to Algorithms</td>
                            <td>Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein</td>
                            <td>Algorithms</td>
                            <td>Computer Science</td>
                            <td>9</td>
                        </tr>
                        <tr>
                            <td>Introduction to Algorithms</td>
                            <td>Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein</td>
                            <td>Algorithms</td>
                            <td>Computer Science</td>
                            <td>9</td>
                        </tr>
                        
                        <tr>
                            <td>Introduction to Algorithms</td>
                            <td>Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein</td>
                            <td>Algorithms</td>
                            <td>Computer Science</td>
                            <td>9</td>
                        </tr>
                        </tbody>
                    </table>
                

                    </div>

                    <div className="tab-pane fade profile-edit pt-3" id="profile-edit">

                    <form>
                    <div className="row mb-3">
                                    <label for="inputEmail3" className="col-sm-2 col-form-label">Title</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="inputText" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                        <label for="inputPassword" className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-10">
                            <textarea className="form-control"></textarea>
                        </div>
                    </div>
                      <div className="row mb-3">
                        <label for="inputText" className="col-sm-2 col-form-label">Authors</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" />
                        </div>
                        </div>
                     
                    <div className="row mb-3">
                                    <label for="inputEmail3" className="col-sm-2 col-form-label">Genre</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="inputText" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label">Select Department</label>
                                    <div className="col-sm-10">
                                    <select className="form-select" aria-label="Default select example" defaultValue={"Computer Science"}>
                                        <option value="1">Computer Science</option>
                                        <option value="2">Mechanical Engineering</option>
                                        <option value="3">Electrical Engineering</option>
                                        <option value="4">Mathematics and Computing</option>                                        
                                        <option value="5">Civil Engineering</option>                                       
                                        <option value="6">Chemical Engineering</option>
                                    </select>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label for="inputNumber" className="col-sm-2 col-form-label">Count</label>
                                    <div className="col-sm-10">
                                        <input type="number" className="form-control" />
                                    </div>
                                    </div>
                                    <div className="row mb-3">
                                    <label for="inputEmail3" className="col-sm-2 col-form-label">Vendor</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="inputText" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label for="inputEmail3" className="col-sm-2 col-form-label">Vendor Id</label>
                                    <div className="col-sm-10">
                                        <input type="number" className="form-control" id="inputText" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label for="inputEmail3" className="col-sm-2 col-form-label">Publisher</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="inputText" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label for="inputEmail3" className="col-sm-2 col-form-label">Publisher Id</label>
                                    <div className="col-sm-10">
                                        <input type="number" className="form-control" id="inputText" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label for="inputNumber" className="col-sm-2 col-form-label">Book Image</label>
                                    <div className="col-sm-10">
                                    <input className="form-control" type="file" id="formFile" />
                                    </div>
                                </div>
                      <button type="button" className="btn btn-primary" onClick={handleAddBook}>Add Book</button>
                    </form>
                    </div>

                    <div className="tab-pane fade pt-3" id="profile-settings">
                    <h6>Edit/Delete Books</h6>
                    <table className="table datatable">
                      <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>Department</th>
                            <th>Count</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {books.map((book, index) => (
                          <tr key={index}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.genre}</td>
                            <td>{book.department}</td>
                            <td>{book.count}</td>
                            <td>
                              <button className="btn btn-danger" onClick={() => handleDeleteBook(index)}>Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

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
                            <img src="static/adminpage/booksearch.png" className="img-fluid" alt="" />
                        </div>
                        </div>
                    </div>
                    {profile ? (
                        <div className="row">
                        <div className="col-xl-4">
                            <div className="card">
                            <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                                <img src={profile.imageUrl} alt="Profile" />
                                <h2>{profile.title}</h2>
                                <h3>{profile.description}</h3>
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
                                </ul>
                                <div className="tab-content pt-2">
                                <div className="tab-pane fade show active profile-overview" id="book-overview">
                                    <h5 className="card-title">Book Details</h5>
                                    <div className="row">
                                    <div className="col-lg-3 col-md-4 label">Title</div>
                                    <div className="col-lg-9 col-md-8">{profile.title}</div>
                                    </div>
                                    <div className="row">
                                    <div className="col-lg-3 col-md-4 label">Description</div>
                                    <div className="col-lg-9 col-md-8">{profile.description}</div>
                                    </div>
                                    <div className="row">
                                    <div className="col-lg-3 col-md-4 label">Author</div>
                                    <div className="col-lg-9 col-md-8">{profile.author}</div>
                                    </div>
                                    <div className="row">
                                    <div className="col-lg-3 col-md-4 label">Genre</div>
                                    <div className="col-lg-9 col-md-8">{profile.genre}</div>
                                    </div>
                                    <div className="row">
                                    <div className="col-lg-3 col-md-4 label">Department</div>
                                    <div className="col-lg-9 col-md-8">{profile.department}</div>
                                    </div>
                                    <div className="row">
                                    <div className="col-lg-3 col-md-4 label">Count</div>
                                    <div className="col-lg-9 col-md-8">{profile.count}</div>
                                    </div>
                                    <div className="row">
                                    <div className="col-lg-3 col-md-4 label">Vendor</div>
                                    <div className="col-lg-9 col-md-8">{profile.vendor}</div>
                                    </div>
                                    <div className="row">
                                    <div className="col-lg-3 col-md-4 label">Vendor Id</div>
                                    <div className="col-lg-9 col-md-8">{profile.vendor_id}</div>
                                    </div>
                                    <div className="row">
                                    <div className="col-lg-3 col-md-4 label">Publisher</div>
                                    <div className="col-lg-9 col-md-8">{profile.publisher}</div>
                                    </div>
                                    <div className="row">
                                    <div className="col-lg-3 col-md-4 label">Publisher Id</div>
                                    <div className="col-lg-9 col-md-8">{profile.publisher_id}</div>
                                    </div>
                                </div>
                                
              
                                <div className="tab-pane fade profile-edit pt-3" id="book-edit">
                                <form>
                                <div className="row mb-3">
                                <div className="row mb-3">
                                    <label htmlFor="profileImage" className="col-md-4 col-lg-3 col-form-label">Book Image</label>
                                    <div className="col-md-8 col-lg-9">
                                        <img src={profile.imageUrl} alt="Book" style={{ width: "100px", height: "150px" }}/>
                                        <div className="pt-2">
                                        <a href="#" className="btn btn-primary btn-sm" title="Upload new book image"><i className="bi bi-upload"></i></a>
                                        <a href="#" className="btn btn-danger btn-sm" title="Remove my book image"><i className="bi bi-trash"></i></a>
                                        </div>
                                    </div>
                                    </div>
                                <div className="row mb-3">
                                                <label for="inputEmail3" className="col-sm-2 col-form-label">Title</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" id="inputText" defaultValue={profile.title}/>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                    <label for="inputPassword" className="col-sm-2 col-form-label">Description</label>
                                    <div className="col-sm-10">
                                        <textarea className="form-control" defaultValue={profile.description}></textarea>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label for="inputText" className="col-sm-2 col-form-label">Authors</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" defaultValue={profile.author}/>
                                    </div>
                                    </div>
                                
                                
                                                <label for="inputEmail3" className="col-sm-2 col-form-label">Genre</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" id="inputText" defaultValue={profile.genre}/>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label className="col-sm-2 col-form-label">Select Department</label>
                                                <div className="col-sm-10">
                                                <select className="form-select" aria-label="Default select example" defaultValue={profile.department}>
                                                    <option value="1">Computer Science</option>
                                                    <option value="2">Mechanical Engineering</option>
                                                    <option value="3">Electrical Engineering</option>
                                                    <option value="4">Mathematics and Computing</option>                                        
                                                    <option value="5">Civil Engineering</option>                                       
                                                    <option value="6">Chemical Engineering</option>
                                                </select>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label for="inputNumber" className="col-sm-2 col-form-label">Count</label>
                                                <div className="col-sm-10">
                                                    <input type="number" className="form-control" defaultValue={profile.count}/>
                                                </div>
                                                </div>
                                                <div className="row mb-3">
                                                <label for="inputEmail3" className="col-sm-2 col-form-label">Vendor</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" id="inputText" defaultValue={profile.vendor}/>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label for="inputEmail3" className="col-sm-2 col-form-label">Vendor Id</label>
                                                <div className="col-sm-10">
                                                    <input type="number" className="form-control" id="inputText" defaultValue={profile.vendor_id}/>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label for="inputEmail3" className="col-sm-2 col-form-label">Publisher</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" id="inputText" defaultValue={profile.publisher}/>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label for="inputEmail3" className="col-sm-2 col-form-label">Publisher Id</label>
                                                <div className="col-sm-10">
                                                    <input type="number" className="form-control" id="inputText" defaultValue={profile.publisher_id}/>
                                                </div>
                                            </div>
                                            
                                <button type="button" className="btn btn-primary" onClick={handleAddBook}>Edit Details</button>
                                </form>
                                </div>
                                
                            </div>  
                            </div>
                        </div>
                        </div>
                    </div>
                    ): (
                        <p>No profile found</p>
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
                <img src="static/logo.svg.png" alt="Logo" className="logo" />
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

    </div>
  );
};

export default Bookdb;
