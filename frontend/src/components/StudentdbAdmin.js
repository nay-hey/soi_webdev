//page that allows admin to add, delete, edit student user.
//entire student database can be seen. Instead of registration we have allowed this facility
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tooltip } from 'bootstrap';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownButton, Badge, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './AdminPage.css';

import { useNavigate } from 'react-router-dom';

const Studentdb = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);

//to create new student user
  const [newStudent, setNewStudent] = useState({ name: '', roll: '', email: '', branch: '',  password: '', position: ''});


  useEffect(() => {
    fetchStudents();
  }, []);

//Function to retrieve database information
  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

   // Function to handle form input changes
   const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

    // Function to handle form submission (adding a new member to the library)
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!newStudent.name || !newStudent.roll || !newStudent.email || !newStudent.branch || !newStudent.password || !newStudent.position) {
        alert('Please fill in all fields.');
        return;
      }
      try {
        console.log('New student data:', newStudent);
        
        const response2 = await axios.get(`http://localhost:5000/api/students/search?category=roll&keyword=${newStudent.roll}`);
        console.log("fge", response2)
        if (!response2.data || response2.data.length === 0) {
        const response = await axios.post('http://localhost:5000/api/students', newStudent);
       
        console.log('student added:', response.data);
        setNewStudent({
         name: '',
          roll: '', 
          email: '',
          branch: '',
          password: '',
          position: ''
        });
      
        fetchStudents();
        window.location.reload(); 
      }
      else {        
        throw new Error("Roll Number exists in the database.")
      }
    } catch (error) {
      console.error('Error adding students:', error);
      if (error.response && error.response.data) {
        // Display backend error message if available
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert('Error adding student.');
      }
    }
  };
  //function to delete any user
  const handleDeleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      setStudents(students.filter(student => student._id !== id));
      fetchStudents(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  //search feature in the table
  const [searchTerm, setSearchTerm] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const filteredStudents = students.filter(student => {
    return Object.values(student).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredStudents.slice(indexOfFirstEntry, indexOfLastEntry);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to handle search term change
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
                {/*--------Header section: contains navigation tab and institute logo--------*/}
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
{/*--------End og Header section----------*/}

        <aside id="sidebar" className="sidebar">
{/* >>>Sidebar section containing tabs such as Student Database, Book Datebase, Circular Management, 
Reminder, Profile Edit and Notification*/}
            <ul className="sidebar-nav" id="sidebar-nav">

            <li className="nav-item">
                <Link className="nav-link collapsed" to="/AdminPage">
                <i className="bi bi-grid"></i>
                <span>Home</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link " to="/AdminPage/studentdb">
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
            </li> <li className="nav-item">
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
{/*-----End of sidebar navigation tabs-----*/}

{/*---------Main content section--------*/}
        <main id="main" className="main">
          {/*Main Page contains three tables that we navigated across*/}
          <div className="pagetitle">
            {/*--------Student Data Table------*/}
            <h1>Student Data</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item" style={{ color: "#ccc" }}>
                  <Link style={{ color: "#ccc" }} to="/AdminPage">Home</Link>
                </li>
                <li className="breadcrumb-item active" style={{ color: "#ccc" }}>Student Database</li>
              </ol>
            </nav>
          </div>
{/*----The student Database Page contains three tables namely: Student Data, Add Member, Delete Member--------*/}
          <section className="section">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body pt-3">
                    <ul className="nav nav-tabs nav-tabs-bordered">
                      <li className="nav-item">
                        <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Student Data</button>
                      </li>
                      <li className="nav-item">
                        <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Add Member</button>
                      </li>
                      <li className="nav-item">
                        <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-settings">Delete Member</button>
                      </li>
                    </ul>
                    <div className="tab-content pt-2">
                      {/*Feature to search a library member*/}
                      <div className="tab-pane fade show active profile-overview" id="profile-overview">
                      <div className="search-container">
                  <input
                    type="text"
                    placeholder="Search by title ..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  {/*Feature for varying the number of student entries per page*/}
                  <select
                    className="form-control"
                    value={entriesPerPage}
                    onChange={(e) => setEntriesPerPage(parseInt(e.target.value))}
                  >
                    <option value="5">5 entries per page</option>
                    <option value="10">10 entries per page</option>
                    <option value={filteredStudents.length}>All entries</option>
                  </select>
                </div>
                {/*Student Data Table columns*/}
                          <div className="table-responsive-wrapper">
                          <table className="table table-responsive table-bordered table-hover">
                          <thead>
                            <tr>
                              <th>Position</th>
                              <th>Name</th>
                              <th>Roll Number</th>
                              <th>Email</th>
                              <th>Branch</th>
                             
                            </tr>
                          </thead>
                          <tbody>
                            {currentEntries.map(student => (
                              <tr key={student._id}>
                                <td>{student.position}</td>
                                <td>{student.name}</td>
                                <td>{student.roll}</td>
                                <td>{student.email}</td>
                                <td>{student.branch}</td>
                                
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        </div>
                        <div>
                        <nav aria-label="Page navigation example">
                          {/*Pagination Feature that can help the user to navigate across different entries*/}
                          <ul className="pagination">
                            {Array.from({ length: Math.ceil(filteredStudents.length / entriesPerPage) }, (_, index) => (
                              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</button>
                              </li>
                            ))}
                          </ul>
                        </nav>
                      </div>
                      </div>

                      <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
                        <div className="row">
                          <div className="card">
                            <div className="card-body">
                              {/*--------Add Member Table - Contains a form to add the detailsof a new member 
                              and save it in the database -------*/}
                              {/*The fields in the form include: Name, Roll number, Email, Branch, Position and password*/}
                              <h5 className="card-title">Add Member</h5>
                              <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                  <label htmlFor="name" className="form-label">Name</label>
                                  <input type="text" className="form-control" id="name" name="name" value={newStudent.name} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="roll" className="form-label">Roll Number</label>
                                  <input type="text" className="form-control" id="roll" name="roll" value={newStudent.roll} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="email" className="form-label">Email</label>
                                  <input type="email" className="form-control" id="email" name="email" value={newStudent.email} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="branch" className="form-label">Branch</label>
                                  <select className="form-control" id="branch" name="branch" value={newStudent.branch} onChange={handleChange}>
                                    <option value="">Select Branch</option>
                                    <option value="Mathematics and Computing">Mathematics and Computing</option>
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Electrical Engineering">Electrical Engineering</option>
                                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                                    <option value="Engineering Physics">Engineering Physics</option>
                                    <option value="Chemical Engineering">Chemical Engineering</option>
                                    <option value="Civil Engineering">Civil Engineering</option>
                                    <option value="BSMS">BSMS</option>
                                    {/* Add more options as needed */}
                                  </select>

                                </div>
                                <div className="mb-3">
                                  <label htmlFor="position" className="form-label">Position</label>
                                  <select className="form-control" id="position" name="position" value={newStudent.position} onChange={handleChange}>
                                    <option value="">Select Position</option>
                                    <option value="Student">Student</option>
                                    <option value="Faculty">Faculty</option>
                                    <option value="Admin">Admin</option>
                                    {/* Add more options as needed */}
                                  </select>

                                </div>
                                <div className="mb-3">
                                  <label htmlFor="password" className="form-label">Password</label>
                                  <input type="password" className="form-control" id="password" name="password" value={newStudent.password} onChange={handleChange} />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="tab-pane fade pt-3" id="profile-settings">
                        {/*----------Delete Member Table-------*/}
                        <h6>Delete Member</h6>
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
                        <option value={filteredStudents.length}>All entries</option>
                      </select>
                    </div>
                    {/*Table Columns*/}
                          <div className="table-responsive-wrapper">
                          <table className="table table-responsive table-bordered table-hover">
                          <thead>
                            <tr>
                              <th>Position</th>
                              <th>Name</th>
                              <th>Roll Number</th>
                              <th>Email</th>
                              <th>Branch</th>
                            
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentEntries.map(student => (
                              <tr key={student._id}>
                                <td>{student.position}</td>
                                <td>{student.name}</td>
                                <td>{student.roll}</td>
                                <td>{student.email}</td>
                                <td>{student.branch}</td>
                                
                                <td>
                                  <button className="btn btn-danger" onClick={() => handleDeleteStudent(student._id)}>Delete</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        </div>
                        <div>
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      {Array.from({ length: Math.ceil(filteredStudents.length / entriesPerPage) }, (_, index) => (
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
          </section>
        </main>
                            {/*------- footer section-----*/}
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
