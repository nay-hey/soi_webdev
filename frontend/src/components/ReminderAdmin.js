//handles reminder form
//have included sending emails to selected email ids from table displaying current issue data 
import React, { useEffect, useRef, useState}  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Dropdown, DropdownButton, Image } from 'react-bootstrap';
import axios from 'axios';
import './AdminPage.css';
import { Tooltip } from 'bootstrap';
import { Link } from 'react-router-dom';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const Reminder = () => {
  //sets msg for email
  const [messages, setMessage] = useState('');
     const editorRef = useRef(null); // Create a ref for the Quill editor element
    const isEditorInitialized = useRef(false); // Flag to track if the editor has been initialized
    const [message, setMailmsg] = useState('');
    useEffect(() => {
      // Check if the Quill editor element exists and if it hasn't been initialized yet
      if (editorRef.current && !isEditorInitialized.current) {
        // Initialize Quill with the Snow theme
        const quill = new Quill(editorRef.current, {
            theme: 'snow'
          });
    
          // Set initial content
          quill.root.innerHTML = `
            <p>Dear Student,</p>
            <p>This is a reminder that you have borrowed books from the library, and the due date for returning them is approaching.</p>
            <p>Please ensure that you return the books on time to avoid any overdue fines.</p>
            <p>Thank you.</p>
          `;
          quill.on('text-change', () => {
            setMailmsg(quill.root.innerHTML); // Update message state with the HTML content
          });
    
        // Set the flag to true to indicate that the editor has been initialized
        isEditorInitialized.current = true;
          }
        }, []);
        //sets date 
        const [selectedDate, setSelectedDate] = useState('');       
        const handleDateChange = (e) => {
          setSelectedDate(e.target.value);
        };
        //sets the email ids 
        const [selectedEmails, setSelectedEmails] = useState([]);
        const handleCheckboxChange = (email) => {
          setSelectedEmails(prevEmails =>
            prevEmails.includes(email)
              ? prevEmails.filter(e => e !== email)
              : [...prevEmails, email]
          );
        };
      //function for handling mails
        const sendReminders = async () => {
          if (selectedEmails.length === 0 || !selectedDate || !message) {
            alert('Please select at least one email, choose a date, and provide a message.');
            return;
          }
          
          try {
            const response = await axios.post('http://localhost:5000/api/send-reminder', {
              selectedEmails: selectedEmails,
              selectedDate: selectedDate, // Include selectedDate if needed
              message: message
            });
            setMessage('Reminders sent successfully!');
            console.log(response.data); // Log the response from the server
          } catch (error) {
            console.error('Error sending reminders:', error);
            alert('Failed to send reminders. Please try again.');
          }
        
        };
      //displays table for the issue data of books and the users 
        const [items, setItem] = useState([]);
        useEffect(() => {
          fetchItem();
        }, []);
        
        const fetchItem = async () => {
          try {
            const response = await axios.get('http://localhost:5000/api/issues');
            const items = response.data
              .filter(item => item.status === 'Issued') // Filter items with status 'issued'
              .map(item => ({
                ...item,
                issueDate: new Date(item.issueDate).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
                returnDate: new Date(item.returnDate).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
              }));
            setItem(items);
          } catch (error) {
            console.error('Error fetching item:', error);
          }
        };
        //handles delete feature to delete issues if required
        const handleDelete = async (email, bookId) => {
          try {
            const response = await axios.delete(`http://localhost:5000/api/issues/${encodeURIComponent(email)}/${encodeURIComponent(bookId)}`);
            console.log(response.data.message);
            fetchItem();
          } catch (error) {
            console.error('Error deleting item:', error);
          }
        };

        //feature to handle reissue of a book 
        const handleReissue = async (email, bookId) => {
          try {
            const issueDate = new Date(); // Set the new issue date to the current date
            const returnDate = new Date(issueDate);
            returnDate.setDate(issueDate.getDate() + 15); // Example: Set return date to 14 days from issue date
        
            const response = await axios.put(`http://localhost:5000/api/issues/reissue/${encodeURIComponent(email)}/${encodeURIComponent(bookId)}`, {
              issueDate,
              returnDate
            });
        console.log(response.data);
            if (response.status === 200) {
              alert('Book reissued successfully');
              // Update the state or refresh the issues list as needed
            }
          } catch (error) {
            console.error('Error reissuing the book:', error);
            alert('Failed to reissue the book');
          }
        };

      //displays data of issuing books
        const [searchTerm, setSearchTerm] = useState('');
        const [currentPage, setCurrentPage] = useState(1);
        const [entriesPerPage, setEntriesPerPage] = useState(5);
       const filteredBooks = items.filter(item => {
            return Object.values(item).some(value =>
              String(value).toLowerCase().includes(searchTerm.toLowerCase())
            );
          });
          const indexOfLastEntry = currentPage * entriesPerPage;
          const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
          const currentEntries = filteredBooks.slice(indexOfFirstEntry, indexOfLastEntry);
        
          // Change page
          const paginate = (pageNumber) => setCurrentPage(pageNumber);

        const handleSearchChange = e => {
          setSearchTerm(e.target.value);
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
              <li><a href="/AboutUs/team">Library Committee</a></li>
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
              <Link className="nav-link collapsed" to="/AdminPage/circulationmanagement">
              <i className="bi bi-nut-fill"></i><span>Circulation Management</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to="/AdminPage/reminder">
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
              <h1>General Tables</h1>
              <nav>
                  <ol className="breadcrumb">
                  <li className="breadcrumb-item"  style={{ color: "#ccc" }}><Link style={{ color: "#ccc" }} to="/AdminPage">Home</Link></li>
                  <li className="breadcrumb-item active"  style={{ color: "#ccc" }}>Reminders</li>
                  </ol>
              </nav>
            </div>

            <section className="section">
              <div className="row">
                <div className="col-lg-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Send Email Reminders</h5>
                      <p>Select today's date and click the button below to send email reminders to students who haven't returned their books.</p>
                        <div className="form-group">
                          <label htmlFor="dateSelector">Select Date:</label>
                          <input
                          type="date"
                          id="dateSelector"
                          className="form-control"
                          value={selectedDate}
                          onChange={handleDateChange}
                          />
                          <br />
                        </div>
                      <div className="quill-editor-default"  ref={editorRef}>
                      </div>
                      {selectedEmails.length === 0 || !selectedDate || !message.trim() ? (
                        <p>Please select at least one email, choose a date, and provide a message</p>
                      ) : (
                        <button className="btn btn-primary mt-3" onClick={sendReminders}>
                          Send Reminders
                        </button>
                      )}

                        {messages && <p className="mt-3">{messages}</p>}
                        {selectedEmails.length > 0 && (
                          <div className="mt-3">
                            <h6>Selected Email IDs:</h6>
                            <ul>
                              {selectedEmails.map(email => (
                                <li key={email}>{email}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div className="col-lg-8">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Books Issued by members</h5>
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
                      <div className="table-responsive-wrapper">
                        <table className="table table-responsive table-bordered table-hover">
                        <thead className="thead-dark">
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Select</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email Id</th>
                            <th scope="col">Book Title</th>
                            <th scope="col">Issued Date</th>
                            <th scope="col">Due Date</th>
                            <th scope="col">Reissue</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentEntries.map((item, index) => (
                            <tr key={item.index}>
                              
                              <td>{index + 1}</td>
                              <td>
                                <input
                                  type="checkbox"
                                  onChange={() => handleCheckboxChange(item.email)}
                                />
                              </td>
                              <td>{item.fname} {item.lname}</td>
                              <td>{item.email}</td>
                              <td>{item.bookId}</td>
                              <td>{item.issueDate}</td>
                              <td>{item.returnDate}</td>
                              <td>
                                <button
                                  className="btn btn-primary"
                                  onClick={() => handleReissue(item.email, item.bookId)}
                                >
                                  Reissue
                                </button>
                              </td>   
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => handleDelete(item.email, item.bookId)}
                                >
                                  Delete
                                </button>
                              </td>                                                            
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      </div>
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

export default Reminder;
