//displays student activity on Student Page 
//uses the logged in profile id to display the reccomended book list, book issue history and reminder notifications for due dates
import React, { useEffect, useState}  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Dropdown, DropdownButton, Image } from 'react-bootstrap';
import axios from 'axios';
import './StudentPage.css';
import 'simple-datatables/dist/style.css';
import { Tooltip } from 'bootstrap';
import { Link } from 'react-router-dom';

const Studentdb = () => {
  //catches the profile of the logged in user.
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); //uses the token set during login
        const response = await fetch('http://localhost:5000/api/students/profile', { //router is name profile in studentRoutes.js of backend
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const profileData = await response.json();
        setProfile(profileData);
      } catch (error) {
        console.error('Error fetching profile:', error.message);
      }
    };

    fetchProfile();
  }, []);
  
  //sets the issue history of the user
  const [items, setItem] = useState([]);
  const fetchItem = async () => {
    if (profile) { // Only fetch items if profile is set
      try {
        const response = await axios.get('http://localhost:5000/api/issues'); //issueRoutes is used
        const filtered = response.data.filter(issue => issue.rollno == profile.roll); //displays only the user history using roll number as the unique key
         
        // Apply date formatting for issueDate and returnDate
        const formattedItems = filtered.map(item => ({
          ...item,
          issueDate: new Date(item.issueDate).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          returnDate: new Date(item.returnDate).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        }));

        setItem(formattedItems);
        // Calculate fine amount based on 'Late Return' and 'Returned - book damage' statuses
        const redCellsCount = filtered.reduce((count, item) => {
          if (item.status === 'Late Return' || item.status === 'Returned - book damage') {
            return count + 1;
          }
          return count;
        }, 0);

        const fine = redCellsCount * 200;
        setFineAmount(fine); // Update fineAmount state
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    }
  };
  useEffect(() => {
    fetchItem();
  }, [profile]); 
  //fines

  const [fineAmount, setFineAmount] = useState(0);
  
//used for the search section and pagination - all used for the issue table
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
//sets the search Term
  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
  };
  const getStatusColor = (status) => {
    switch (status) {
      case 'Issued':
        return '#ffffe0';
      case 'Returned':
        return '#e0ffe0';
      case 'Late Return':
      case 'Returned - book damage':
        return '#ffe0e0';
      default:
        return 'transparent';
    }
  };
  
  //labels the due date
  const getDueDateColor = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const timeDiff = due - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
