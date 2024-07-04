//displays profile data on Admin Page 
//search for a profie and make edits if required
import React, { useEffect, useState}  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Dropdown, DropdownButton, Image } from 'react-bootstrap';
import axios from 'axios';

import { Link } from 'react-router-dom';
import './AdminPage.css';
import { Tooltip } from 'bootstrap';

const StudentProfile = () => {
  //to take care of search tab
  const [searchInput, setSearchInput] = useState('');
  //holds the profile details
  const [profile, setProfile] = useState({
    _id: '',
    name: '',
    roll: '',
    email: '',
    branch: '',
  });
  // Function to handle searching profile based on category and input
  const handleSearch = async () => {
    console.log('Profile search');
    try {
      const response = await axios.get(`http://localhost:5000/api/students/search?category=name&keyword=${searchInput}`);
      setProfile(response.data);
    } catch (error) {
      console.error('Error searching for profile:', error);
    } finally {
    }
  };
  //to edit profile details
  const [profileItem, setProfileItem] = useState(profile);
  //function to handle form for editing profile 
  const handleEditBookDetails = async (e) => {
    e.preventDefault();
    try {
      const updatedProfileItem = {
        ...profileItem,
        name: e.target.elements.name.value,
        roll: e.target.elements.roll.value,
        email: e.target.elements.email.value,
        branch: e.target.elements.branch.value,
        _id: profile[0]._id
        // Add other fields similarly
      };
      // Example fetch request to update profile details
      const response = await fetch(`http://localhost:5000/api/students/${updatedProfileItem._id}`, {
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
      
    } catch (error) {
      console.error('Error updating book details:', error);
      // Optionally handle error, e.g., show an error message to the user
    }
  };
  //handles sidebar functionality
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
              <Link className="nav-link collapsed" to="/AdminPage/reminder">
              <i className="bi bi-alarm-fill"></i><span>Reminder</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to="/AdminPage/studentprofile">
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
                  <h1>Profile</h1>
                  <nav>
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"  style={{ color: "#ccc" }}><Link style={{ color: "#ccc" }} to="/AdminPage">Home</Link></li>
                      <li className="breadcrumb-item active"  style={{ color: "#ccc" }}>Profile Edit</li>
                    </ol>
                  </nav>
                </div>

                <section className="section profile">
                  <div className="container">
                    <div className="row gy-4 justify-content-center justify-content-lg-between">
                      <div className="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center">            
                        <div className="col-xl-4 profile-search">
                          <input
                            type="text"
                            id="keyword-input"
                            placeholder="Search for a profile..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                          />
                          <button id="search-button" onClick={handleSearch}>Search</button>
                        </div>
                        <div className="d-flex">
                        </div>
                      </div>
                      <div className="col-lg-5 order-1 order-lg-2 hero-img">
                        <img src="/static/adminpage/profilebar.png" className="img-fluid" alt="" />
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
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-8">
                            <div className="card">
                              <div className="card-body pt-3">
                                <ul className="nav nav-tabs nav-tabs-bordered">
                                  <li className="nav-item">
                                    <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Profile Details</button>
                                   </li>
                                   <li className="nav-item">
                                     <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit Profile</button>
                                    </li>
                                </ul>
                                <div className="tab-content pt-2">
                                  <div className="tab-pane fade show active profile-overview" id="profile-overview">
                                    <h5 className="card-title">Profile Details</h5>
                                    <div className="row">
                                      <div className="col-lg-3 col-md-4 label">Full Name</div>
                                      <div className="col-lg-9 col-md-8">{profileItem.name}</div>
                                    </div>
                                    <div className="row">
                                      <div className="col-lg-3 col-md-4 label">Position</div>
                                      <div className="col-lg-9 col-md-8">{profileItem.position}</div>
                                    </div>
                                    <div className="row">
                                      <div className="col-lg-3 col-md-4 label">Email</div>
                                      <div className="col-lg-9 col-md-8">{profileItem.email}</div>
                                    </div>
                                    <div className="row">
                                      <div className="col-lg-3 col-md-4 label">Roll Number</div>
                                      <div className="col-lg-9 col-md-8">{profileItem.roll}</div>
                                    </div>
                                    <div className="row">
                                      <div className="col-lg-3 col-md-4 label">Branch</div>
                                      <div className="col-lg-9 col-md-8">{profileItem.branch}</div>
                                    </div>
                                    <div className="row">
                                      <div className="col-lg-3 col-md-4 label">Join Date</div>
                                      <div className="col-lg-9 col-md-8">{profileItem.joindate}</div>
                                    </div>
                                  </div>
                                  
                                  <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
                                    <form onSubmit={handleEditBookDetails}>
                                      <div className="row mb-3">
                                        <label htmlFor="inputText" className="col-sm-2 col-form-label">
                                          Name
                                        </label>
                                        <div className="col-sm-10">
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            defaultValue={profileItem.name}
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
                                            id="branch"
                                            name="branch"
                                            defaultValue={profileItem.branch}
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
                                          Roll Number
                                        </label>
                                        <div className="col-sm-10">
                                          <input
                                            type="number"
                                            className="form-control"
                                            id="roll"
                                            name="roll"
                                            defaultValue={profileItem.roll}
                                            />
                                        </div>
                                      </div>
                                
                                      <div className="row mb-3">
                                        <label htmlFor="inputText" className="col-sm-2 col-form-label">
                                          Email Id
                                        </label>
                                        <div className="col-sm-10">
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            defaultValue={profileItem.email}
                                            />
                                        </div>
                                      </div>
                                      <button type="submit" className="btn btn-primary">
                                        Save Changes
                                      </button>
                                    </form>
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

export default StudentProfile;
