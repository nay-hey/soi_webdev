import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Dropdown, DropdownButton, Badge, Image } from 'react-bootstrap';
import './StudentPage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Contactdb = () => {
  const [notifications, setNotifications] = useState([]);



  const [newNot, setNewNot] = useState({
    name: ''
  });
 
 
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNot({ ...newNot, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('New message :', newNot);
      const response = await axios.post('http://localhost:5000/api/notification', newNot);
      console.log('message received duhhh:', response.data);
      setNewNot({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setSubmissionStatus('Thank you for your message!');
    } catch (error) {
      console.error('Error adding a message:', error);
      setSubmissionStatus('An error occurred. Please try again.');
    }
  };

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

  useEffect(() => {
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
              <Link className="nav-link collapsed" to="/StudentPage/profile">
                <i className="bi bi-person"></i>
                <span>Your Profile</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/StudentPage/contact">
                <i className="bi bi-envelope"></i>
                <span>Contact</span>
              </Link>
            </li>
          </ul>
        </aside>
        <main id="main" className="main">
          <div className="pagetitle">
            <h1>Contact</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item" style={{ color: "#ccc" }}><Link style={{ color: "#ccc" }} to="/StudentPage">Home</Link></li>
                <li className="breadcrumb-item active" style={{ color: "#ccc" }}>Contact</li>
              </ol>
            </nav>
          </div>
          <section className="section contact">
            <div className="row gy-4">
              <div className="col-xl-6">
                <div className="row">
                  <div className="col-lg-6" style={{ marginTop: '50px' }}>
                    <div className="info-box card">
                      <i className="bi bi-geo-alt"></i>
                      <h3>Address</h3>
                      <p>A108 Adam Street,<br />New York, NY 535022</p>
                    </div>
                  </div>
                  <div className="col-lg-6" style={{ marginTop: '50px' }}>
                    <div className="info-box card">
                      <i className="bi bi-telephone"></i>
                      <h3>Call Us</h3>
                      <p>+1 5589 55488 55<br />+1 6678 254445 41</p>
                    </div>
                  </div>
                  <div className="col-lg-6" style={{ marginTop: '50px' }}>
                    <div className="info-box card">
                      <i className="bi bi-envelope"></i>
                      <h3>Email Us</h3>
                      <p>info@example.com<br />contact@example.com</p>
                    </div>
                  </div>
                  <div className="col-lg-6" style={{ marginTop: '50px' }}>
                    <div className="info-box card">
                      <i className="bi bi-clock"></i>
                      <h3>Open Hours</h3>
                      <p>Monday - Friday<br />9:00AM - 05:00PM</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-5">
                <div className="card p-4">
                  <form onSubmit={handleSubmit}>
                    <div className="row gy-4">
                      <div className="col-md-12">
                      <label htmlFor="name" className="form-label">Name</label>
                                  <input type="text" className="form-control" id="name" name="name" value={newNot.name} onChange={handleChange} />
                                </div>
                      <div className="col-md-12">
                      <label htmlFor="email" className="form-label">Email</label>
                                  <input type="email" className="form-control" id="email" name="email" value={newNot.email} onChange={handleChange} />
                                </div>
                      <div className="col-md-12">
                      <label htmlFor="subject" className="form-label">Subject</label>
                                  <input type="text" className="form-control" id="subject" name="subject" value={newNot.subject} onChange={handleChange} />
                                </div>
                      <div className="col-md-12">
                      <label htmlFor="message" className="form-label">Message</label>
                      <textarea name="message" className="form-control" placeholder="Message" id="message" rows="4" value={newNot.message} onChange={handleChange}></textarea>
                                </div>
                      <div className="col-md-12 text-center">
                        <button type="submit" className="btn btn-primary">Submit</button>
                      </div>
                    </div>
                  </form>
                  {submissionStatus && (
                    <div className="alert alert-success mt-3" role="alert">
                      {submissionStatus}
                    </div>
                  )}
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

export default Contactdb;
