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
import 'react-calendar/dist/Calendar.css';
import booksData from './books.json';
const Home = () => {
  const navigate = useNavigate();
  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate('/Login');
    // Logic to load the profile.js script or redirect to the profile page
    window.location.href = './Login'//admin/index.html';  Change this to the correct path if necessary
};
  useEffect(() => {
    const mobileNavToogleButton = document.querySelector('.mobile-nav-toggle');

    if (mobileNavToogleButton) {
      mobileNavToogleButton.addEventListener('click', (event) => {
        event.preventDefault();
        mobileNavToogle();
      });
    }
    
    const mobileNavToogle = () => {
      document.querySelector('body').classList.toggle('mobile-nav-active');
      mobileNavToogleButton.classList.toggle('bi-list');
      mobileNavToogleButton.classList.toggle('bi-x');
    };

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

  const [activeTab, setActiveTab] = useState('everything');
  const [books, setBooks] = useState([]);
  const [searchCategory, setSearchCategory] = useState('title');
  const [keyword, setKeyword] = useState('');
  const [filters, setFilters] = useState({
    openAccess: false,
    owned: false,
    peerReviewed: false
  });
  const [results, setResults] = useState([]);

  useEffect(() => {
    setBooks(booksData); // Set the books data
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSearch = () => {
    let filteredBooks = books.filter(book => {
      return book[searchCategory]?.toLowerCase().includes(keyword.toLowerCase());
    });

    if (filters.openAccess) {
      filteredBooks = filteredBooks.filter(book => book.openAccess);
    }
    if (filters.owned) {
      filteredBooks = filteredBooks.filter(book => book.owned);
    }
    if (filters.peerReviewed) {
      filteredBooks = filteredBooks.filter(book => book.peerReviewed);
    }

    setResults(filteredBooks);
  };

  const handleFilterChange = (filter) => {
    setFilters({
      ...filters,
      [filter]: !filters[filter]
    });
  };

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

  const [date, setDate] = useState(new Date());

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

  const [stage, setStage] = useState('logo'); // Initial stage is 'logo'

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setStage('name'); // Change to 'name' stage after 1 second
      }, 1000);

      setTimeout(() => {
        setStage('loaded'); // Change to 'loaded' stage after another 1 second
      }, 2000);

      setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
          preloader.remove(); // Remove preloader from DOM
        }
      }, 3000);
    };

    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);
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

  const containerRef = useRef(null);
  const announcementsRef = useRef(null);
  const images = [
    "/static/lib1.jpg",
    "/static/lib2.jpeg",
    "/static/lib3.jpeg",
    "/static/lib4.jpeg"
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Image slider
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); 

    return () => clearInterval(interval); 
  }, [images.length]);

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
        position = 0;
      }
      announcements.style.transform = `translateY(${position}px)`;
    };

    const intervalId = setInterval(slideAnnouncements, 50);

    return () => clearInterval(intervalId);
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
                <li><a href="people.html">People</a></li>
                <li><a href="libcom.html">Library Committee</a></li>
                <li><a href="asklib.html">Ask a Librarian</a></li>
                <li><a href="/AboutUs">About</a></li>
                <li><a href="contact.html">Contact</a></li>
              </ul>
            </nav>
            <button className="login-button" onClick={handleLoginClick}>Login</button>
            <i className="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
            <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
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
                    <h4 className="title"><a href="">About Us</a></h4>
                    <p className="description">College info. sxdcfgvhijokpijhgfcdxc gfvbhnjmkkjhgfdxfcvgbhjnk bgfcvgbhjnkkjhbgcfgvb</p>
                  </div>
                </div>

                <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                  <div className="icon-box">
                    <div className="icon"><i className="ri-palette-line"></i></div>
                    <h4 className="title"><a href="">General Rules</a></h4>
                    <p className="description">general rules of library. sxdcfgvhijokpijhgfcdxc gfvbhnjmkkjhgfdxfcvgbhjnk bgfcvgbhjnkkjhbgcfgvb</p>
                  </div>
                </div>

                <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                  <div className="icon-box">
                    <div className="icon"><i className="ri-command-line"></i></div>
                    <h4 className="title"><a href="">Collections</a></h4>
                    <p className="description">collections of books and papers. sxdcfgvhijokpijhgfcdxc gfvbhnjmkkjhgfdxfcvgbhjnk bgfcvgbhjnkkjhbgcfgvb</p>
                  </div>
                </div>

                <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                  <div className="icon-box">
                    <div className="icon"><i className="ri-fingerprint-line"></i></div>
                    <h4 className="title"><a href="">Library Commitee</a></h4>
                    <p className="description">members of library commitee. sxdcfgvhijokpijhgfcdxc gfvbhnjmkkjhgfdxfcvgbhjnk bgfcvgbhjnkkjhbgcfgvb</p>
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
                      <a href="single-post.html" className="img-bg d-flex align-items-end" style={{ backgroundImage: "url('static/lib1.jpg')" }}>
                          <div className="img-bg-inner">
                            <h2>News one of importance</h2>
                            <p>ola sxdcfgvhijokpijhgfcdxc gfvbhnjmkkjhgfdxfcvgbhjnk bgfcvgbhjnkkjhbgcfgvb </p>
                            <p>ola sxdcfgvhijokpijhgfcdxc gfvbhnjmkkjhgfdxfcvgbhjnk bgfcvgbhjnkkjhbgcfgvb </p>
                          </div>
                        </a>
                      </div>

                      <div className="swiper-slide">
                      <a href="single-post.html" className="img-bg d-flex align-items-end" style={{ backgroundImage: "url('static/lib2.jpeg')" }}>
                          <div className="img-bg-inner">
                            <h2>News two of importance</h2>
                            <p>ola sxdcfgvhijokpijhgfcdxc gfvbhnjmkkjhgfdxfcvgbhjnk bgfcvgbhjnkkjhbgcfgvb </p>
                            <p>ola sxdcfgvhijokpijhgfcdxc gfvbhnjmkkjhgfdxfcvgbhjnk bgfcvgbhjnkkjhbgcfgvb </p>
                          </div>
                        </a>
                      </div>

                      <div className="swiper-slide">
                      <a href="single-post.html" className="img-bg d-flex align-items-end" style={{ backgroundImage: "url('static/lib3.jpeg')" }}>
                          <div className="img-bg-inner">
                            <h2>News three of importance</h2>
                            <p>ola sxdcfgvhijokpijhgfcdxc gfvbhnjmkkjhgfdxfcvgbhjnk bgfcvgbhjnkkjhbgcfgvb </p>
                            <p>ola sxdcfgvhijokpijhgfcdxc gfvbhnjmkkjhgfdxfcvgbhjnk bgfcvgbhjnkkjhbgcfgvb </p>
                          </div>
                        </a>
                      </div>

                      <div className="swiper-slide">
                      <a href="single-post.html" className="img-bg d-flex align-items-end" style={{ backgroundImage: "url('static/lib4.jpeg')" }}>
                          <div className="img-bg-inner">
                            <h2>News four of importance</h2>
                            <p>ola sxdcfgvhijokpijhgfcdxc gfvbhnjmkkjhgfdxfcvgbhjnk bgfcvgbhjnkkjhbgcfgvb </p>
                            <p>ola sxdcfgvhijokpijhgfcdxc gfvbhnjmkkjhgfdxfcvgbhjnk bgfcvgbhjnkkjhbgcfgvb </p>
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
                            <marquee>News item 1 | News item 2 | News item 3 | News item 4 | News item 5 | News item 6 | News item 7 | News item 8 | News item 9 | News item 10</marquee>
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
                            <a href="single-post.html">
                              <span className="number">1</span>
                              <h3>Library Membership</h3>
                            </a>
                          </li>
                          <li>
                            <a href="single-post.html">
                              <span className="number">2</span>
                              <h3>Institutional Membership</h3>
                            </a>
                          </li>
                          <li>
                            <a href="single-post.html">
                              <span className="number">3</span>
                              <h3>Current Awareness Programme</h3>
                            </a>
                          </li>
                          <li>
                            <a href="single-post.html">
                              <span className="number">4</span>
                              <h3>Remote Login Facility</h3>
                            </a>
                          </li>
                          <li>
                            <a href="single-post.html">
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
                            <a href="single-post.html">
                              <span className="number">1</span>
                              <h3>Circulation</h3>
                            </a>
                          </li>
                          <li>
                            <a href="single-post.html">
                              <span className="number">2</span>
                              <h3>Reference & Reading</h3>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="search-box-container">
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
                            <input type="text" id="keyword-input" placeholder="Enter Keyword..." onChange={(e) => setKeyword(e.target.value)} />
                            <button id="search-button" onClick={handleSearch}>Search</button>
                          </div>
                        </div>
                      ))}

                      <div className="search-filters">
                        <label><input type="checkbox" id="open-access-only" checked={filters.openAccess} onChange={() => handleFilterChange('openAccess')} /> Open Access Only</label>
                        <label><input type="checkbox" id="owned-resources" checked={filters.owned} onChange={() => handleFilterChange('owned')} /> Owned Resources</label>
                        <label><input type="checkbox" id="scholarly-peer-reviewed" checked={filters.peerReviewed} onChange={() => handleFilterChange('peerReviewed')} /> Scholarly & Peer Reviewed</label>
                      </div>
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
                        data-purecounter-end="232"
                        data-purecounter-duration="1"
                        className="purecounter"
                      ></span>
                      <p>Happy Clients</p>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6 mt-5 mt-md-0">
                    <div className="count-box">
                      <i className="bi bi-journal-richtext"></i>
                      <span
                        data-purecounter-start="0"
                        data-purecounter-end="521"
                        data-purecounter-duration="1"
                        className="purecounter"
                      ></span>
                      <p>Projects</p>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
                    <div className="count-box"> 
                    <i className="bi bi-journal-bookmark"></i>
             
                      <span
                        data-purecounter-start="0"
                        data-purecounter-end="1463"
                        data-purecounter-duration="1"
                        className="purecounter"
                      ></span>
                      <p>Hours Of Support</p>
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
                      <p>Hard Workers</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <section id="recent-posts" className="recent-posts sections-bg">
              <div className="container">

                <div className="section-header">
                  <h2>Recent Blog Posts</h2>
                  <p>JB BKJBKJBbhbj va kjanvoian bkajnzgkiabnn kn lk akejg vaeouingpboa</p>
                </div>

                <div className="row gy-4">

                  <div className="col-xl-4 col-md-6">
                    <article>

                      <div className="post-img">
                        <img src="assets/img/blog/blog-1.jpg" alt="" className="img-fluid" />
                      </div>

                      <p className="post-category">Politics</p>

                      <h2 className="title">
                        <a href="blog-details.html">jendag b naivn boainbdivna nk vanidbonadbkma</a>
                      </h2>

                      <div className="d-flex align-items-center">
                        <img src="assets/img/blog/blog-author.jpg" alt="" className="img-fluid post-author-img flex-shrink-0" />
                        <div className="post-meta">
                          <p className="post-author">Maria Doe</p>
                          <p className="post-date">
                          <time dateTime="2021-10-10">October 10, 2021</time>
                          </p>
                        </div>
                      </div>

                    </article>
                  </div>

                  <div className="col-xl-4 col-md-6">
                    <article>

                      <div className="post-img">
                        <img src="assets/img/blog/blog-2.jpg" alt="" className="img-fluid" />
                      </div>

                      <p className="post-category">Sports</p>

                      <h2 className="title">
                        <a href="blog-details.html">iknwrj vns nkn bkolkjnhb</a>
                      </h2>

                      <div className="d-flex align-items-center">
                        <img src="assets/img/blog/blog-author-2.jpg" alt="" className="img-fluid post-author-img flex-shrink-0" />
                        <div className="post-meta">
                          <p className="post-author">Allisa Mayer</p>
                          <p className="post-date">
                            <time dateTime="2022-01-01">Jun 5, 2022</time>
                          </p>
                        </div>
                      </div>

                    </article>
                  </div>

                  <div className="col-xl-3 col-md-6">
                    <article>

                      <div className="post-img">
                        <img src="assets/img/blog/blog-3.jpg" alt="" className="img-fluid" />
                      </div>

                      <p className="post-category">Entertainment</p>

                      <h2 className="title">
                        <a href="blog-details.html">Possimus soluta ut id suscipit ea ut in quo quia et soluta</a>
                      </h2>

                      <div className="d-flex align-items-center">
                        <img src="assets/img/blog/blog-author-3.jpg" alt="" className="img-fluid post-author-img flex-shrink-0" />
                        <div className="post-meta">
                          <p className="post-author">Mark Dower</p>
                          <p className="post-date">
                            <time dateTime="2022-01-01">Jun 22, 2022</time>
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
                  <h2>New Arrivals</h2>
                </div>
                <div className="team-wrapper">
                  <div className="team-row">
                    <div className="member"  style={{ backgroundImage: "url('static/book_img/Principles of Chemical Engineering Processes.png')" }}>
                    <div className="description">
                      <h3>Principles of Chemical</h3>
                      <h3>Engineering Processes</h3>
                      <p>Comprehensive guide to material and energy balance calculations in chemical processes.</p>
                    </div>
                    </div>
                    <div className="member"  style={{ backgroundImage: "url('static/book_img/Introduction to Engineering Experimentation.png')" }}>
                    <div className="description">
                      <h3>Introduction to Engineering </h3>
                      <h3>Experimentation</h3>
                      <p>Guide to the principles and practices of engineering experimentation.</p>
                    </div>
                    </div>
                    <div className="member"  style={{ backgroundImage: "url('static/book_img/Electromagnetics for Engineers.png')" }}>
                    <div className="description">
                      <h3>Electromagnetics for Engineers</h3>
                      <p>Introduction to the principles and applications of electromagnetics for engineers.</p>
                    </div>
                    </div>
                    <div className="member"  style={{ backgroundImage: "url('static/book_img/Construction Planning, Equipment, and Methods.png')" }}>
                    <div className="description">
                      <h3>Construction Planning,</h3>
                      <h3> Equipment, and Methods</h3>
                      <p>Guide to the planning and methods of construction projects.</p>
                    </div>
                    </div>
                  </div>
                  <div className="team-row">
                     <div className="member"  style={{ backgroundImage: "url('static/book_img/Operating System Concepts.png')" }}>
                    <div className="description">
                      <h3>Operating System Concepts</h3>
                      <p>In-depth look at the design and implementation of operating systems.</p>
                    </div>
                    </div>
                    <div className="member"  style={{ backgroundImage: "url('static/book_img/Electrical Engineering.png')" }}>
                    <div className="description">
                      <h3>Electrical Engineering: </h3>
                      <h3>Principles and Applications</h3>
                      <p>Comprehensive guide to fundamental principles and applications of electrical engineering.</p>
                    </div>
                    </div>
                    <div className="member"  style={{ backgroundImage: "url('static/book_img/Transportation Engineering and Planning.png')" }}>
                    <div className="description">
                      <h3>Transportation Engineering</h3>
                      <h3>and Planning</h3>
                      <p>Fundamentals of transportation engineering and planning concepts.</p>
                    </div>
                    </div>
                    <div className="member"  style={{ backgroundImage: "url('static/book_img/Masonry Structures.png')" }}>
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
              <div className="col-lg-3 col-md-12 footer-info">
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
