import React, { useEffect, useRef, useState}  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Dropdown, DropdownButton, Badge, Image } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';

import './StudentPage.css';
import { Tooltip } from 'bootstrap';
import { Link } from 'react-router-dom';

const Bookdb = () => {
  //catches the profile of the logged in user.
  const [user, setUser] = useState(null);
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
        setUser(profileData);
      } catch (error) {
        console.error('Error fetching profile:', error.message);
      }
    };

    fetchProfile();
  }, []);

  const [searchInput, setSearchInput] = useState('');
  const [searchCategory, setSearchCategory] = useState('title');
  const [profile, setProfile] = useState({
    _id: '',
    title: '',
    description: '',
    author: '',
    genre: '',
    department: '',
    count: 0,
    vendor: '',
    vendor_id: 0,
    publisher: '',
    publisher_id: 0,
    imageUrl: '',
    likes: 0
  });
  // Function to handle searching books based on category and input
  const handleSearch = async () => {
    console.log('Book search');
    try {
      const response = await axios.get(`http://localhost:5000/api/books/search?category=${searchCategory}&keyword=${searchInput}`);
      setProfile(response.data);
    } catch (error) {
      console.error('Error searching for book:', error);
    } finally {
    }
  };
  const handleLike = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/books/${id}/like`, {
        userId: user._id, // Sending user ID along with the request
      });

      // Update profile state to reflect the updated liked status
      const updatedProfile = profile.map(book => {
        if (book._id === id) {
          return {
            ...book,
            likes: response.data.likes,
            likedBy: response.data.likedBy,
          };
        }
        return book;
      });
      setProfile(updatedProfile);
    } catch (error) {
      console.error('Error liking the book:', error);
    }
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
                <Link className="nav-link " to="/StudentPage/bookdb">
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
                <i className="bi bi-envelope"></i>
                <span>Contact</span>
                </Link>
            </li>
            </ul>

            </aside>
            <main id="main" className="main">

                <div className="pagetitle">
                <h1>Data Tables</h1>
                <nav>
                    <ol className="breadcrumb">
                    <li className="breadcrumb-item"  style={{ color: "#ccc" }}><Link style={{ color: "#ccc" }}  to="/StudentPage">Home</Link></li>
                    <li className="breadcrumb-item active"  style={{ color: "#ccc" }}>Book Search</li>
                    </ol>
                </nav>
                </div>
                <section id="profile-search">
            <div className="container">
              <div className="row gy-4 justify-content-center justify-content-lg-between">
                <div className="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center">
                  <div className="col-xl-4 profile-search">
                    <div className="search-box">
                      <select
                        id="search-category-title"
                        style={{ borderRight: '1px solid #654321' }}
                        onChange={(e) => setSearchCategory(e.target.value)}
                      >
                        <option value="title">Title</option>
                        <option value="description">Description</option>
                        <option value="author">Author</option>
                        <option value="genre">Genre</option>
                        <option value="department">Department</option>
                        <option value="vendor">Vendor</option>
                        <option value="publisher">Publisher</option>
                      </select>
                      <input
                        type="text"
                        id="keyword-input"
                        placeholder="Enter Keyword..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                      />
                      <button id="search-button" onClick={handleSearch}>Search</button>
                    </div>
                  </div>
                  <div className="d-flex">
                    {/* Any additional content */}
                  </div>
                </div>
                <div className="col-lg-5 order-1 order-lg-2 hero-img">
                  <img src="/static/adminpage/booksearch.png" className="img-fluid" alt="" />
                </div>
              </div>
            </div>

            {profile.length > 0 ? (
              <div className="container">
                <div className="row">
                  {profile.map((profileItem, index) => (
                    <div key={profileItem._id} className="col-xl-4">
                      <div className="card">
                        <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                          <img src={profileItem.imageUrl} alt="Profile" />
                          <h2>{profileItem.title}</h2>
                          <h3>{profileItem.description}</h3>
                          <button onClick={() => handleLike(profileItem._id)} className="like-button">
                            <FontAwesomeIcon
                              icon={profileItem.likedBy.includes(user._id) ? faHeartSolid : faHeartRegular}
                              className={`heart-icon ${profileItem.likedBy.includes(user._id) ? 'liked' : ''}`}
                            />
                            {profileItem.likes}
                          </button>
                        </div>
                        </div>
                      </div>
                    ))}
                  <div className="col-xl-8">
                    <div className="card">
                      <div className="card-body pt-3">
                        <h5 className="card-title">Book Details</h5>
                        {profile.map((profileItem, index) => (
                          <div key={index} className="row">
                            <div className="col-lg-3 col-md-4 label">Title</div>
                            <div className="col-lg-9 col-md-8">{profileItem.title}</div>
                            <div className="col-lg-3 col-md-4 label">Description</div>
                            <div className="col-lg-9 col-md-8">{profileItem.description}</div>
                            <div className="col-lg-3 col-md-4 label">Author</div>
                            <div className="col-lg-9 col-md-8">{profileItem.author}</div>
                            <div className="col-lg-3 col-md-4 label">Genre</div>
                            <div className="col-lg-9 col-md-8">{profileItem.genre}</div>
                            <div className="col-lg-3 col-md-4 label">Department</div>
                            <div className="col-lg-9 col-md-8">{profileItem.department}</div>
                            <div className="col-lg-3 col-md-4 label">Count</div>
                            <div className="col-lg-9 col-md-8">{profileItem.count}</div>
                            <div className="col-lg-3 col-md-4 label">Vendor</div>
                            <div className="col-lg-9 col-md-8">{profileItem.vendor}</div>
                            <div className="col-lg-3 col-md-4 label">Vendor Id</div>
                            <div className="col-lg-9 col-md-8">{profileItem.vendor_id}</div>
                            <div className="col-lg-3 col-md-4 label">Publisher</div>
                            <div className="col-lg-9 col-md-8">{profileItem.publisher}</div>
                            <div className="col-lg-3 col-md-4 label">Publisher Id</div>
                            <div className="col-lg-9 col-md-8">{profileItem.publisher_id}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p>No books found</p>
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

export default Bookdb;
