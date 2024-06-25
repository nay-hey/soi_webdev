import React, { useEffect, useRef, useState}  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Dropdown, DropdownButton, Badge, Image } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import './AdminPage.css';
import { Tooltip } from 'bootstrap';

const Profile = () => {
    const [profile, setProfile] = useState({
        id: 1,
        img: 'static/lib1.jpg',
        name: 'Kevin Anderson',
        position: 'Admin',
        email: '220010034@iitdh.ac.in',
        rollno: '220010034',
        branch: 'Computer Science and Engineering',
        joindate: '27/1/04',
      });
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
        <li className="nav-item dropdown me-3">
          <DropdownButton
            menuAlign="right"
            title={
              <span className="nav-link nav-icon">
                <i className="bi bi-bell"></i>
                <Badge bg="primary" className="badge-number">
                  4
                </Badge>
              </span>
            }
            id="dropdown-notifications"
          >
            <Dropdown.Header>You have 4 new notifications</Dropdown.Header>
            <Dropdown.Divider />
            <Dropdown.Item className="notification-item">
              <i className="bi bi-exclamation-circle text-warning"></i>
              <div>
                <h4>Lorem Ipsum</h4>
                <p>Quae dolorem earum veritatis oditseno</p>
                <p>30 min. ago</p>
              </div>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className="notification-item">
              <i className="bi bi-x-circle text-danger"></i>
              <div>
                <h4>Atque rerum nesciunt</h4>
                <p>Quae dolorem earum veritatis oditseno</p>
                <p>1 hr. ago</p>
              </div>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className="notification-item">
              <i className="bi bi-check-circle text-success"></i>
              <div>
                <h4>Sit rerum fuga</h4>
                <p>Quae dolorem earum veritatis oditseno</p>
                <p>2 hrs. ago</p>
              </div>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className="notification-item">
              <i className="bi bi-info-circle text-primary"></i>
              <div>
                <h4>Dicta reprehenderit</h4>
                <p>Quae dolorem earum veritatis oditseno</p>
                <p>4 hrs. ago</p>
              </div>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className="dropdown-footer">
              <Link to="#">Show all notifications</Link>
            </Dropdown.Item>
          </DropdownButton>
        </li>

        <li className="nav-item dropdown me-3">
          <DropdownButton
            menuAlign="right"
            title={
              <span className="nav-link nav-icon">
                <i className="bi bi-chat-left-text"></i>
                <Badge bg="success" className="badge-number">
                  3
                </Badge>
              </span>
            }
            id="dropdown-messages"
          >
            <Dropdown.Header>You have 3 new messages</Dropdown.Header>
            <Dropdown.Divider />
            <Dropdown.Item className="message-item">
              <Link to="#">
                <Image
                  src="assets/img/messages-1.jpg"
                  alt=""
                  className="rounded-circle me-3"
                />
                <div>
                  <h4>Maria Hudson</h4>
                  <p>
                    Velit asperiores et ducimus soluta repudiandae labore
                    officia est ut...
                  </p>
                  <p>4 hrs. ago</p>
                </div>
              </Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className="message-item">
              <Link to="#">
                <Image
                  src="assets/img/messages-2.jpg"
                  alt=""
                  className="rounded-circle me-3"
                />
                <div>
                  <h4>Anna Nelson</h4>
                  <p>
                    Velit asperiores et ducimus soluta repudiandae labore
                    officia est ut...
                  </p>
                  <p>6 hrs. ago</p>
                </div>
              </Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className="message-item">
              <Link to="#">
                <Image
                  src="assets/img/messages-3.jpg"
                  alt=""
                  className="rounded-circle me-3"
                />
                <div>
                  <h4>David Muldon</h4>
                  <p>
                    Velit asperiores et ducimus soluta repudiandae labore
                    officia est ut...
                  </p>
                  <p>8 hrs. ago</p>
                </div>
              </Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className="dropdown-footer">
              <Link to="#">Show all messages</Link>
            </Dropdown.Item>
          </DropdownButton>
        </li>

        <li className="nav-item dropdown">
          <DropdownButton
            menuAlign="right"
            title={
              <span className="nav-link nav-profile d-flex align-items-center pe-0">
                <Image
                  src="static/adminpage/profile.png"
                  alt="Profile"
                  className="rounded-circle me-2"
                />
                <span className="d-none d-md-block">
                  K. Anderson
                </span>
              </span>
            }
            id="dropdown-profile"
          >
            <Dropdown.Header>
              <h6>Kevin Anderson</h6>
              <span>Admin</span>
            </Dropdown.Header>
            <Dropdown.Divider />
            <Dropdown.Item>
              <Link className="dropdown-item d-flex align-items-center" to="/profile">
                <i className="bi bi-person"></i>
                <span>My Profile</span>
              </Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              <Link className="dropdown-item d-flex align-items-center" to="/studentprofile">
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
                <Link className="nav-link " to="/studentprofile">
                <i className="bi bi-person"></i>
                <span>Profile Edit</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link collapsed" to="/notification">
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
            <li className="breadcrumb-item active"  style={{ color: "#ccc" }}>My Profile</li>
            </ol>
        </nav>
        </div>
        <section className="section profile">
        <div className="row">
            <div className="col-xl-4">

            <div className="card">
                            <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                            <img src={profile.img} alt="Profile" className="rounded-circle" />
                            <h2>{profile.name}</h2>
                            <h3>{profile.position}</h3>
                            </div>
                        </div>
                </div>            

            <div className="col-xl-8">

            <div className="card">
                <div className="card-body pt-3">

                <div className="profile-overview">
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
                                    <div className="col-lg-9 col-md-8">{profile.rollno}</div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-3 col-md-4 label">Branch</div>
                                    <div className="col-lg-9 col-md-8">{profile.branch}</div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-3 col-md-4 label">Join Date</div>
                                    <div className="col-lg-9 col-md-8">{profile.joindate}</div>
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
