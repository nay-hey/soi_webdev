import React, { useState } from 'react';
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const handleLoginClick = (e) => {
      e.preventDefault();
      
      console.log('User Type:', userType);
      console.log('Email:', email);
      console.log('Password:', password);
      navigate('/AdminPage');
      // Logic to load the profile.js script or redirect to the profile page
      window.location.href = './AdminPage'//admin/index.html';  Change this to the correct path if necessary
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student'); // 'admin' or 'student'

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here based on user type
    console.log('User Type:', userType);
    console.log('Email:', email);
    console.log('Password:', password);
    navigate('/StudentPage');
      // Logic to load the profile.js script or redirect to the profile page
      window.location.href = './StudentPage'//admin/index.html';  Change this to the correct path if necessary
  
  };

  return (
      <section id="loginpage">
    <div className="container-fluid" style={{
      background: "linear-gradient(rgba(14, 29, 52, 0.8), rgba(14, 29, 52, 0.6)), url('static/lib5.jpeg') center center",
      backgroundSize: 'cover',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div className='container'>
      <div className="col-xl-9 col-lg-12 login-container">
      <div className="row">
          <div className="col-lg-7 img-box">
            <img src="/static/adminpage/homebar.png" alt="" />
          </div>
          <div className="col-lg-5 no-padding">
          <a href="/"className="text-light d-flex align-items-center justify-content-end" style={{ textDecoration: 'none', position: 'absolute', top: '20px', right: '40px', fontFamily: 'Roboto, sans-serif'}}>
            <i class="bi bi-box-arrow-in-left">Back to Home</i></a>
              
            <div className="card-body">
            <h1 className="card-title text-center">Login</h1>
              <ul className="nav nav-tabs" id="loginTab" role="tablist">
                <li className="nav-item">
                  <a
                    className={`nav-link ${userType === 'student' ? 'active' : ''}`}
                    onClick={() => setUserType('student')}
                    role="tab"
                  >
                    Student
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${userType === 'admin' ? 'active' : ''}`}
                    onClick={() => setUserType('admin')}
                    role="tab"
                  >
                    Admin
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div className={`tab-pane ${userType === 'student' ? 'active' : ''}`} role="tabpanel">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group row no-margin">
                      <label htmlFor="studentEmail">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="studentEmail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group row no-margin">
                      <label htmlFor="studentPassword">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="studentPassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '20px' }}>
                      Login as Student
                    </button>
                  </form>
                </div>
                <div className={`tab-pane ${userType === 'admin' ? 'active' : ''}`} role="tabpanel">
                  <form onSubmit={handleLoginClick}>
                    <div className="form-group row no-margin">
                      <label htmlFor="adminEmail">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="adminEmail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group row no-margin">
                      <label htmlFor="adminPassword">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="adminPassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '20px' }}>
                      Login as Admin
                    </button>
                  </form>
                </div>
              </div>
              
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
     </section>
  );
};

export default Login;
