//Home page 
import React, { useEffect, useRef, useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import './style.css';
import Swiper from 'swiper/bundle';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
const Home = () => {
  const navigate = useNavigate();
  // Handle login button click
  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate('/Login');
    // Logic to load the profile.js script or redirect to the profile page
    window.location.href = './Login'//admin/index.html';  Change this to the correct path if necessary
};
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
// State hooks for managing component state
  const [activeTab, setActiveTab] = useState('everything');
  const [searchInput, setSearchInput] = useState('');
  const [searchCategory, setSearchCategory] = useState('title');
  const [filters, setFilters] = useState({
    openAccess: false,
    owned: false,
    peerReviewed: false
  });
  const [results, setResults] = useState({
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
    imageUrl: ''
  });
// Handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Handle search functionality
  const handleSearch = async () => {
    console.log('Book search');
    try {
      const response = await axios.get(`http://localhost:5000/api/books/search?category=${searchCategory}&keyword=${searchInput}`);
      console.log(response.data);
      // Update results state with the search response
      setResults(response.data);
    } catch (error) {
      console.error('Error searching for book:', error);
    } finally {
    }

    
  };
  // Handle filter change
  const handleFilterChange = (filter) => {
    setFilters({
      ...filters,
      [filter]: !filters[filter]
    });
  };
// useEffect hook to initialize PureCounter library
  useEffect(() => {
    const initializePureCounter = () => {
      if (window.PureCounter) {
        new window.PureCounter();
      } else {
        setTimeout(initializePureCounter, 100);
      }
    };

    initializePureCounter();
  }, []);
// useState hook to manage the selected date in the calendar
  const [date, setDate] = useState(new Date());
// useEffect hook to initialize the Swiper slider
useEffect(() => {
    // Initialize Swiper
    if (typeof Swiper !== 'undefined') {
      new Swiper('.sliderFeaturedPosts', {
        spaceBetween: 0,
        speed: 500,
        centeredSlides: true,
        loop: true,
        slideToClickedSlide: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.custom-swiper-button-next',
          prevEl: '.custom-swiper-button-prev',
        },
      });
    }
  }, []);
// useState hook to manage the current stage of the app (initially set to 'logo')
  const [stage, setStage] = useState('logo'); // Initial stage is 'logo'
