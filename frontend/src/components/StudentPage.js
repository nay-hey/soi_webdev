import React, { useEffect, useRef, useState}  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Dropdown, DropdownButton, Badge, Image } from 'react-bootstrap';
import './StudentPage.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: rgba(240, 244, 248, 0.8);
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  color: #004085;
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h2`
  color: #0056b3;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const Description = styled.p`
  color: #6c757d;
  font-size: 1.25rem;
  max-width: 800px;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  width: 300px;
  text-align: left;
`;

const CardTitle = styled.h3`
  color: #0056b3;
  margin-bottom: 1rem;
`;

const CardContent = styled.p`
  color: #6c757d;
`;
const StudentPage = () => {

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

  return (
    <div>
      <section id="student">
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
            <div className="logo d-flex align-items-center">
              <img src="/static/logo.svg.png" alt="IIT Dharwad Logo" />
              <h1>IIT Dharwad</h1>
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
        </div>
        <nav className="header-nav ms-auto">
      <ul className="d-flex align-items-center list-unstyled m-0">
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
            <Link className="nav-link " to="/StudentPage">
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
                <Link className="nav-link collapsed" to="/StudentPage/contact">
                <i class="bi bi-envelope"></i>
                <span>Contact</span>
                </Link>
            </li>
        </ul>

        </aside>
        <main id="main" className="main" >

        <div className="pagetitle">
        <h1>Home</h1>
        <nav>
            <ol className="breadcrumb">
            <li className="breadcrumb-item active" style={{ color: "#ccc" }}>Home</li>
            </ol>
        </nav>
        </div>
        <Container>
    <MainContent>
      <Title>Welcome to the College Library Management System</Title>
      <Subtitle>Your Gateway to Knowledge</Subtitle>
      <Description>
        Explore a vast collection of books, journals, and digital resources.
        Manage your loans, track your borrowing history, and stay updated with
        the latest library events. Our system provides easy access to all the
        resources you need for your academic success.
      </Description>
      <CardContainer>
        <Card>
          <CardTitle>Extensive Resources</CardTitle>
          <CardContent>
            Access a wide range of books, journals, and digital materials to support your studies.
          </CardContent>
        </Card>
        <Card>
          <CardTitle>User-Friendly Interface</CardTitle>
          <CardContent>
            Our system is designed to be intuitive and easy to use, making it simple to find what you need.
          </CardContent>
        </Card>
        <Card>
          <CardTitle>24/7 Support</CardTitle>
          <CardContent>
            Get help whenever you need it with our round-the-clock support services.
          </CardContent>
        </Card>
      </CardContainer>
    </MainContent>
  </Container>
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

export default StudentPage;
