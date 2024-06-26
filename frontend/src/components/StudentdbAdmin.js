import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataTable } from 'simple-datatables';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownButton, Badge, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './AdminPage.css';
import 'simple-datatables/dist/style.css';

const Studentdb = () => {
  const [students, setStudents] = useState([]);


  const [newStudent, setNewStudent] = useState({ student_name: '', roll: '', email: '', branch: '' });

  const [dataTableInstance, setDataTableInstance] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (students.length > 0) {
      initializeDataTables();
    }
  }, [students]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

   // Function to handle form input changes
   const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

    // Function to handle form submission (adding a new book)
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        console.log('New student data:', newStudent);
        const response = await axios.post('http://localhost:5000/api/students', newStudent);
       
        console.log('student added:', response.data);
        setNewStudent({
         student_name: '',
          roll: '', 
          email: '',
           branch: ''
        });
        fetchStudents(); 
      } catch (error) {
        console.error('Error adding students:', error);
      }
    };
  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/students', newStudent);
      setStudents([...students, response.data]);
      setNewStudent({ student_name: '', roll: '', email: '', branch: '' });
      if (dataTableInstance) {
        dataTableInstance.destroy();
      }
      fetchStudents(); // Refresh the list after adding
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      setStudents(students.filter(student => student._id !== id));
      if (dataTableInstance) {
        dataTableInstance.destroy();
      }
      fetchStudents(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const initializeDataTables = () => {
    const tables = document.querySelectorAll('.datatable');
    tables.forEach(table => {
      const instance = new DataTable(table, {
        perPageSelect: [5, 10, 15, ["All", -1]],
        columns: [
          { select: 2, sortSequence: ["desc", "asc"] },
          { select: 3, sortSequence: ["desc"] },
          { select: 4, cellClass: "green", headerClass: "red" }
        ]
      });
      setDataTableInstance(instance);
    });
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
          <section id="admin">
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
            <div className="logo d-flex align-items-center">
              <img src="static/logo.svg.png" alt="IIT Dharwad Logo" />
              <h1>IIT Dharwad</h1>
            </div>

        </div>
        

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
              <Link className="dropdown-item d-flex align-items-center" to="/profile">
                <i className="bi bi-gear"></i>
                <span>Account Settings</span>
              </Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              <Link className="dropdown-item d-flex align-items-center" to="#">
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
                <Link className="nav-link " to="/bookdb">
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
            <li className="nav-item">
                <Link className="nav-link collapsed" to="/contact">
                <i className="bi bi-envelope"></i>
                <span>Contact</span>
                </Link>
            </li>
            </ul>

            </aside>

        <main id="main" className="main">
          <div className="pagetitle">
            <h1>Student Data</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item" style={{ color: "#ccc" }}>
                  <Link style={{ color: "#ccc" }} to="/AdminPage">Home</Link>
                </li>
                <li className="breadcrumb-item active" style={{ color: "#ccc" }}>Student Database</li>
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
                             
                            </tr>
                          </thead>
                          <tbody>
                            {students.map(student => (
                              <tr key={student._id}>
                                <td>{student.student_name}</td>
                                <td>{student.roll}</td>
                                <td>{student.email}</td>
                                <td>{student.branch}</td>
                                
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
                        <div className="row">
                          <div className="card">
                            <div className="card-body">
                              <h5 className="card-title">Add Member</h5>
                              <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                  <label htmlFor="student_name" className="form-label">Name</label>
                                  <input type="text" className="form-control" id="student_name" name="student_name" value={newStudent.student_name} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="roll" className="form-label">Roll Number</label>
                                  <input type="text" className="form-control" id="roll" name="roll" value={newStudent.roll} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="email" className="form-label">Email</label>
                                  <input type="email" className="form-control" id="email" name="email" value={newStudent.email} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="branch" className="form-label">Branch</label>
                                  <input type="text" className="form-control" id="branch" name="branch" value={newStudent.branch} onChange={handleChange} />
                                </div>
                               
                                <button type="submit" className="btn btn-primary">Submit</button>
                              </form>
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
                            
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {students.map(student => (
                              <tr key={student._id}>
                                <td>{student.student_name}</td>
                                <td>{student.roll}</td>
                                <td>{student.email}</td>
                                <td>{student.branch}</td>
                                
                                <td>
                                  <button className="btn btn-danger" onClick={() => handleDeleteStudent(student._id)}>Delete</button>
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
                <p>Dharwad, Karnataka, India - 580011</p>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default Studentdb;
