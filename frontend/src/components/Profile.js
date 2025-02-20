//displays profile of user who has logged in
//can change the password on student page side
import React, { useEffect, useState}  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Dropdown, DropdownButton, Image } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './StudentPage.css';
import { Tooltip } from 'bootstrap';

const Profile = () => {
  //retrieves the user data who has logged in the student page
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); //uses token set on login
        const response = await fetch('http://localhost:5000/api/students/profile', { //uses studentRoutes.js 
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
  
  //handles change in form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //contains form data of resetting password
  const [formData, setFormData] = useState({
    password: '',
    newpassword: '',
    renewpassword: ''
  });

//for submission of new password
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { password, newpassword, renewpassword } = formData;
    if (newpassword !== renewpassword) {
      alert('New passwords do not match.');
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      const studentId = localStorage.getItem('studentId');
  
      if (!studentId) {
        alert('Student ID not found');
        return;
      }
  
      console.log('Token:', token); // Debugging line
      console.log('Student ID:', studentId); // Debugging line
  
      const response = await axios.put(
        `http://localhost:5000/api/students/${studentId}/changepassword`,
        { password, newpassword },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      console.log('Response:', response); // Debugging line
  
      if (response.status === 200) {
        alert('Password changed successfully!');
        setFormData({
          password: '',
          newpassword: '',
          renewpassword: ''
        });
      } else {
        alert(response.data.message || 'Failed to change password. Please try again.');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Failed to change password. Please try again.');
    }
  };
  
  //manages sidebar toggling 
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

  //reponsive view of navigation bar in smaller sized window
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
            <Link className="nav-link collapsed" to="/StudentPage/activity">
            <i className="bi bi-layout-text-window-reverse"></i><span>Your Activity</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link collapsed" to="/StudentPage/bookdb">
            <i className="bi bi-book"></i><span>Book Search</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link " to="/StudentPage/profile">
            <i className="bi bi-person"></i>
            <span>Your Profile</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link collapsed" to="/StudentPage/contact">
            <i className="bi bi-envelope"></i>
            <span>Queries</span>
            </Link>
          </li>
        </ul>
      </aside>
      
      <main id="main" className="main">

        <div className="pagetitle">
        <h1>Profile</h1>
        <nav>
            <ol className="breadcrumb">
            <li className="breadcrumb-item"  style={{ color: "#ccc" }}><Link style={{ color: "#ccc" }} to="/StudentPage">Home</Link></li>
            <li className="breadcrumb-item active"  style={{ color: "#ccc" }}>My Profile</li>
            </ol>
        </nav>
        </div>
      <section className="section profile">
        <div className="row">
          <div className="col-xl-4">
            <div className="card">
              <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                <Image
                  src="/static/adminpage/profile.png"
                  alt="Profile"
                />
                <h2>{profile.name}</h2>
                <h3>{profile.position}</h3>
              </div>
            </div>
          </div>            

          <div className="col-xl-8">
            <div className="card">
              <div className="card-body pt-3">
                <ul class="nav nav-tabs nav-tabs-bordered">
                  <li class="nav-item">
                    <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
                  </li>
                  <li class="nav-item">
                    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Change Password</button>
                  </li>
                </ul>
                
                <div class="tab-content pt-2">
                  <div class="tab-pane fade show active profile-overview" id="profile-overview">
                    <h5 className="card-title">Profile Details</h5>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Full Name</div>
                      <div className="col-lg-9 col-md-8">{profile.name}</div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Position</div>
                      <div className="col-lg-9 col-md-8">{profile.position}</div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Email</div>
                      <div className="col-lg-9 col-md-8">{profile.email}</div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Roll Number</div>
                      <div className="col-lg-9 col-md-8">{profile.roll}</div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Branch</div>
                      <div className="col-lg-9 col-md-8">{profile.branch}</div>
                    </div>
                  </div>
                  <div class="tab-pane fade pt-3" id="profile-change-password">
                    <form onSubmit={handleSubmit}>
                      <div className="row mb-3">
                        <label htmlFor="currentPassword" className="col-md-4 col-lg-3 col-form-label">Current Password</label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="password"
                            type="password"
                            className="form-control"
                            id="currentPassword"
                            value={formData.password}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label htmlFor="newPassword" className="col-md-4 col-lg-3 col-form-label">New Password</label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="newpassword"
                            type="password"
                            className="form-control"
                            id="newPassword"
                            value={formData.newpassword}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label htmlFor="renewPassword" className="col-md-4 col-lg-3 col-form-label">Re-enter New Password</label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="renewpassword"
                            type="password"
                            className="form-control"
                            id="renewPassword"
                            value={formData.renewpassword}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="text-center">
                        <button type="submit" className="btn btn-primary">Change Password</button>
                      </div>
                    </form>
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

export default Profile;
