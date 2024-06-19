import React, { useState } from 'react';
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const handleLoginClick = (e) => {
      e.preventDefault();
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
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h3 className="card-title text-center">Login</h3>
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
                    <div className="form-group">
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
                    <div className="form-group">
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
                    <button type="submit" className="btn btn-primary btn-block">
                      Login as Student
                    </button>
                  </form>
                </div>
                <div className={`tab-pane ${userType === 'admin' ? 'active' : ''}`} role="tabpanel">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
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
                    <div className="form-group">
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
                    <button onClick={handleLoginClick} type="submit" className="btn btn-primary btn-block">
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
  );
};

export default Login;