// useEffect hook to handle preloader logic
  useEffect(() => {
    const handleLoad = () => {
        setTimeout(() => {
            const preloader = document.getElementById('preloader');
            if (preloader) {
                preloader.remove(); // Remove preloader from DOM after 1000ms (1 second)
            }
        }, 1000); // Adjust this timeout as needed
    };

    window.addEventListener('load', handleLoad);

    return () => {
        window.removeEventListener('load', handleLoad);// Cleanup event listener on unmount
    };
}, []);
// useEffect hook to implement sticky header on scroll
  useEffect(() => {
    // Sticky header on scroll
    const selectHeader = document.querySelector('#header');
    const scrollTop = document.querySelector('.scroll-top');

    const handleScroll = () => {
      if (selectHeader) {
        window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
      }
      if (scrollTop) {
        window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
      }
    };

    document.addEventListener('scroll', handleScroll);

    if (scrollTop) {
      scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    return () => {
      document.removeEventListener('scroll', handleScroll);
      if (scrollTop) {
        scrollTop.removeEventListener('click', handleScroll);
      }
    };
  }, []);
// useRef hooks to reference container and announcements elements
  const containerRef = useRef(null);
  const announcementsRef = useRef(null);
  // Array of image URLs for the image slider
  const images = [
    "/static/lib1.jpg",
    "/static/lib2.jpeg",
    "/static/lib3.jpeg",
    "/static/lib4.jpeg"
  ];
  // useState hook to manage the current image index in the slider
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
// useEffect hook to handle image slider logic
  useEffect(() => {
    // Image slider
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); 

    return () => clearInterval(interval); 
  }, [images.length]);

  // useEffect hook to handle announcements slider logic
  useEffect(() => {
    // Announcements slider
    const container = containerRef.current;
    const announcements = announcementsRef.current;
    if (!container || !announcements) return;

    const announcementHeight = container.offsetHeight;
    let position = 0;

    const slideAnnouncements = () => {
      position -= 1;
      if (Math.abs(position) >= announcements.scrollHeight) {
        position = 0;// Reset position when the end is reached
      }
      announcements.style.transform = `translateY(${position}px)`;
    };

    const intervalId = setInterval(slideAnnouncements, 50);//Slide announcements every 50ms


    return () => clearInterval(intervalId);// Cleanup interval on unmount
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
      <section id="home">
      <header id="header" className="header d-flex align-items-center fixed-top">
          <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
            <div className="logo d-flex align-items-center">
              <img src="static/logo.svg.png" alt="IIT Dharwad Logo" />
              <h1>IIT Dharwad</h1>
            </div>
            <nav id="navbar" className="navbar">
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/AboutUs/team">Library Committee</a></li>
                <li><a href="/AboutUs">About</a></li>
                <li><a href="#footer">Contact</a></li>
              </ul>
            </nav>
            <button className="login-button" onClick={handleLoginClick}>Login</button>
            <button className="mobile-nav-toggle mobile-nav-show bi bi-three-dots"></button>
            <button className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></button>
    
          </div>
        </header>
        <a href="#" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
          <section id="hero" className="d-flex align-items-center">
            <div className="container position-relative">
              <div className='hero-title'>
              <div className="row justify-content-center">
                <div className="col-xl-7 col-lg-9 text-center">
                  <h1>Welcome to <span>IIT DHARWAD</span></h1>
                </div>
              </div>
              <div className="text-center">
                <a href="#heroes-slider" className="btn-get-started">Get Started</a>
              </div>
              </div>

              <div className="row icon-boxes">
                <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                  <div className="icon-box">
                    <div className="icon"><i className="ri-stack-line"></i></div>
                    <h4 className="title"><a href="AboutUs">About Us</a></h4>
                    <p className="description">Indian Institute of Technology Dharwad (IIT-DH) is one of the third Generation (3-G) IITs, which were established by the Ministry of Education (MoE), Government of India (GoI).</p>
                  </div>
                </div>

                <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                  <div className="icon-box">
                    <div className="icon"><i className="ri-palette-line"></i></div>
                    <h4 className="title"><a href="">General Rules</a></h4>
                    <p className="description">All library users are required to maintain silence within the library premises. Please handle books and other materials with care and return them by the due date to avoid fines.</p>
                  </div>
                </div>

                <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                  <div className="icon-box">
                    <div className="icon"><i className="ri-command-line"></i></div>
                    <h4 className="title"><a href="#counts">Collections</a></h4>
                    <p className="description">Our library houses an extensive collection of over 4,750 books across various disciplines, meticulously arranged by subject. We also provide access to several ISO standards in digital form.</p>
                  </div>
                </div>

                <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                  <div className="icon-box">
                    <div className="icon"><i className="ri-fingerprint-line"></i></div>
                    <h4 className="title"><a href="AboutUs/team">Library Commitee</a></h4>
                    <p className="description">The Library Committee, comprised of faculty and staff, is dedicated to enhancing library services and resources. </p>
                  </div>
                </div>

              </div>
            </div>
          </section>
          <section id="heroes-slider" className="heroes-slider">
            <div className="container-md">
              <div className="row">
                <div className="col-12">
                  <div className="swiper sliderFeaturedPosts">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                      <a href="#newarr" className="img-bg d-flex align-items-end" style={{ backgroundImage: "url('static/lib1.jpg')" }}>
                          <div className="img-bg-inner">
                            <h2>New Arrivals</h2>
                            <p>Explore our latest additions! </p>
                            <p>Check out the new arrivals section for the most recent books and digital resources added to our collection.</p>
                          </div>
                        </a>
                      </div>

                      <div className="swiper-slide">
                      <a href="#posts" className="img-bg d-flex align-items-end" style={{ backgroundImage: "url('static/lib2.jpeg')" }}>
                          <div className="img-bg-inner">
                            <h2>Library Events</h2>
                            <p>Join us for exciting events!</p>
                            <p>From author talks to study workshops, our library hosts a variety of events to engage and educate. </p>
                          </div>
                        </a>
                      </div>

                      <div className="swiper-slide">
                      <a href="#search1" className="img-bg d-flex align-items-end" style={{ backgroundImage: "url('static/lib3.jpeg')" }}>
                          <div className="img-bg-inner">
                            <h2>E-Resources</h2>
                            <p>Access a world of knowledge from anywhere!  </p>
                            <p>Our library offers a vast array of e-books, audiobooks, and online databases for your convenience.</p>
                          </div>
                        </a>
                      </div>

                      <div className="swiper-slide">
                      <a href="AboutUs#im1" className="img-bg d-flex align-items-end" style={{ backgroundImage: "url('static/lib4.jpeg')" }}>
                          <div className="img-bg-inner">
                            <h2>Study Spaces</h2>
                            <p>Discover our comfortable study spaces!</p>
                            <p>Whether you need a quiet corner or a collaborative area, our library provides the perfect environment for all your study needs. </p>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="custom-swiper-button-next">
                      <span className="bi-chevron-right"></span>
                    </div>
                    <div className="custom-swiper-button-prev">
                      <span className="bi-chevron-left"></span>
                    </div>

                    <div className="swiper-pagination"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="posts" className="posts">
          <div className="news-ticker">
                        <div className="ticker-container">
                          <div className="ticker">
                            <span>Latest News:</span>
                            <marquee>New Training and Placement Officer Recruitment | Research Associate Recruitment | Junior Superintendent (Horticulture) Recruitment Update | Registrar Recruitment | Branch Change Policy Update | Junior Research Fellow (JRF) Recruitment | Project Associate Recruitment | Senior Project Associate Recruitment | Chief Operating Officer Recruitment | PhD Program Admissions</marquee>
                          </div>
                        </div>
                   </div>
            <div className="container">
            <div className="row g-5">
            <div className="col-lg-3  border-start custom-border">
                    <div className="trending">
                        <h3>Trending</h3>
                        <ul className="trending-post">
                          <li>
                            <a href="#">
                              <span className="number">1</span>
                              <h3>Library Membership</h3>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <span className="number">2</span>
                              <h3>Institutional Membership</h3>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <span className="number">3</span>
                              <h3>Current Awareness Programme</h3>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <span className="number">4</span>
                              <h3>Remote Login Facility</h3>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <span className="number">5</span>
                              <h3>News Editions</h3>
                            </a>
                          </li>
                        </ul>
                      </div>

                    </div>
                <div className="col-lg-6 border-start custom-border"> 
                <div className="announcements-container" ref={containerRef}>
                  <div className="announcements" ref={announcementsRef}>
                      <div className="announcement">1: Default Password for OPAC Login has been shared through email. If not received, request you to consult the Library Staff or email us at librarian@iitdh.ac.in</div>
                      <div className="announcement">2: Request you to reset OPAC password immediately after successful login using the default password.</div>
                      <div className="announcement">3: Request to 2017/18/19 Batch Students to return books to the library purchased under reimbursement policy.</div>
                      <div className="announcement">4: For New Book(s) Recommendation, kindly fill the form and submit the hard copy to Library.</div>
                      {/* Add more announcements as needed */}
                  </div>
                    </div>
                </div>
                <div className="col-lg-3  border-start border-end custom-border">
                  <h1 className='text-center' style={{ color: "#0b1116" }}>Calendar</h1>
                    <div className='calendar-container'>
                      <Calendar onChange={setDate} value={date} />
                    </div>
                    <p className='text-center' style={{ color: "#0b1116" }}>
                      <span className='bold'>Selected Date:</span>{' '}
                      {date.toDateString()}
                    </p>
                    <div className="trending">
                    <ul className="trending-post">
                          <li>
                            <a href="#">
                              <span className="number">1</span>
                              <h3>Circulation</h3>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <span className="number">2</span>
                              <h3>Reference & Reading</h3>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="search-box-container" id="search1">
                      <div className="tabs">
                        <button className={`tablinks ${activeTab === 'everything' ? 'active' : ''}`} onClick={() => handleTabClick('everything')}>Everything</button>
                        <button className={`tablinks ${activeTab === 'journal-articles' ? 'active' : ''}`} onClick={() => handleTabClick('journal-articles')}>Journal Articles</button>
                        <button className={`tablinks ${activeTab === 'books-ebooks' ? 'active' : ''}`} onClick={() => handleTabClick('books-ebooks')}>Books/Ebooks</button>
                        <button className={`tablinks ${activeTab === 'library-catalogue' ? 'active' : ''}`} onClick={() => handleTabClick('library-catalogue')}>Library Catalogue</button>
                      </div>

                      {['everything', 'journal-articles', 'books-ebooks', 'library-catalogue'].map(tab => (
                        <div id={tab} className="tabcontent" style={{ display: activeTab === tab ? 'block' : 'none' }} key={tab}>
                          <div className="search-box">
                            <select id="search-category-title" style={{ borderRight: '1px solid #654321' }} onChange={(e) => setSearchCategory(e.target.value)}>
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
                      ))}

                      <div className="search-filters">
                        <label><input type="checkbox" id="open-access-only" checked={filters.openAccess} onChange={() => handleFilterChange('openAccess')} /> Open Access Only</label>
                        <label><input type="checkbox" id="owned-resources" checked={filters.owned} onChange={() => handleFilterChange('owned')} /> Owned Resources</label>
                        <label><input type="checkbox" id="scholarly-peer-reviewed" checked={filters.peerReviewed} onChange={() => handleFilterChange('peerReviewed')} /> Scholarly & Peer Reviewed</label>
                      </div>
                      {results.length > 0 ? (
                      <div className="search-results">
                        {results.map((book, index) => (
                          <div key={index} className="book-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '20px' }}>
                          <img src={book.imageUrl} alt={book.title} style={{ width: '100px', height: '150px' }} />
                          <h3>{book.title}</h3>
                          <p>Description: {book.description}</p>
                          <p>Author: {book.author}</p>
                          <p>Genre: {book.genre}</p>
                          <p>Department: {book.department}</p>
                          <p>Count: {book.count}</p>
                          <p>Vendor: {book.vendor}</p>
                          <p>Publisher: {book.publisher}</p>
                        </div>
                      ))}
                      </div>
                       ) : (
                        <p style={{ textAlign: 'center' }}>Not Found</p>
                      )}
                    </div>
                </div>
          </section> 
          <section id="counts" className="counts">
              <div className="container">
                <div className="row">
                  <div className="col-lg-3 col-md-6">
                    <div className="count-box">
                      <i className="bi bi-book"></i>
             
                      <span
                        data-purecounter-start="0"
                        data-purecounter-end="120"
                        data-purecounter-duration="1"
                        className="purecounter"
                      ></span>
                      <p>Books</p>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6 mt-5 mt-md-0">
                    <div className="count-box">
                      <i className="bi bi-journal-richtext"></i>
                      <span
                        data-purecounter-start="0"
                        data-purecounter-end="50"
                        data-purecounter-duration="1"
                        className="purecounter"
                      ></span>
                      <p>College Publications</p>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
                    <div className="count-box"> 
                    <i className="bi bi-journal-bookmark"></i>
             
                      <span
                        data-purecounter-start="0"
                        data-purecounter-end="30"
                        data-purecounter-duration="1"
                        className="purecounter"
                      ></span>
                      <p>Ebooks</p>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
                    <div className="count-box">
                      <i className="bi bi-journal"></i>
             
                      <span
                        data-purecounter-start="0"
                        data-purecounter-end="15"
                        data-purecounter-duration="1"
                        className="purecounter"
                      ></span>
                      <p>Newspaper Editions</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <section id="recent-posts" className="recent-posts sections-bg">
              <div className="container">

                <div className="section-header">
                  <h2>Upcoming events</h2>
                  <p>Join us for exciting events! From author talks to study workshops, our library hosts a variety of events to engage and educate.</p>
                </div>
                <div class="field-content"><i class="fa-regular fa-calendar"></i>
                </div>
                <div className="row gy-4">

                  <div className="col-xl-4 col-md-6">
                    <article>

                      <div className="post-img">
                        <img src="/static/lib11.jpeg" alt="" className="img-fluid" />
                      </div>

                      <p className="post-category">Inaugration of new library facilities.</p>

                      <h2 className="title">
                        <a href="blog-details.html">Join us on 30/07/2024 from 10:30 to 11:30</a>
                      </h2>

                      <div className="d-flex align-items-center">
                        <img src="/images/bgnew1.jpg" alt="" className="img-fluid post-author-img flex-shrink-0" />
                        <div className="post-meta">
                          <p className="post-author">Library Management</p>
                          <p className="post-date">
                          <time dateTime="2024-07-30">July 30, 2024</time>
                          </p>
                        </div>
                      </div>

                    </article>
                  </div>

                  <div className="col-xl-4 col-md-6">
                    <article>

                      <div className="post-img">
                        <img src="/static/Talk on Stress Management by Padma Shri Dr C R Chandrashekar _ IIT Dharwad and 7 more pages - Personal - Microsoft​ Edge 04-Jul-24 10_09_05 PM.png" alt="" className="img-fluid" />
                      </div>

                      <p className="post-category">Talk on Stress Management</p>

                      <h2 className="title">
                        <a href="blog-details.html">Join us on 25/07/2024 from 15:30 to 16:30 .</a>
                      </h2>

                      <div className="d-flex align-items-center">
                        <img src="/static/Talk on Stress Management by Padma Shri Dr C R Chandrashekar _ IIT Dharwad and 7 more pages - Personal - Microsoft​ Edge 04-Jul-24 10_01_50 PM.png" alt="" className="img-fluid post-author-img flex-shrink-0" />
                        <div className="post-meta">
                          <p className="post-author">Padma Shri Dr C R Chandrashekar</p>
                          <p className="post-date">
                            <time dateTime="2024-06-25">July 25, 2024</time>
                          </p>
                        </div>
                      </div>

                    </article>
                  </div>

                  <div className="col-xl-4 col-md-6">
                    <article>

                      <div className="post-img">
                        <img src="/static/Adv Open House_1.png" alt="" className="img-fluid" />
                      </div>

                      <p className="post-category">Open House</p>

                      <h2 className="title">
                        <a href="https://www.iitdh.ac.in/jee-advanced-2024">Join us on Tuesay, 31/07/2024 from 11:30 to 13:30 .</a>
                      </h2>

                      <div className="d-flex align-items-center">
                        <img src="/images/Mr. Appasaheb V Sheelavant_Photo - Appasaheb Sheelavant.png" alt="" className="img-fluid post-author-img flex-shrink-0" />
                        <div className="post-meta">
                          <p className="post-author">Mr. Appasaheb V Sheelavant</p>
                          <p className="post-date">
                            <time dateTime="2024-31-07">July 31, 2024</time>
                          </p>
                        </div>
                      </div>

                    </article>
                  </div>

                </div>

              </div>
            </section>
            
            <section id="team" className="team">
              <div className="container">
                <div className="section-header">
                  <h2 id="newarr">New Arrivals</h2>
                </div>
                <div className="team-wrapper">
                  <div className="team-row">
                    <div className="member"  style={{ backgroundImage: "url('static/book_img/PrinciplesofChemicalEngineeringProcesses.png')" }}>
                    <div className="description">
                      <h3>Principles of Chemical</h3>
                      <h3>Engineering Processes</h3>
                      <p>Comprehensive guide to material and energy balance calculations in chemical processes.</p>
                    </div>
                    </div>
                    <div className="member"  style={{ backgroundImage: "url('static/book_img/IntroductiontoEngineeringExperimentation.png')" }}>
                    <div className="description">
                      <h3>Introduction to Engineering </h3>
                      <h3>Experimentation</h3>
                      <p>Guide to the principles and practices of engineering experimentation.</p>
                    </div>
                    </div>
                    <div className="member"  style={{ backgroundImage: "url('static/book_img/ElectromagneticsforEngineers.png')" }}>
                    <div className="description">
                      <h3>Electromagnetics for Engineers</h3>
                      <p>Introduction to the principles and applications of electromagnetics for engineers.</p>
                    </div>
                    </div>
                    <div className="member"  style={{ backgroundImage: "url('static/book_img/ConstructionPlanning,Equipment,andMethods.png')" }}>
                    <div className="description">
                      <h3>Construction Planning,</h3>
                      <h3> Equipment, and Methods</h3>
                      <p>Guide to the planning and methods of construction projects.</p>
                    </div>
                    </div>
                  </div>
                  <div className="team-row">
                     <div className="member"  style={{ backgroundImage: "url('static/book_img/OperatingSystemConcepts.png')" }}>
                    <div className="description">
                      <h3>Operating System Concepts</h3>
                      <p>In-depth look at the design and implementation of operating systems.</p>
                    </div>
                    </div>
                    <div className="member"  style={{ backgroundImage: "url('static/book_img/ElectricalEngineering.png')" }}>
                    <div className="description">
                      <h3>Electrical Engineering: </h3>
                      <h3>Principles and Applications</h3>
                      <p>Comprehensive guide to fundamental principles and applications of electrical engineering.</p>
                    </div>
                    </div>
                    <div className="member"  style={{ backgroundImage: "url('static/book_img/TransportationEngineeringandPlanning.png')" }}>
                    <div className="description">
                      <h3>Transportation Engineering</h3>
                      <h3>and Planning</h3>
                      <p>Fundamentals of transportation engineering and planning concepts.</p>
                    </div>
                    </div>
                    <div className="member"  style={{ backgroundImage: "url('static/book_img/MasonryStructures.png')" }}>
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

          <footer id="footer" className="footer">

          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-4 col-md-12 footer-info">
              <div className="logos">
                <img src="static/logo.svg.png" alt="Logo" className="logo" />
                </div>
              <h3>Indian Institute of Technology Dharwad</h3>
                <p>Permanent Campus</p>
                <p>Chikkamalligawad Village</p>
                <p>Dharwad, Karnataka, India - 580007</p>
                <p>Email: <a href="mailto:pro@iitdh.ac.in">pro@iitdh.ac.in</a></p>
              </div>

              <div className="col-lg-2 col-5 footer-links">
                <h4>Academics</h4>
                  <ul>
                      <li><a href="#">Admissions</a></li>
                      <li><a href="#">Announcements</a></li>
                      <li><a href="#">Departments</a></li>
                      <li><a href="#">Programs</a></li>
                  </ul>
              </div>

              <div className="col-lg-2 col-5 footer-links">
                <h4>Research</h4>
                  <ul>
                      <li><a href="#">Consultancy Projects</a></li>
                      <li><a href="#">IRINS</a></li>
                      <li><a href="#">Project Vacancies</a></li>
                      <li><a href="#">Publications</a></li>
                      <li><a href="#">Sponsored Projects</a></li>
                  </ul>
              </div>

              <div className="col-lg-2 col-5 footer-links">
                <h4>People</h4>
                  <ul>
                      <li><a href="#">Administration</a></li>
                      <li><a href="#">Faculty</a></li>
                      <li><a href="#">Staff</a></li>
                      <li><a href="#">Students</a></li>
                  </ul>
              </div>

              <div className="col-lg-2 col-5 footer-links">
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
     

          <a href="#" className="scroll-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>

          <div id="preloader" className={stage}>
          <div className="content">
            {stage === 'logo' && <img src="static/logo.svg.png" alt="Logo" className="logo" />}
            {stage === "institute-name" && <h1 className="institute-name">Indian Institute of Technology, Dharwad</h1>}
          </div>
        </div>
        </section>
     </div>
  );
};

export default Home;
