//handles issue and return of a book
//takes care of all return and issue policies including fine for late return and book count
import React, { useEffect, useState}  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Dropdown, DropdownButton, Image } from 'react-bootstrap';
import axios from 'axios';

import './AdminPage.css';
import { Tooltip } from 'bootstrap';
import { Link } from 'react-router-dom';

const CirculationManagement = () => {

  //issuing a book - uses form
  const [issueFormData, setIssueFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    rollno: 0,
    bookId: '',
    issueDate: '',
    returnDate: '',
    status: 'Issued',
  });

  //handles change in issue form
   const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setIssueFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value,
      };
  
      if (name === 'bookId') {
        handleBookAction(updatedFormData);
      }
  
      return updatedFormData;
    });
  };

//function to submit issue form
//only allows 3 book issue for each student, and doesn't allow to issue a book if count is <2
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form fields
    const errors = validateForm(issueFormData);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      // If there are errors, do not proceed with further actions
      console.error('Validation errors:', errors);
      return; // Exit the function early
    }
    try {  

      // Fetch all issues to count occurrences of the email
      const allIssuesResponse = await axios.get('http://localhost:5000/api/issues');
      const allIssues = allIssuesResponse.data;

      // Count the number of times the email has occurred in the issues
      const emailOccurrences = allIssues.filter(issue => issue.email === issueFormData.email && issue.status === 'Issued').length;

      if (emailOccurrences >= 2) {
        throw new Error(`Failed to issue book. This user has already issued ${emailOccurrences} books.`);
      }
      
      // Step 2: Fetch the bookId based on the provided book title or identifier
      const bookTitle = issueFormData; // Assuming bookTitle is available in issueFormData
  
      // Fetch bookId based on the bookTitle from your backend or local storage
      const bookResponse = await axios.get(`http://localhost:5000/api/books/search?category=title&keyword=${encodeURIComponent(bookTitle.bookId)}`);
      if (!bookResponse.data || bookResponse.data.length === 0) {
        throw new Error('Book not found');
      }

      const profileResponse = await axios.get(`http://localhost:5000/api/students/search?category=roll&keyword=${issueFormData.rollno}`);      
      if (!profileResponse.data || profileResponse.data.length === 0) {
        throw new Error('User not found');
      }
      const bookId = bookResponse.data[0]._id; // Assuming the first book found is the correct one
      const count_val = bookResponse.data[0].count;
      // Step 3: Update book count via PUT request using the obtained bookId
      if (count_val < 2) {
        throw new Error('Failed to issue book. Only 1 copy available.');
      }
      
      // Step 1: Save issue details to your backend API
      const response = await axios.post('http://localhost:5000/api/issues', issueFormData);
      console.log('Saved issue details successfully:', response.data);

      const response2 = await fetch(`http://localhost:5000/api/books/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ count: count_val-1 }), // Send email and bookId in request body
      });
      if (bookResponse.data[0].reservedBy.includes(issueFormData.rollno)) {
        
        const response4 = await axios.put(`http://localhost:5000/api/books/${bookId}/reserve`, {
          userRoll: issueFormData.rollno, // Sending user ID along with the request
        });
      }

      if (!response2.ok) {
        throw new Error('Failed to issue book');
      }
  
      console.log('Book issued successfully');
  
      setBookDetails(null);
      // Reset form fields after successful issuance
      setIssueFormData({
        fname: '',
        lname: '',
        email: '',
        rollno: 0,
        bookId: '', // Assuming bookTitle is cleared after issuance
        issueDate: '',
        returnDate: '',
        status: 'Issued',
      });
  
      setDefaultDates();
      // Optionally, you can handle additional state updates or success messages here
    } catch (error) {
      console.error('Error performing action:', error);
      setFormErrors({
        ...formErrors,
        bookTitle: 'Book not found or action failed', // Update specific field error
      });
      alert(error.message);
    }
  };

    //sets return date in issue form 15 days after today (default issue date)

    // Function to get current date in IST (Kolkata time)
    const getISTDate = () => {
      const now = new Date(); // Current date and time in local time zone
      const ISTOffset = 330; // IST offset in minutes (India Standard Time is UTC+5:30)
      const ISTTime = new Date(now.getTime() + (ISTOffset * 60000)); // Convert to IST
      return ISTTime;
    };

     // Function to calculate returnDate 15 days after issueDate
     const calculateReturnDate = (issueDate) => {
      const returnDate = new Date(issueDate);
      returnDate.setDate(returnDate.getDate() + 15); // Add 15 days
      return returnDate;
    };

    // Function to set default issueDate and returnDate
    const setDefaultDates = () => {
      const defaultIssueDate = getISTDate(); // Get current IST date and time
      const defaultReturnDate = calculateReturnDate(defaultIssueDate); // Calculate returnDate

      // Format dates for datetime-local input
      const formattedIssueDate = defaultIssueDate.toISOString().slice(0, 16); // Format as "yyyy-MM-ddThh:mm"
      const formattedReturnDate = defaultReturnDate.toISOString().slice(0, 16); // Format as "yyyy-MM-ddThh:mm"

      // Set default issueDate and returnDate in IST
      setIssueFormData((prevFormData) => ({
        ...prevFormData,
        issueDate: formattedIssueDate,
        returnDate: formattedReturnDate,
      }));
    };
    useEffect(() => {
      setDefaultDates();
    }, []); // Empty dependency array ensures this effect runs only once on component mount
    
    
  //returning a book - uses form
  const [returnFormData, setReturnFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    rollno: 0,
    bookId: '',
    returnDate: '',
    status: 'Returned',
  });

  //handles change in return form  
  const handleChange2 = async (e) => {
    const { name, value, type, checked } = e.target;
  
    // Update returnFormData with the new value
    const updatedFormData = {
      ...returnFormData,
      [name]: type === 'checkbox' ? checked : value
    };
  
    // If the changed field is 'returnDate', fetch issue details and update status
    if (name === 'returnDate') {
      try {
        const issueResponse = await axios.get(`http://localhost:5000/api/issues/${encodeURIComponent(returnFormData.email)}/${encodeURIComponent(returnFormData.bookId)}`);
        
        if (!issueResponse.data || issueResponse.data.length === 0) {
          throw new Error('Issue not found');
        }
  
        const issue = issueResponse.data;
        const originalReturnDate = new Date(issue.returnDate);
        const providedReturnDate = new Date(value);
  
        // Check if provided return date is greater than original return date
        if (providedReturnDate > originalReturnDate) {
          updatedFormData.status = 'Late Return';
          console.log('Status updated to Late Return');
        } else {
          updatedFormData.status = 'Returned';
          console.log('Status updated to Returned');
        }
      } catch (error) {
        console.error('Error fetching issue details:', error);
        // Handle error fetching issue details here
      }
    }
  
    // Update returnFormData state
    setReturnFormData(updatedFormData);
  
    // You can optionally call handleBookAction here with updatedFormData
    if (name === 'bookId') {
      handleBookAction(updatedFormData);
    }
  };
  

  //function to handle return book form
  //sends alert if return date is later than set due date, deleting the book from issue table of db
  const handleDelete = async (e) => {
    e.preventDefault();
    const errors = validateForm(returnFormData);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      console.error('Validation errors:', errors);
      return;
    }
    try {
      const { email, bookId, returnDate, status } = returnFormData;
  
      // Fetch the issue details to get the original return date
      const issueResponse = await axios.get(`http://localhost:5000/api/issues/${encodeURIComponent(email)}/${encodeURIComponent(bookId)}`);
      if (!issueResponse.data || issueResponse.data.length === 0) {
        throw new Error('Issue not found');
      }
  
      const issue = issueResponse.data;
      const originalReturnDate = new Date(issue.returnDate);
      const providedReturnDate = new Date(returnDate);
  
      if (originalReturnDate < providedReturnDate) {
        alert('Failed to return book. Fine of Rs. 200 is required for late return.');
      }
  
      // Update the issue status to "Returned"
      const url = `http://localhost:5000/api/issues/${encodeURIComponent(email)}/${encodeURIComponent(bookId)}`;
      await axios.put(url, { status: status });
      console.log('Book status updated to Returned');
  
      const bookResponse = await axios.get(`http://localhost:5000/api/books/search?category=title&keyword=${encodeURIComponent(bookId)}`);
      if (!bookResponse.data || bookResponse.data.length === 0) {
        throw new Error('Book not found');
      }
  
      const bookId2 = bookResponse.data[0]._id;
      const count_val = bookResponse.data[0].count;
  
      const response2 = await fetch(`http://localhost:5000/api/books/${bookId2}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ count: count_val + 1 }),
      });
  
      if (!response2.ok) {
        throw new Error('Failed to return book');
      }
      console.log('Book returned successfully');
  
      setBookDetails(null);
      setReturnFormData({
        fname: '',
        lname: '',
        email: '',
        rollno: 0,
        bookId: '',
        returnDate: '',
        status: 'Returned',
      });
      
      setDefaultDates();
    } catch (error) {
      console.error('Error updating book status:', error);
      setFormErrors({
        ...formErrors,
        bookId: 'Book not found or action failed',
      });
      alert(error.message);
    }
  };

  
//displays the book once enterred in issue form or return form
const [bookDetails, setBookDetails] = useState(null);
  const handleBookAction = async (formData) => {
    try {
      console.log(formData)
      const response = await axios.get(`http://localhost:5000/api/books/search?category=title&keyword=${formData.bookId}`);
      console.log(response.data);
      setBookDetails(response.data);
    } catch (error) {
      console.error('Error searching for book:', error);
    } finally {
    }
  };

  //takes account of errors in the form on missing any input area
  const [formErrors, setFormErrors] = useState({});
  
 //sets rules for forms - for form errors
  const validateForm = (data) => {
    const errors = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@iitdh\.ac\.in$/;

    if (!data.fname) errors.fname = 'First name is required';
    if (!data.lname) errors.lname = 'Last name is required';
    if (!data.email || !emailPattern.test(data.email)) errors.email = 'Email must be a valid @iitdh.ac.in address';
    if (!data.bookId) errors.bookId = 'Book name is required';
    if (!data.rollno) errors.rollno = 'Roll Number is required';
    if (!data.returnDate) errors.returnDate = 'Return Date is required';
    if (!data.status) errors.status = 'Status is required';

    return errors;
  };
  
  //manages sidebar
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

  // useEffect hook to handle side effects
  useEffect(() => {
    // Select the mobile navigation toggle button
    const mobileNavToogleButton = document.querySelector('.mobile-nav-toggle');

    if (mobileNavToogleButton) {
      mobileNavToogleButton.addEventListener('click', (event) => {
        event.preventDefault();
        mobileNavToogle();
      });
    }
    // Function to toggle mobile navigation
    const mobileNavToogle = () => {
      document.querySelector('body').classList.toggle('mobile-nav-active');
      mobileNavToogleButton.classList.toggle('bi-three-dots:');
      mobileNavToogleButton.classList.toggle('bi-x');
    };
    // Add event listeners to navigation links
    document.querySelectorAll('#navbar a').forEach((navbarlink) => {
      if (!navbarlink.hash) return;

      const section = document.querySelector(navbarlink.hash);
      if (!section) return;

      navbarlink.addEventListener('click', () => {
        if (document.querySelector('.mobile-nav-active')) {
          mobileNavToogle();
        }
      });
    });
// Add event listeners to navigation dropdowns
    const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

    navDropdowns.forEach((el) => {
      el.addEventListener('click', function (event) {
        if (document.querySelector('.mobile-nav-active')) {
          event.preventDefault();
          this.classList.toggle('active');
          this.nextElementSibling.classList.toggle('dropdown-active');

          const dropDownIndicator = this.querySelector('.dropdown-indicator');
          dropDownIndicator.classList.toggle('bi-chevron-up');
          dropDownIndicator.classList.toggle('bi-chevron-down');
        }
      });
    });
// Cleanup function to remove event listeners
    return () => {
      if (mobileNavToogleButton) {
        mobileNavToogleButton.removeEventListener('click', (event) => {
          event.preventDefault();
          mobileNavToogle();
        });
      }

      document.querySelectorAll('#navbar a').forEach((navbarlink) => {
        if (!navbarlink.hash) return;

        const section = document.querySelector(navbarlink.hash);
        if (!section) return;

        navbarlink.removeEventListener('click', () => {
          if (document.querySelector('.mobile-nav-active')) {
            mobileNavToogle();
          }
        });
      });

      navDropdowns.forEach((el) => {
        el.removeEventListener('click', function (event) {
          if (document.querySelector('.mobile-nav-active')) {
            event.preventDefault();
            this.classList.toggle('active');
            this.nextElementSibling.classList.toggle('dropdown-active');

            const dropDownIndicator = this.querySelector('.dropdown-indicator');
            dropDownIndicator.classList.toggle('bi-chevron-up');
            dropDownIndicator.classList.toggle('bi-chevron-down');
          }
        });
      });
    };
  }, []);
  
  //reponsive view of navigation bar in smaller sized window
  useEffect(() => {
    const mobileNavToggleButtons = document.querySelectorAll('.mobile-nav-toggle');
    const mobileNavShow = document.querySelector('.mobile-nav-show');
    const mobileNavHide = document.querySelector('.mobile-nav-hide');
    
    function mobileNavToggle() {
      document.body.classList.toggle('mobile-nav-active');
      mobileNavShow.classList.toggle('d-none');
      mobileNavHide.classList.toggle('d-none');
    }
    
    mobileNavToggleButtons.forEach(button => {
      button.addEventListener('click', mobileNavToggle);
    });
    
    return () => {
      mobileNavToggleButtons.forEach(button => {
        button.removeEventListener('click', mobileNavToggle);
      });
    };
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
              <li><a href="libcom.html">Library Committee</a></li>
              <li><a href="asklib.html">Ask a Librarian</a></li>
              <li><a href="/AboutUs">About</a></li>
              <li><a href="#footer">Contact</a></li>
            </ul>
          </nav>
          
          <button className="mobile-nav-toggle mobile-nav-show bi bi-three-dots"></button>
            <button className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></button>
          <nav className="header-nav ms-auto">
            <ul className="d-flex align-items-center list-unstyled m-4">
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
              <Link className="nav-link collapsed" to="/AdminPage/bookdb">
              <i className="bi bi-book"></i><span>Book Database</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to="/AdminPage/circulationmanagement">
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
              <i class="bi bi-envelope"></i>
              <span>Notification</span>
              </Link>
            </li>
          </ul>
        </aside>
          
  <main id="main" className="main">

    <div className="pagetitle">
      <h1>Form Validation</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"  style={{ color: "#ccc" }}><Link style={{ color: "#ccc" }} to="/AdminPage">Home</Link></li>
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
              <form className="row g-3" onSubmit={(e) => handleSubmit(e)} noValidate>
                <div className="col-md-4">
                  <label htmlFor="fname" className="form-label">First Name</label>
                  <input
                    type="text"
                    className={`form-control ${formErrors.fname ? 'is-invalid' : ''}`}
                    id="fname"
                    name="fname"
                    value={issueFormData.fname}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                  {formErrors.fname && (
                              <div className="alert alert-danger" role="alert">
                                {formErrors.fname}
                              </div>
                            )}
                </div>
                <div className="col-md-4">
                  <label htmlFor="lname" className="form-label">Last Name</label>
                  <input
                    type="text"
                    className={`form-control ${formErrors.lname ? 'is-invalid' : ''}`}
                    id="lname"
                    name="lname"
                    value={issueFormData.lname}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                  {formErrors.lname && (
                              <div className="alert alert-danger" role="alert">
                                {formErrors.lname}
                              </div>
                            )}
                </div>
                <div className="row mb-3">
                  <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                      name="email"
                      value={issueFormData.email}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                    </div>
                  {formErrors.email && (
                              <div className="alert alert-danger" role="alert">
                                {formErrors.email}
                              </div>
                            )}
                </div>
                <div className="row mb-3">
                  <label htmlFor="inputNumber" className="col-sm-2 col-form-label">Roll Number</label>
                  <div className="col-sm-10">
                  <input
                      type="number"
                      className={`form-control ${formErrors.rollno ? 'is-invalid' : ''}`}
                      name="rollno"
                      value={issueFormData.rollno}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>
                  {formErrors.rollno && (
                              <div className="alert alert-danger" role="alert">
                                {formErrors.rollno}
                              </div>
                            )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="bookId" className="form-label">Book Title</label>
                  <input
                    type="text"
                    className={`form-control ${formErrors.bookId ? 'is-invalid' : ''}`}
                    id="bookId"
                    name="bookId"
                    value={issueFormData.bookId}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                  {formErrors.bookId && (
                              <div className="alert alert-danger" role="alert">
                                {formErrors.bookId}
                              </div>
                            )}
                </div>
                <div className="col-md-3">
                  <label htmlFor="issueDate" className="form-label">Issue Date</label>
                  <input
                    type="datetime-local"
                    className={`form-control ${formErrors.issueDate ? 'is-invalid' : ''}`}
                    id="issueDate"
                    name="issueDate"
                    value={issueFormData.issueDate}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                  {formErrors.issueDate && (
                              <div className="alert alert-danger" role="alert">
                                {formErrors.issueDate}
                              </div>
                            )}
                </div>
                <div className="col-md-3">
                  <label htmlFor="returnDate" className="form-label">Return Date</label>
                  <input
                    type="datetime-local"
                    className={`form-control ${formErrors.returnDate ? 'is-invalid' : ''}`}
                    id="returnDate"
                    name="returnDate"
                    value={issueFormData.returnDate}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                  {formErrors.returnDate && (
                              <div className="alert alert-danger" role="alert">
                                {formErrors.returnDate}
                              </div>
                            )}
                </div>
                <div className="col-9">
                  <button className="btn btn-primary" type="submit">Issue Book</button>
                </div>
                <div className="col-md-3">
                  <label htmlFor="status" className="form-label">Status</label>
                  <select
                    className="form-select"
                    id="status"
                    name="status"
                    value={issueFormData.status}
                    onChange={(e) => handleChange(e)}
                    required
                  >
                    <option value="Issued">
                      Issued
                    </option>
                   </select>
                   {formErrors.status && (
                              <div className="alert alert-danger" role="alert">
                                {formErrors.status}
                              </div>
                            )}
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Book Return Form</h5>
              <p>Fill out the form below to return a book.</p>
              <form className="row g-3"  onSubmit={(e) => handleDelete(e)} noValidate>
                <div className="col-md-4">
                  <label htmlFor="fname" className="form-label">First Name</label>
                  <input
                    type="text"
                    className={`form-control ${formErrors.fname ? 'is-invalid' : ''}`}
                    id="fname"
                    name="fname"
                    value={returnFormData.fname}
                    onChange={(e) => handleChange2(e)}
                    required
                    />
                    {formErrors.fname && (
                      <div className="alert alert-danger" role="alert">
                        {formErrors.fname}
                      </div>
                    )}

                </div>
                <div className="col-md-4">
                  <label htmlFor="lname" className="form-label">Last Name</label>
                  <input
                    type="text"
                    className={`form-control ${formErrors.lname ? 'is-invalid' : ''}`}
                    id="lname"
                    name="lname"
                    value={returnFormData.lname}
                    onChange={(e) => handleChange2(e)}
                    required
                  />
                  {formErrors.lname && (
                              <div className="alert alert-danger" role="alert">
                                {formErrors.lname}
                              </div>
                            )}
                </div>
                <div className="row mb-3">
                  <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                      name="email"
                      value={returnFormData.email}
                      onChange={(e) => handleChange2(e)}
                      required
                    />
                    </div>
                  {formErrors.email && (
                              <div className="alert alert-danger" role="alert">
                                {formErrors.email}
                              </div>
                            )}
                </div>
                <div className="row mb-3">
                  <label htmlFor="inputNumber" className="col-sm-2 col-form-label">Roll Number</label>
                  <div className="col-sm-10">
                  <input
                      type="number"
                      className={`form-control ${formErrors.rollno ? 'is-invalid' : ''}`}
                      name="rollno"
                      value={returnFormData.rollno}
                      onChange={(e) => handleChange2(e)}
                      required
                    />
                  </div>
                  {formErrors.rollno && (
                              <div className="alert alert-danger" role="alert">
                                {formErrors.rollno}
                              </div>
                            )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="bookId" className="form-label">Book Title</label>
                  <input
                    type="text"
                    className={`form-control ${formErrors.bookId ? 'is-invalid' : ''}`}
                    id="bookId"
                    name="bookId"
                    value={returnFormData.bookId}
                    onChange={(e) => handleChange2(e)}
                    required
                  />
                  {formErrors.bookId && (
                              <div className="alert alert-danger" role="alert">
                                {formErrors.bookId}
                              </div>
                            )}
                </div>
                <div className="col-md-3">
                  <label htmlFor="returnDate" className="form-label">Return Date</label>
                  <input
                    type="datetime-local"
                    className={`form-control ${formErrors.returnDate ? 'is-invalid' : ''}`}
                    id="returnDate"
                    name="returnDate"
                    value={returnFormData.returnDate}
                    onChange={(e) => handleChange2(e)}
                    required
                  />
                {formErrors.returnDate && (
                              <div className="alert alert-danger" role="alert">
                                {formErrors.returnDate}
                              </div>
                            )}
                </div>
                <div className="col-md-3">
                  <label htmlFor="status" className="form-label">Status</label>
                  <select
                    className="form-select"
                    id="status"
                    name="status"
                    value={returnFormData.status}
                    onChange={(e) => handleChange2(e)}
                    required
                  >
                    <option value="Returned">
                      Returned
                    </option>
                    <option value="Late Return">
                      Late Return
                    </option>
                    <option value="Returned - book damage">
                      Returned - book damage
                    </option>
                   </select>
                   {formErrors.status && (
                              <div className="alert alert-danger" role="alert">
                                {formErrors.status}
                              </div>
                            )}
                </div>

                <div className="col-12">
                  <button className="btn btn-primary" type="submit">Return Book</button>
                </div>
              </form>
            </div>
          </div>
        </div> 
      </div> 
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className='card' style={{ width: '500px', textAlign: 'center', alignContent: 'center', marginTop: '20px' }}>
          {bookDetails && bookDetails.length > 0 ? (
            <div className="row">
                <h3>Book Details</h3>
                <p><img src={bookDetails[0].imageUrl} style={{ width: '100px', height: '150px' }} alt="Book Cover" /></p>
                <p>Title: {bookDetails[0].title}</p>
                <p>Description: {bookDetails[0].description}</p>
                <p>Author: {bookDetails[0].author}</p>
                <p>Genre: {bookDetails[0].genre}</p>
                <p>Department: {bookDetails[0].department}</p>
                <p>Count: {bookDetails[0].count}</p>
                <p>Reserved: {bookDetails[0].reserved}</p>
                <p>Reserved By: {bookDetails[0].reservedBy.join(', ')}</p>
            </div>
          ) : (
              <h3>No book found</h3>
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

export default CirculationManagement;
