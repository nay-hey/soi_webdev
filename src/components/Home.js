import React, { useEffect, useRef, useState }  from 'react';

import './vendor/bootstrap/css/bootstrap.min.css';
import './vendor/aos/aos.css';
import './vendor/swiper/swiper-bundle.min.css';
import './vendor/glightbox/css/glightbox.min.css';
import './style.css';
import Swiper from 'swiper/bundle';
import Head from './Head';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const Home = () => {
  const [searchType, setSearchType] = useState('Everything');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement your search logic here
    console.log(`Searching for ${searchQuery} in ${searchType}`);
  };
  useEffect(() => {
    const initializePureCounter = () => {
      if (window.PureCounter) {
        new window.PureCounter();
      } else {
        // Retry after a short delay if PureCounter is not loaded yet
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

  useEffect(() => {
    // Mobile nav toggle
    const mobileNavShow = document.querySelector('.mobile-nav-show');
    const mobileNavHide = document.querySelector('.mobile-nav-hide');
    const mobileNavToggleElements = document.querySelectorAll('.mobile-nav-toggle');

    const mobileNavToggle = () => {
      document.body.classList.toggle('mobile-nav-active');
      if (mobileNavShow) mobileNavShow.classList.toggle('d-none');
      if (mobileNavHide) mobileNavHide.classList.toggle('d-none');
    };

    mobileNavToggleElements.forEach(el => {
      el.addEventListener('click', event => {
        event.preventDefault();
        mobileNavToggle();
      });
    });

    // Hide mobile nav on same-page/hash links
    document.querySelectorAll('#navbar a').forEach(navbarlink => {
      if (!navbarlink.hash) return;

      const section = document.querySelector(navbarlink.hash);
      if (!section) return;

      navbarlink.addEventListener('click', () => {
        if (document.querySelector('.mobile-nav-active')) {
          mobileNavToggle();
        }
      });
    });

    // Cleanup event listeners
    return () => {
      mobileNavToggleElements.forEach(el => {
        el.removeEventListener('click', mobileNavToggle);
      });
      document.querySelectorAll('#navbar a').forEach(navbarlink => {
        if (!navbarlink.hash) return;
        navbarlink.removeEventListener('click', mobileNavToggle);
      });
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
    }, 8000); // Change image every 8 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
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

  const [activeTab, setActiveTab] = useState('everything');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <div>
      <Head />
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
                <li><a href="about.html">About</a></li>
                <li><a href="contact.html">Contact</a></li>
              </ul>
            </nav>
            <button className="login-button">Login</button>
            <i className="mobile-nav-toggle bi bi-list"></i>
          </div>
        </header>
        <button className="scroll-top">Top</button>

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
                    <p className="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi</p>
                  </div>
                </div>

                <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                  <div className="icon-box">
                    <div className="icon"><i className="ri-palette-line"></i></div>
                    <h4 className="title"><a href="">General Rules</a></h4>
                    <p className="description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
                  </div>
                </div>

                <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                  <div className="icon-box">
                    <div className="icon"><i className="ri-command-line"></i></div>
                    <h4 className="title"><a href="">Collections</a></h4>
                    <p className="description">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia</p>
                  </div>
                </div>

                <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                  <div className="icon-box">
                    <div className="icon"><i className="ri-fingerprint-line"></i></div>
                    <h4 className="title"><a href="">Library Commitee</a></h4>
                    <p className="description">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis</p>
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
                            <h2>The Best Homemade Masks for Face (keep the Pimples Away)</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem neque est mollitia! Beatae minima assumenda repellat harum vero, officiis ipsam magnam obcaecati cumque maxime inventore repudiandae quidem necessitatibus rem atque.</p>
                          </div>
                        </a>
                      </div>

                      <div className="swiper-slide">
                      <a href="single-post.html" className="img-bg d-flex align-items-end" style={{ backgroundImage: "url('static/lib2.jpeg')" }}>
                          <div className="img-bg-inner">
                            <h2>17 Pictures of Medium Length Hair in Layers That Will Inspire Your New Haircut</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem neque est mollitia! Beatae minima assumenda repellat harum vero, officiis ipsam magnam obcaecati cumque maxime inventore repudiandae quidem necessitatibus rem atque.</p>
                          </div>
                        </a>
                      </div>

                      <div className="swiper-slide">
                      <a href="single-post.html" className="img-bg d-flex align-items-end" style={{ backgroundImage: "url('static/lib3.jpeg')" }}>
                          <div className="img-bg-inner">
                            <h2>13 Amazing Poems from Shel Silverstein with Valuable Life Lessons</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem neque est mollitia! Beatae minima assumenda repellat harum vero, officiis ipsam magnam obcaecati cumque maxime inventore repudiandae quidem necessitatibus rem atque.</p>
                          </div>
                        </a>
                      </div>

                      <div className="swiper-slide">
                      <a href="single-post.html" className="img-bg d-flex align-items-end" style={{ backgroundImage: "url('static/lib4.jpeg')" }}>
                          <div className="img-bg-inner">
                            <h2>9 Half-up/half-down Hairstyles for Long and Medium Hair</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem neque est mollitia! Beatae minima assumenda repellat harum vero, officiis ipsam magnam obcaecati cumque maxime inventore repudiandae quidem necessitatibus rem atque.</p>
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
          <div id="main">
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
                              <h3>Life Insurance And Pregnancy: A Working Mom’s Guide</h3>
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
                            <select id="search-category-title" style={{ borderRight: '1px solid #654321' }}>
                              <option value="title">Title</option>
                              <option value="author">Author</option>
                              <option value="callnumber">Call Number</option>
                              <option value="publisher">Publisher</option>
                            </select>
                            <input type="text" id="keyword-input" placeholder="Enter Keyword..." />
                            <button id="search-button">Search</button>
                          </div>
                        </div>
                      ))}

                      <div className="search-filters">
                        <label><input type="checkbox" id="open-access-only" /> Open Access Only</label>
                        <label><input type="checkbox" id="owned-resources" /> Owned Resources</label>
                        <label><input type="checkbox" id="scholarly-peer-reviewed" /> Scholarly & Peer Reviewed</label>
                      </div>
                    </div>
                </div>
                <div className="col-lg-3  border-start border-end custom-border">
                  <h1 className='text-center'>Calendar</h1>
                    <div className='calendar-container'>
                      <Calendar onChange={setDate} value={date} />
                    </div>
                    <p className='text-center'>
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
          <section id="featured-services" className="featured-services">
            <div className="container">

              <div className="row">
                <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                  <div className="icon-box" >
                    <h4 className="title"><a href="">Lorem Ipsum</a></h4>
                    <p className="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi</p>
                  </div>
                </div>

                <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                  <div className="icon-box" >
                    <h4 className="title"><a href="">Sed ut perspiciatis</a></h4>
                    <p className="description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
                  </div>
                </div>

                <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                  <div className="icon-box" >
                    <h4 className="title"><a href="">Magni Dolores</a></h4>
                    <p className="description">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia</p>
                  </div>
                </div>

                <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                  <div className="icon-box" >
                    <h4 className="title"><a href="">Nemo Enim</a></h4>
                    <p className="description">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis</p>
                  </div>
                </div>

              </div>

            </div>
          </section>
            <section id="recent-posts" className="recent-posts sections-bg">
              <div className="container">

                <div className="section-header">
                  <h2>Recent Blog Posts</h2>
                  <p>Consequatur libero assumenda est voluptatem est quidem illum et officia imilique qui vel architecto accusamus fugit aut qui distinctio</p>
                </div>

                <div className="row gy-4">

                  <div className="col-xl-4 col-md-6">
                    <article>

                      <div className="post-img">
                        <img src="assets/img/blog/blog-1.jpg" alt="" className="img-fluid" />
                      </div>

                      <p className="post-category">Politics</p>

                      <h2 className="title">
                        <a href="blog-details.html">Dolorum optio tempore voluptas dignissimos</a>
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
                        <a href="blog-details.html">Nisi magni odit consequatur autem nulla dolorem</a>
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

                  <div className="col-xl-4 col-md-6">
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
            </div>
            <section id="team" className="team">
              <div className="container">
                <div className="section-header">
                  <h2>New Arrivals</h2>
                </div>
                <div className="team-wrapper">
                  <div className="team-row">
                    <div className="member"  style={{ backgroundImage: "url('static/book1.jpg')" }}>
                    <div class="description">
                      <h3>Book 1</h3>
                      <p>Description of Book 1</p>
                    </div>
                    </div>
                    <div className="member"  style={{ backgroundImage: "url('static/book2.jpg')" }}>
                    <div class="description">
                      <h3>Book 2</h3>
                      <p>Description of Book 2</p>
                    </div>
                    </div>
                    <div className="member" style={{ backgroundImage: "url('static/book3.jpg')" }}>
                    <div class="description">
                      <h3>Book 3</h3>
                      <p>Description of Book 3</p>
                    </div>
                    </div>
                    <div className="member" style={{ backgroundImage: "url('static/book4.jpg')" }}>
                    <div class="description">
                      <h3>Book 4</h3>
                      <p>Description of Book 4</p>
                    </div>
                    </div>
                  </div>
                  <div className="team-row">
                    <div className="member" style={{ backgroundImage: "url('static/book5.jpg')" }}>
                    <div class="description">
                      <h3>Book 5</h3>
                      <p>Description of Book 5</p>
                    </div>
                    </div>
                    <div className="member" style={{ backgroundImage: "url('static/book6.jpg')" }}>
                    <div class="description">
                      <h3>Book 6</h3>
                      <p>Description of Book 6</p>
                    </div>
                    </div>
                    <div className="member" style={{ backgroundImage: "url('static/book7.jpg')" }}>
                    <div class="description">
                      <h3>Book 7</h3>
                      <p>Description of Book 7</p>
                    </div>
                    </div>
                    <div className="member" style={{ backgroundImage: "url('static/book8.jpg')" }}>
                    <div class="description">
                      <h3>Book 8</h3>
                      <p>Description of Book 8</p>
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
     

          <a href="#" className="scroll-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>

          <div id="preloader" className={stage}>
          <div className="content">
            {stage === 'logo' && <img src="static/logo.svg.png" alt="Logo" className="logo" />}
            {stage === "institute-name" && <h1 className="institute-name">Indian Institute of Technology, Dharwad</h1>}
          </div>
        </div>

     </div>
  );
};

export default Home;
