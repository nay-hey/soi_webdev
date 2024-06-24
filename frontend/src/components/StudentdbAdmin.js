import React, { useEffect, useRef, useState}  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Dropdown, DropdownButton, Badge, Image } from 'react-bootstrap';

import './AdminPage.css';
import 'simple-datatables/dist/style.css';
import { Tooltip } from 'bootstrap';
import { DataTable } from 'simple-datatables';
import { Link } from 'react-router-dom';

const Studentdb = () => {
    const [books, setBooks] = useState([
        { name: 'Allegra Shepherd', rollno: '220010034', email: '220010034@iitdh.ac.in', branch: 'Computer Science', joindate: '2005/02/11' },
        { name: 'Fallon Reyes', rollno: '220010034', email: '220010034@iitdh.ac.in', branch: 'Computer Science', joindate: '2005/02/11' },

      ]);
    
      const [newBook, setNewBook] = useState({ name: '', rollno: '', email: '', branch: '', joindate: '' });
    
      const handleAddBook = () => {
        setBooks([...books, newBook]);
        setNewBook({ name: '', rollno: '', email: '', branch: '', joindate: '' });
      };
    
      const handleDeleteBook = (index) => {
        setBooks(books.filter((_, i) => i !== index));
      };
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook({ ...newBook, [name]: value });
      };
    useEffect(() => {    
        // Initialize Datatables
        const datatables = document.querySelectorAll('.datatable');
        datatables.forEach(datatable => {
          new DataTable(datatable, {
            perPageSelect: [5, 10, 15, ["All", -1]],
            columns: [
              {
                select: 2,
                sortSequence: ["desc", "asc"]
              },
              {
                select: 3,
                sortSequence: ["desc"]
              },
              {
                select: 4,
                cellClass: "green",
                headerClass: "red"
              }
            ]
          });
        });
      }, []);
    
    useEffect(() => {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        const tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => {
          return new Tooltip(tooltipTriggerEl);
        });
      }, []);
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
            <section id="admin">
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
            <div className="logo d-flex align-items-center">
              <img src="static/logo.svg.png" alt="IIT Dharwad Logo" />
              <h1>IIT Dharwad</h1>
            </div>

        </div>
        <nav id="navbar" className="navbar">
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="libcom.html">Library Committee</a></li>
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
                <Link className="nav-link " to="/studentdb">
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
            </li> <li className="nav-item">
                <Link className="nav-link collapsed" to="/AdminPage/reminder">
                <i className="bi bi-alarm-fill"></i><span>Reminder</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link collapsed" to="/AdminPage/studentprofile">
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
            <h1>Student Data</h1>
            <nav>
                <ol className="breadcrumb">
                <li className="breadcrumb-item"  style={{ color: "#ccc" }}><Link style={{ color: "#ccc" }} to="/AdminPage">Home</Link></li>
                <li className="breadcrumb-item active"  style={{ color: "#ccc" }}>Student Database</li>
                </ol>
            </nav>
            </div>

            <section className="section">
            <div className="row">
                <div className="col-lg-12">

                <div className="card">
                <div className="card-body pt-3">
                <ul className="nav nav-tabs nav-tabs-bordered">

                    <li className="nav-item">
                    <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Student Data</button>
                    </li>

                    <li className="nav-item">
                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Add Member</button>
                    </li>

                    <li className="nav-item">
                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-settings">Delete Member</button>
                    </li>

                </ul>
                <div className="tab-content pt-2">

                    <div className="tab-pane fade show active profile-overview" id="profile-overview">
                    <table className="table datatable">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Roll Number</th>
                            <th>Email</th>
                            <th>Branch</th>
                            <th data-type="date" data-format="YYYY/DD/MM">Join Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Unity Pugh</td>
                            <td>220010034</td>
                            <td>220010034@iitdh.ac.in</td>
                            <td>Computer Science</td>
                            <td>2005/02/11</td>
                        </tr>
                        <tr>
                            <td>Shad Hudson</td>
                            <td>220010034</td>
                            <td>220010034@iitdh.ac.in</td>
                            <td>Computer Science</td>
                            <td>2005/02/11</td>
                        </tr>
                        <tr>
                            <td>Daryl Ayers</td>
                            <td>220010034</td>
                            <td>220010034@iitdh.ac.in</td>
                            <td>Computer Science</td>
                            <td>2005/02/11</td>
                        </tr>
                        <tr>
                            <td>Caleb Livingston</td>
                            <td>220010034</td>
                            <td>220010034@iitdh.ac.in</td>
                            <td>Computer Science</td>
                            <td>2005/02/11</td>
                        </tr>
                        <tr>
                            <td>Sydney Meyer</td>
                            <td>220010034</td>
                            <td>220010034@iitdh.ac.in</td>
                            <td>Computer Science</td>
                            <td>2005/02/11</td>
                        </tr>
                        <tr>
                            <td>Lani Lawrence</td>
                            <td>220010034</td>
                            <td>220010034@iitdh.ac.in</td>
                            <td>Computer Science</td>
                            <td>2005/02/11</td>
                        </tr>
                        <tr>
                            <td>Allegra Shepherd</td>
                            <td>220010034</td>
                            <td>220010034@iitdh.ac.in</td>
                            <td>Computer Science</td>
                            <td>2005/02/11</td>
                        </tr>
                        <tr>
                            <td>Fallon Reyes</td>
                            <td>220010034</td>
                            <td>220010034@iitdh.ac.in</td>
                            <td>Computer Science</td>
                            <td>2005/02/11</td>
                        </tr>
                        <tr>
                            <td>Karen Whitley</td>
                            <td>220010034</td>
                            <td>220010034@iitdh.ac.in</td>
                            <td>Computer Science</td>
                            <td>2005/02/11</td>
                        </tr>
                        <tr>
                            <td>Stewart Stephenson</td>
                            <td>220010034</td>
                            <td>220010034@iitdh.ac.in</td>
                            <td>Computer Science</td>
                            <td>2005/02/11</td>
                        </tr>
                        <tr>
                            <td>Ursula Reynolds</td>
                            <td>220010034</td>
                            <td>220010034@iitdh.ac.in</td>
                            <td>Computer Science</td>
                            <td>2005/02/11</td>
                        </tr>
                        <tr>
                            <td>Adrienne Winters</td>
                            <td>220010034</td>
                            <td>220010034@iitdh.ac.in</td>
                            <td>Computer Science</td>
                            <td>2005/02/11</td>
                        </tr>
                        <tr>
                            <td>Francesca Brock</td>
                            <td>220010034</td>
                            <td>220010034@iitdh.ac.in</td>
                            <td>Computer Science</td>
                            <td>2005/02/11</td>
                        </tr>
                        <tr>
                            <td>Ursa Davenport</td>
                            <td>220010034</td>
                            <td>220010034@iitdh.ac.in</td>
                            <td>Computer Science</td>
                            <td>2005/02/11</td>
                        </tr>
                        <tr>
                            <td>Grace Bishop</td>
                            <td>220010034</td>
                            <td>220010034@iitdh.ac.in</td>
                            <td>Computer Science</td>
                            <td>2005/02/11</td>
                        </tr>
                        <tr>
                            <td>Haviva Hernandez</td>
                            <td>220010034</td>
                            <td>220010034@iitdh.ac.in</td>
                            <td>Computer Science</td>
                            <td>2005/02/11</td>
                        </tr>
                        <tr>
                            <td>Alisa Horn</td>
                            <td>220010034</td>
                            <td>220010034@iitdh.ac.in</td>
                            <td>Computer Science</td>
                            <td>2005/02/11</td>
                        </tr>
                        <tr>
                            <td>Zelenia Roman</td>
                            <td>220010034</td>
                            <td>220010034@iitdh.ac.in</td>
                            <td>Computer Science</td>
                            <td>2005/02/11</td>
                        </tr>
                        </tbody>
                    </table>
                

                    </div>

                    <div className="tab-pane fade profile-edit pt-3" id="profile-edit">

                    
                        <div className="row">
                        <div>

                            <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Form</h5>

                                <form>
                                <div className="row mb-3">
                                    <label for="inputEmail3" className="col-sm-2 col-form-label">Your Name</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="inputText" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label for="inputEmail" className="col-sm-2 col-form-label">Email</label>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="Recipient's roll number" aria-label="Recipient's roll number" aria-describedby="basic-addon2" />
                                        <span className="input-group-text" id="basic-addon2">@iitdh.ac.in</span>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label for="inputNumber" className="col-sm-2 col-form-label">Roll Number</label>
                                    <div className="col-sm-10">
                                    <input type="number" className="form-control" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label for="inputNumber" className="col-sm-2 col-form-label">Profile Picture</label>
                                    <div className="col-sm-10">
                                    <input className="form-control" type="file" id="formFile" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label for="inputDate" className="col-sm-2 col-form-label">Join Date</label>
                                    <div className="col-sm-10">
                                    <input type="date" className="form-control" />
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
                            </div>

                        </div>
                        </div>
                    </div>

                    <div className="tab-pane fade pt-3" id="profile-settings">
                    <h6>Delete Member</h6>
                    <table className="table datatable">
                      <thead>
                        <tr>
                            <th>Name</th>
                            <th>Roll Number</th>
                            <th>Email</th>
                            <th>Branch</th>
                            <th data-type="date" data-format="YYYY/DD/MM">Join Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {books.map((book, index) => (
                          <tr key={index}>
                            <td>{book.name}</td>
                            <td>{book.rollno}</td>
                            <td>{book.email}</td>
                            <td>{book.branch}</td>
                            <td>{book.joindate}</td>
                            <td>
                              <button className="btn btn-danger" onClick={() => handleDeleteBook(index)}>Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

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
            </section>
    </div>
  );
};

export default Studentdb;