//black for past due date, red for 3 days remaining for due dats and green for not yet returned books.
    if (daysDiff < 0) {
      return 'black';
    } else if (daysDiff <= 3) {
      return 'red';
    } else {
      return 'green';
    }
  };

  const handleDelete = async (email, bookId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/issues/${encodeURIComponent(email)}/${encodeURIComponent(bookId)}`);
      console.log(response.data.message);
      fetchItem();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  //used to toggle the sidebar with all the tabs for navigation
  useEffect(() => {
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      const tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => {
        return new Tooltip(tooltipTriggerEl);
      });
    }, []);
const [isSidebarToggled, setIsSidebarToggled] = useState(false);

useEffect(() => {
  const toggleSidebar = () => {
    setIsSidebarToggled(prevState => !prevState);
  };

  const toggleButton = document.querySelector('.toggle-sidebar-btn');
  if (toggleButton) {
    toggleButton.addEventListener('click', toggleSidebar);
  }

  return () => {
    if (toggleButton) {
      toggleButton.removeEventListener('click', toggleSidebar);
    }
  };
}, []);

useEffect(() => {
  if (isSidebarToggled) {
    document.body.classList.add('toggle-sidebar');
  } else {
    document.body.classList.remove('toggle-sidebar');
  }
}, [isSidebarToggled]);

//header is using this feature of sticked on scrolling down. reduces height on scrolling down.
useEffect(() => {
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
    <section id="student">
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
                  <Link className="dropdown-item d-flex align-items-center" to="/StudentPage/profile">
                    <i className="bi bi-person"></i>
                    <span>My Profile</span>
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
              <Link className="nav-link collapsed" to="/StudentPage">
              <i className="bi bi-grid"></i>
              <span>Home</span>
              </Link>
          </li>
          <li className="nav-item">
              <Link className="nav-link " to="/StudentPage/activity">
              <i className="bi bi-layout-text-window-reverse"></i><span>Your Activity</span>
              </Link>
          </li>
          <li className="nav-item">
              <Link className="nav-link collapsed" to="/StudentPage/bookdb">
              <i className="bi bi-book"></i><span>Book Search</span>
              </Link>
          </li>
          <li className="nav-item">
              <Link className="nav-link collapsed" to="/StudentPage/profile">
              <i className="bi bi-person"></i>
              <span>Your Profile</span>
              </Link>
          </li>
          <li className="nav-item">
              <Link className="nav-link collapsed" to="/StudentPage/contact">
              <i class="bi bi-envelope"></i>
              <span>Contact</span>
              </Link>
          </li>
        </ul>
      </aside>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Student Data</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"  style={{ color: "#ccc" }}><Link style={{ color: "#ccc" }} to="/AdminPage">Home</Link></li>
              <li className="breadcrumb-item active"  style={{ color: "#ccc" }}>Activity</li>
            </ol>
          </nav>
        </div>

          <section className="section">
            <div className="row">
              <div className="card">
                <div className="card-body pt-3">
                  <ul className="nav nav-tabs nav-tabs-bordered"> 
                    <li className="nav-item">
                      <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#notifications">Notifications</button>
                    </li> 
                    <li className="nav-item">
                      <button className="nav-link" data-bs-toggle="tab" data-bs-target="#history">History</button>
                    </li>
                  </ul>
                    
                  <div className="tab-content pt-2">  
                    <div className="tab-pane fade show active notifications" id="notifications">
                      <section id="team" className="team">
                        <div className="container">
                          <div className="section-header">
                            <h2>Based on your history...</h2>
                          </div>
                          <div className="team-wrapper">
                            <div className="team-row">
                              <div className="member"  style={{ backgroundImage: "url('/static/book_img/Principles of Chemical Engineering Processes.png')" }}>
                                <div className="description">
                                  <h3>Principles of Chemical</h3>
                                  <h3>Engineering Processes</h3>
                                  <p>Comprehensive guide to material and energy balance calculations in chemical processes.</p>
                                </div>
                              </div>
                              <div className="member"  style={{ backgroundImage: "url('/static/book_img/Introduction to Engineering Experimentation.png')" }}>
                                <div className="description">
                                  <h3>Introduction to Engineering </h3>
                                  <h3>Experimentation</h3>
                                  <p>Guide to the principles and practices of engineering experimentation.</p>
                                </div>
                              </div>
                              <div className="member"  style={{ backgroundImage: "url('/static/book_img/Electromagnetics for Engineers.png')" }}>
                                <div className="description">
                                  <h3>Electromagnetics for Engineers</h3>
                                  <p>Introduction to the principles and applications of electromagnetics for engineers.</p>
                                </div>
                              </div>
                              <div className="member"  style={{ backgroundImage: "url('/static/book_img/Construction Planning, Equipment, and Methods.png')" }}>
                                <div className="description">
                                  <h3>Construction Planning,</h3>
                                  <h3> Equipment, and Methods</h3>
                                  <p>Guide to the planning and methods of construction projects.</p>
                                </div>
                              </div>
                            </div>
                            <div className="team-row">
                              <div className="member"  style={{ backgroundImage: "url('/static/book_img/Operating System Concepts.png')" }}>
                                <div className="description">
                                  <h3>Operating System Concepts</h3>
                                  <p>In-depth look at the design and implementation of operating systems.</p>
                                </div>
                              </div>
                              <div className="member"  style={{ backgroundImage: "url('/static/book_img/Electrical Engineering.png')" }}>
                                <div className="description">
                                  <h3>Electrical Engineering: </h3>
                                  <h3>Principles and Applications</h3>
                                  <p>Comprehensive guide to fundamental principles and applications of electrical engineering.</p>
                                </div>
                              </div>
                              <div className="member"  style={{ backgroundImage: "url('/static/book_img/Transportation Engineering and Planning.png')" }}>
                                <div className="description">
                                  <h3>Transportation Engineering</h3>
                                  <h3>and Planning</h3>
                                  <p>Fundamentals of transportation engineering and planning concepts.</p>
                                </div>
                              </div>
                              <div className="member"  style={{ backgroundImage: "url('/static/book_img/Masonry Structures.png')" }}>
                                <div className="description">
                                  <h3>Masonry Structures:</h3>
                                  <h3>Behavior and Design</h3>
                                  <p>Comprehensive guide to the behavior and design of masonry structures.</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                    
                    <div className="tab-pane fade notifications pt-3" id="history">
                      <div className="row">
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
                                  <th scope="col">Email Id</th>
                                  <th scope="col">Book Title</th>
                                  <th scope="col">Satus</th>
                                  <th scope="col">Issued Date</th>
                                  <th scope="col">Due Date</th>
                                  <th scope="col">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {currentEntries.map((item, index) => (
                                  <tr key={item.index}>          
                                    <td>{index + 1}</td>
                                    <td>{item.email}</td>
                                    <td>{item.bookId}</td>
                                    <td style={{ backgroundColor: getStatusColor(item.status) }}>{item.status}</td>
                                    <td>{item.issueDate}</td>
                                    <td style={{ color: getDueDateColor(item.returnDate) }}>{item.returnDate}</td>
                                    <td>
                                      {item.status !== 'Issued' && (
                                        <button
                                          className="btn btn-danger"
                                          onClick={() => handleDelete(item.email, item.bookId)}
                                        >
                                          Delete
                                        </button>
                                      )}
                                    </td>  
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <div>
                              <p>Total Fine Amount: {fineAmount}</p>
                            </div>
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

export default Studentdb;
