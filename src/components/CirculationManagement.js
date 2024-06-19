import React, { useEffect, useRef, useState}  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './AdminPage.css';
import 'simple-datatables/dist/style.css';
import { Tooltip } from 'bootstrap';
import { DataTable } from 'simple-datatables'; // Import DataTable from simple-datatables
import { Link } from 'react-router-dom';
import booksData from './books.json';

const CirculationManagement = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    rollno: '',
    bookTitle: '',
    returnDate: '',
    issueDate: '',
    terms: false
  });
  const [bookDetails, setBookDetails] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Reset book details when the title is changed
    setBookDetails(null);
    setFormErrors({
      ...formErrors,
      bookTitle: '',
    });
  };

  const fetchBookDetails = () => {
    const foundBook = booksData.find((book) => book.title.toLowerCase() === formData.bookTitle.toLowerCase());
    if (foundBook) {
      setBookDetails(foundBook);
    } else {
      setBookDetails(null);
      setFormErrors({
        ...formErrors,
        bookTitle: 'Book not found',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBookDetails();
  };


  const validateForm = (data) => {
    const errors = {};

    if (!data.firstName) errors.firstName = 'First name is required';
    if (!data.lastName) errors.lastName = 'Last name is required';
    if (!data.email) errors.username = 'Email is required';
    if (!data.rollno) errors.city = 'Roll Number is required';
    if (!data.returnDate) errors.state = 'Return Date is required';
    if (!data.issueDate) errors.zip = 'Issue Date code is required';
    if (!data.terms) errors.terms = 'You must agree to terms and conditions';

    return errors;
  };
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
    <h1>Form Validation</h1>
    <nav>
      <ol className="breadcrumb">
        <li className="breadcrumb-item"  style={{ color: "#ccc" }}><Link style={{ color: "#ccc" }} to="/">Home</Link></li>
        <li className="breadcrumb-item active"  style={{ color: "#ccc" }}>Circulation Management</li>
      </ol>
    </nav>
  </div>
  <section className="section">
    <div className="row">
      <div className="col-lg-6">

        <div className="card">
          <div className="card-body">
          <h5 className="card-title">Book Issue Form</h5>
          <p>Fill out the form below to issue a book.</p>
          <form className="row g-3" onSubmit={handleSubmit} noValidate>
            <div className="col-md-4">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                className={`form-control ${formErrors.firstName ? 'is-invalid' : ''}`}
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">{formErrors.firstName}</div>
            </div>
            <div className="col-md-4">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                type="text"
                className={`form-control ${formErrors.lastName ? 'is-invalid' : ''}`}
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">{formErrors.lastName}</div>
            </div>
            <div className="row mb-3">
            <label for="inputEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Recipient's roll number" aria-label="Recipient's roll number" aria-describedby="basic-addon2" />
             <span className="input-group-text" id="basic-addon2">@iitdh.ac.in</span>
                  </div>
                  <div className="invalid-feedback">{formErrors.email}</div>
                 </div>
             <div className="row mb-3">
             <label for="inputNumber" className="col-sm-2 col-form-label">Roll Number</label>
                   <div className="col-sm-10">
                  <input type="number" className="form-control" />
                 </div>
                 <div className="invalid-feedback">{formErrors.rollno}</div>
             </div>
            <div className="col-md-6">
              <label htmlFor="bookTitle" className="form-label">Book Title</label>
              <input
                type="text"
                className={`form-control ${formErrors.bookTitle ? 'is-invalid' : ''}`}
                id="bookTitle"
                name="bookTitle"
                value={formData.bookTitle}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">{formErrors.bookTitle}</div>
            </div>
            <div className="col-md-3">
              <label htmlFor="issueDate" className="form-label">Issue Date</label>
              <input
                type="date"
                className={`form-control ${formErrors.issueDate ? 'is-invalid' : ''}`}
                id="issueDate"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">{formErrors.issueDate}</div>
            </div>
            <div className="col-md-3">
              <label htmlFor="returnDate" className="form-label">Return Date</label>
              <input
                type="date"
                className={`form-control ${formErrors.returnDate ? 'is-invalid' : ''}`}
                id="returnDate"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">{formErrors.returnDate}</div>
            </div>
            <div className="col-12">
              <div className="form-check">
                <input
                  className={`form-check-input ${formErrors.terms ? 'is-invalid' : ''}`}
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label" htmlFor="terms">
                  Agree to terms and conditions
                </label>
                <div className="invalid-feedback">{formErrors.terms}</div>
              </div>
            </div>
            <div className="col-12">
              <button className="btn btn-primary" type="submit">Submit form</button>
            </div>
          </form>
          </div>
        </div>
        {bookDetails && (
        <div className="row mt-4">
          <div className="col-md-6">
            <h3>Book Details</h3>
            <p>Book: {bookDetails.imageUrl}</p>
            <p>Title: {bookDetails.title}</p>
            <p>Description: {bookDetails.description}</p>
            <p>Author: {bookDetails.author}</p>
            <p>Genre: {bookDetails.genre}</p>
            <p>Department: {bookDetails.department}</p>
            <p>Count: {bookDetails.count}</p>
          </div>
        </div>
      )}
          </div>
          <div className="col-lg-6">

        <div className="card">
          <div className="card-body">
          <h5 className="card-title">Book Return Form</h5>
          <p>Fill out the form below to return a book.</p>
          <form className="row g-3" onSubmit={handleSubmit} noValidate>
            <div className="col-md-4">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                className={`form-control ${formErrors.firstName ? 'is-invalid' : ''}`}
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">{formErrors.firstName}</div>
            </div>
            <div className="col-md-4">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                type="text"
                className={`form-control ${formErrors.lastName ? 'is-invalid' : ''}`}
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">{formErrors.lastName}</div>
            </div>
            <div className="row mb-3">
            <label for="inputEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Recipient's roll number" aria-label="Recipient's roll number" aria-describedby="basic-addon2" />
             <span className="input-group-text" id="basic-addon2">@iitdh.ac.in</span>
                  </div>
                  <div className="invalid-feedback">{formErrors.email}</div>
                 </div>
             <div className="row mb-3">
             <label for="inputNumber" className="col-sm-2 col-form-label">Roll Number</label>
                   <div className="col-sm-10">
                  <input type="number" className="form-control" />
                 </div>
                 <div className="invalid-feedback">{formErrors.rollno}</div>
             </div>
            <div className="col-md-6">
              <label htmlFor="bookTitle" className="form-label">Book Title</label>
              <input
                type="text"
                className={`form-control ${formErrors.bookTitle ? 'is-invalid' : ''}`}
                id="bookTitle"
                name="bookTitle"
                value={formData.bookTitle}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">{formErrors.bookTitle}</div>
            </div>
            <div className="col-md-3">
              <label htmlFor="returnDate" className="form-label">Return Date</label>
              <input
                type="date"
                className={`form-control ${formErrors.returnDate ? 'is-invalid' : ''}`}
                id="returnDate"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">{formErrors.returnDate}</div>
            </div>
            <div className="col-12">
              <div className="form-check">
                <input
                  className={`form-check-input ${formErrors.terms ? 'is-invalid' : ''}`}
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label" htmlFor="terms">
                  Agree to terms and conditions
                </label>
                <div className="invalid-feedback">{formErrors.terms}</div>
              </div>
            </div>
            <div className="col-12">
              <button className="btn btn-primary" type="submit">Submit form</button>
            </div>
          </form>
          </div>
        </div>
        {bookDetails && (
        <div className="row mt-4">
          <div className="col-md-6">
            <h3>Book Details</h3>
            <p>Book: {bookDetails.imageUrl}</p>
            <p>Title: {bookDetails.title}</p>
            <p>Description: {bookDetails.description}</p>
            <p>Author: {bookDetails.author}</p>
            <p>Genre: {bookDetails.genre}</p>
            <p>Department: {bookDetails.department}</p>
            <p>Count: {bookDetails.count}</p>
          </div>
        </div>
      )}
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

export default CirculationManagement;
