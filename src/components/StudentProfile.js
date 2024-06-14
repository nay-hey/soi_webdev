import React, { useEffect, useRef, useState}  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Link } from 'react-router-dom';
import './AdminPage.css';
import { Tooltip } from 'bootstrap';

const StudentProfile = () => {
    const [searchInput, setSearchInput] = useState('');
    const [profile, setProfile] = useState(null);
  
    const handleSearch = () => {
      // Assuming you have a list of profiles
      const profiles = [
        {
          id: 1,
          img: 'static/lib1.jpg',
          name: 'Kevin Anderson',
          position: 'Admin',
          email: '220010034@iitdh.ac.in',
          rollno: '220010034',
          branch: 'Computer Science and Engineering',
          joindate: '27/1/04',
        },
        {
          id: 2,
          img: 'static/lib2.jpeg',
          name: 'Sarah Johnson',
          position: 'Student',
          email: '220010050@iitdh.ac.in',
          rollno: '220010050',
          branch: 'Computer Science and Engineering',
          joindate: '1/1/09',
        },
        {
          id: 3,
          img: 'static/lib3.jpeg',
          name: 'Michael Smith',
          job: 'Faculty',
          email: '220010014@iitdh.ac.in',
          rollno: '220010014',
          branch: 'Computer Science and Engineering',
          joindate: '27/6/01',
       }
      ];
      
  
      const foundProfile = profiles.find(p => p.name.toLowerCase().includes(searchInput.toLowerCase()));
      setProfile(foundProfile);
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
        
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
            <div className="logo d-flex align-items-center">
              <img src="static/logo.svg.png" alt="IIT Dharwad Logo" />
              <h1>IIT Dharwad</h1>
            </div>

        </div>
        

        <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">

            <li className="nav-item dropdown">

            <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                <i className="bi bi-bell"></i>
                <span className="badge bg-primary badge-number">4</span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                <li className="dropdown-header">
                You have 4 new notifications
                <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                </li>
                <li>
                <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                <i className="bi bi-exclamation-circle text-warning"></i>
                <div>
                    <h4>Lorem Ipsum</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>30 min. ago</p>
                </div>
                </li>

                <li>
                <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                <i className="bi bi-x-circle text-danger"></i>
                <div>
                    <h4>Atque rerum nesciunt</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>1 hr. ago</p>
                </div>
                </li>

                <li>
                <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                <i className="bi bi-check-circle text-success"></i>
                <div>
                    <h4>Sit rerum fuga</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>2 hrs. ago</p>
                </div>
                </li>

                <li>
                <hr className="dropdown-divider"/>
                </li>

                <li className="notification-item">
                <i className="bi bi-info-circle text-primary"></i>
                <div>
                    <h4>Dicta reprehenderit</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>4 hrs. ago</p>
                </div>
                </li>

                <li>
                <hr className="dropdown-divider"/>
                </li>
                <li className="dropdown-footer">
                <a href="#">Show all notifications</a>
                </li>

            </ul>
            </li>
            <li className="nav-item dropdown">

            <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                <i className="bi bi-chat-left-text"></i>
                <span className="badge bg-success badge-number">3</span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                <li className="dropdown-header">
                You have 3 new messages
                <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                </li>
                <li>
                <hr className="dropdown-divider"/>
                </li>

                <li className="message-item">
                <a href="#">
                    <img src="assets/img/messages-1.jpg" alt="" className="rounded-circle" />
                    <div>
                    <h4>Maria Hudson</h4>
                    <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                    <p>4 hrs. ago</p>
                    </div>
                </a>
                </li>
                <li>
                <hr className="dropdown-divider"/>
                </li>

                <li className="message-item">
                <a href="#">
                    <img src="assets/img/messages-2.jpg" alt="" className="rounded-circle" />
                    <div>
                    <h4>Anna Nelson</h4>
                    <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                    <p>6 hrs. ago</p>
                    </div>
                </a>
                </li>
                <li>
                <hr className="dropdown-divider"/>
                </li>

                <li className="message-item">
                <a href="#">
                    <img src="assets/img/messages-3.jpg" alt="" className="rounded-circle" />
                    <div>
                    <h4>David Muldon</h4>
                    <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                    <p>8 hrs. ago</p>
                    </div>
                </a>
                </li>
                <li>
                <hr className="dropdown-divider" />
                </li>

                <li className="dropdown-footer">
                <a href="#">Show all messages</a>
                </li>

            </ul>

            </li>

            <li className="nav-item dropdown pe-3">

            <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                <img src="static/adminpage/profile.png" alt="Profile" className="rounded-circle" />
                <span className="d-none d-md-block dropdown-toggle ps-2">K. Anderson</span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                <h6>Kevin Anderson</h6>
                <span>Admin</span>
                </li>
                <li>
                <hr className="dropdown-divider"/>
                </li>

                <li>
                <Link className="dropdown-item d-flex align-items-center" to="/profile">
                    <i className="bi bi-person"></i>
                    <span>My Profile</span>
                </Link>
                </li>
                <li>
                <hr className="dropdown-divider"/>
                </li>

                <li>
                <Link className="dropdown-item d-flex align-items-center" to="/profile">
                    <i className="bi bi-gear"></i>
                    <span>Account Settings</span>
                </Link>
                </li>
                <li>
                <hr className="dropdown-divider"/>
                </li>

                <li>
                <a className="dropdown-item d-flex align-items-center" href="#">
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Sign Out</span>
                </a>
                </li>

            </ul>
            </li>
        </ul>
        </nav>
           <i className="bi bi-list toggle-sidebar-btn"></i>
        </header>
        <aside id="sidebar" className="sidebar">

            <ul className="sidebar-nav" id="sidebar-nav">

            <li className="nav-item">
                <Link className="nav-link " to="/">
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
                <Link className="nav-link collapsed" to="/studentprofile">
                <i className="bi bi-person"></i>
                <span>Profile Edit</span>
                </Link>
            </li>
            </ul>

            </aside>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Profile</h1>
                    <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"  style={{ color: "#ccc" }}><Link style={{ color: "#ccc" }} to="/">Home</Link></li>
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
                                placeholder="Search for a profile..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                />
                                <button onClick={handleSearch}>Search</button>
                            </div>
                            <div className="d-flex">
                            </div>
                        </div>
                        <div className="col-lg-5 order-1 order-lg-2 hero-img">
                            <img src="static/adminpage/profilebar.png" className="img-fluid" alt="" />
                        </div>
                        </div>
                    </div>
                    {profile && (
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
                            <ul className="nav nav-tabs nav-tabs-bordered">
                                <li className="nav-item">
                                <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Profile Details</button>
                                </li>
                                <li className="nav-item">
                                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit Profile</button>
                                </li>
                                <li className="nav-item">
                                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Change Password</button>
                                </li>
                            </ul>
                            <div className="tab-content pt-2">
                                <div className="tab-pane fade show active profile-overview" id="profile-overview">
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
                                <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
                                <form>
                                    <div className="row mb-3">
                                    <label htmlFor="profileImage" className="col-md-4 col-lg-3 col-form-label">Profile Image</label>
                                    <div className="col-md-8 col-lg-9">
                                        <img src={profile.img} alt="Profile" />
                                        <div className="pt-2">
                                        <a href="#" className="btn btn-primary btn-sm" title="Upload new profile image"><i className="bi bi-upload"></i></a>
                                        <a href="#" className="btn btn-danger btn-sm" title="Remove my profile image"><i className="bi bi-trash"></i></a>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="row mb-3">
                                    <label for="inputEmail3" className="col-sm-2 col-form-label">Your Name</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="inputText" value={profile.name}/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label for="inputEmail" className="col-sm-2 col-form-label">Email</label>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="Recipient's roll number" aria-label="Recipient's roll number" aria-describedby="basic-addon2" value={profile.rollno}/>
                                        <span className="input-group-text" id="basic-addon2">@iitdh.ac.in</span>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label for="inputNumber" className="col-sm-2 col-form-label">Roll Number</label>
                                    <div className="col-sm-10">
                                    <input type="number" className="form-control" value={profile.rollno} />
                                    </div>
                                </div>
                                
                                <div className="row mb-3">
                                    <label for="inputDate" className="col-sm-2 col-form-label">Join Date</label>
                                    <div className="col-sm-10">
                                    <input type="date" className="form-control" value={profile.joindate}/>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label">Select position</label>
                                    <div className="col-sm-10">
                                    <select className="form-select" aria-label="Default select example" defaultValue={"Student"}>
                                        <option value="1">Student</option>
                                        <option value="2">Admin</option>
                                        <option value="3">Faculty</option>
                                    </select>
                                    </div>
                                </div>


                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label">Submit Button</label>
                                    <div className="col-sm-10">
                                    <button type="submit" className="btn btn-primary">Submit Form</button>
                                    </div>
                                </div>

                                </form>
                                </div>
                                <div className="tab-pane fade pt-3" id="profile-settings">
                                <form>
                                    <div className="row mb-3">
                                    <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">Email Notifications</label>
                                    <div className="col-md-8 col-lg-9">
                                        <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="changesMade" checked />
                                        <label className="form-check-label" htmlFor="changesMade">Changes made to your account</label>
                                        </div>
                                        <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="newProducts" checked />
                                        <label className="form-check-label" htmlFor="newProducts">Information on new products and services</label>
                                        </div>
                                        <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="proOffers" />
                                        <label className="form-check-label" htmlFor="proOffers">Marketing and promo offers</label>
                                        </div>
                                        <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="securityNotify" checked disabled />
                                        <label className="form-check-label" htmlFor="securityNotify">Security alerts</label>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="text-center">
                                    <button type="submit" className="btn btn-primary">Save Changes</button>
                                    </div>
                                </form>
                                </div>
                                <div className="tab-pane fade pt-3" id="profile-change-password">
                                <form>
                                    <div className="row mb-3">
                                    <label htmlFor="currentPassword" className="col-md-4 col-lg-3 col-form-label">Current Password</label>
                                    <div className="col-md-8 col-lg-9">
                                        <input name="password" type="password" className="form-control" id="currentPassword" />
                                    </div>
                                    </div>
                                    <div className="row mb-3">
                                    <label htmlFor="newPassword" className="col-md-4 col-lg-3 col-form-label">New Password</label>
                                    <div className="col-md-8 col-lg-9">
                                        <input name="newpassword" type="password" className="form-control" id="newPassword" />
                                    </div>
                                    </div>
                                    <div className="row mb-3">
                                    <label htmlFor="renewPassword" className="col-md-4 col-lg-3 col-form-label">Re-enter New Password</label>
                                    <div className="col-md-8 col-lg-9">
                                        <input name="renewpassword" type="password" className="form-control" id="renewPassword" />
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
                    )}
                    <div className='d flex'></div>
                </section>
                </main>
        <footer id="footer" className="footer">

            <div className="container">
            <div className="row gy-3">
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
        
    </div>
  );
};

export default StudentProfile;
