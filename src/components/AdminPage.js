  /*--------------------------------------------------------------
  # Main
  --------------------------------------------------------------*/
  #admin #main {
    margin-top: 60px;
    padding: 20px 30px;
    transition: all 0.3s;
    background: linear-gradient(rgba(14, 29, 52, 0.8), rgba(14, 29, 52, 0.6)), url('../../public/static/lib5.jpeg') center center;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  @media (max-width: 1199px) {
    #admin #main {
      padding: 20px;
    }
  }
  
  /*--------------------------------------------------------------
  # Page Title
  --------------------------------------------------------------*/
  #admin   #admin .pagetitle {
    margin-top: 50px;
  }
  
  #admin .pagetitle h1 {
    font-size: 24px;
    margin-bottom: 0;
    font-weight: 600;
    color: white;
  }
  

/*--------------------------------------------------------------
# Override some default Bootstrap stylings
--------------------------------------------------------------*/
/* Dropdown menus */
#admin .dropdown-menu {
  border-radius: 4px;
  padding: 10px 0;
  animation-name: dropdown-animate;
  animation-duration: 0.2s;
  animation-fill-mode: both;
  border: 0;
  width: 350px;
  box-shadow: 0 5px 30px 0 rgba(82, 63, 105, 0.2);
}

#admin .message-item p{
  text-decoration: none;
}

#admin .dropdown-menu .dropdown-header,
#admin .dropdown-menu .dropdown-footer {
  text-align: center;
  font-size: 15px;
  padding: 0px 100px;
  max-height: 500px;
}
#admin .dropdown-button{
  background-color: white;
}

#admin .dropdown-menu .dropdown-footer a {
  color: #444444;
  text-decoration: underline;
}

#admin .dropdown-menu .dropdown-footer a:hover {
  text-decoration: none;
}

#admin .dropdown-menu .dropdown-divider {
  color: #a5c5fe;
  margin: 8px;
}

#admin #dropdown-notifications{
  background-color: transparent;
  border: none;
  width: 80px;
  height: 40px;
  display: flex;
}

#admin #dropdown-messages{
  background-color: transparent;
  border: none;
  margin-left: -40px;
  width: 80px;
  height: 40px;
  display: flex;
}

#admin #dropdown-profile{
  background-color: transparent;
  border: none;
  margin-left: -40px;
  margin-right: 80px;
  width: 80px;
  height: 40px;
  display: flex;
}

#admin .dropdown-menu .dropdown-item {
  font-size: 14px;
  padding: 0px 15px;
  transition: 0.3s;
}

#admin .dropdown-menu .dropdown-item i {
  margin-right: 10px;
  font-size: 18px;
  line-height: 0;
}

#admin .dropdown-menu .dropdown-item:hover {
  background-color: #f6f9ff;
}

@media (min-width: 768px) {
  #admin .dropdown-menu-arrow::before {
    content: "";
    width: 13px;
    height: 13px;
    background: #fff;
    position: absolute;
    top: -7px;
    right: 20px;
    transform: rotate(45deg);
    border-top: 1px solid #eaedf1;
    border-left: 1px solid #eaedf1;
  }
}


@keyframes dropdown-animate {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }

  0% {
    opacity: 0;
  }
}


  /* Bordered Tabs */
  #admin .nav-tabs-bordered {
    border-bottom: 2px solid #ebeef4;
  }
  
  #admin  .nav-tabs-bordered .nav-link {
    margin-bottom: -2px;
    border: none;
    color: #2c384e;
  }
  
  #admin  .nav-tabs-bordered .nav-link:hover,
  #admin .nav-tabs-bordered .nav-link:focus {
    color: #2c384e;
  }
  
  #admin  .nav-tabs-bordered .nav-link.active {
    background-color: #fff;
    border:2px solid #ebeef4;
    color: black;
    border-bottom: none;
  }
  
  /*--------------------------------------------------------------
  # Header
  --------------------------------------------------------------*/
  #admin  .header {
    height: 120px;
    transition: all 0.5s;
    z-index: 997;
    background-color: #1A2530;
  }
  
  #admin .header.sticked {
    height: 70px;
  }
  
  #admin .header .logo img {
    margin-top: 5px;
    max-height: 80px;
    margin-right: 30px;
  }
  
  #admin .header .logo h1 {
    text-decoration: none;
    margin-top: 6px;
    font-size: 50px;
    font-weight: 700;
    color: #D1DCE1;
    font-family: var(--font-primary);
  }
  #admin .header.sticked .logo img {
    margin-top: -5px;
    max-height: 50px;
    margin-right: 6px;
  }
  
  #admin .header.sticked .logo h1 {
    margin-top: -1px;
    font-size: 30px;
    font-weight: 700;
    text-decoration: none;
    color: #D1DCE1;
    font-family: var(--font-primary);
  }
  
  #admin .header .toggle-sidebar-btn {
    font-size: 32px;
    padding-left: 10px;
    cursor: pointer;
    color: white;
  }
  
  #admin .header .search-bar {
    min-width: 360px;
    padding: 0 20px;
  }
  
  @media (max-width: 1199px) {
    #admin .header .search-bar {
      position: fixed;
      top: 50px;
      left: 0;
      right: 0;
      padding: 20px;
      box-shadow: 0px 0px 15px 0px rgba(1, 41, 112, 0.1);
      background: white;
      z-index: 9999;
      transition: 0.3s;
      visibility: hidden;
      opacity: 0;
    }
  
    #admin  .header .search-bar-show {
      top: 60px;
      visibility: visible;
      opacity: 1;
    }
  }
  
  #admin .header .search-form {
    width: 100%;
  }
  
  #admin  .header .search-form input {
    border: 0;
    font-size: 14px;
    color: white;
    border: 1px solid rgba(1, 41, 112, 0.2);
    padding: 7px 38px 7px 8px;
    border-radius: 3px;
    transition: 0.3s;
    width: 100%;
  }
  
  #admin .header .search-form input:focus,
  #admin  .header .search-form input:hover {
    outline: none;
    box-shadow: 0 0 10px 0 rgba(1, 41, 112, 0.15);
    border: 1px solid rgba(1, 41, 112, 0.3);
  }
  
  #admin  .header .search-form button {
    border: 0;
    padding: 0;
    margin-left: -30px;
    background: none;
  }
  
  #admin  .header .search-form button i {
    color: white;
  }
  
  /*--------------------------------------------------------------
  # Header Nav
  --------------------------------------------------------------*/


  #admin  .header-nav ul {
    list-style: none;
    margin: -50px;
  }
  
  #admin  .header-nav>ul {
    padding: 0;
  }
  
  #admin  .header-nav .nav-icon {
    font-size: 22px;
    color: #D1DCE1;
    position: relative;
  }
  #admin .header-nav .nav-icon:hover {
    font-size: 22px;
    color: #D1DCE1;
    position: relative;
  }
  
  #admin .header-nav .nav-profile {
    color: #D1DCE1;
  }
  #admin .header-nav .nav-profile:hover {
    color: #18d26e;
  }
  #admin  .header-nav .nav-profile img {
    max-height: 36px;
  }
  
  #admin  .header-nav .nav-profile span {
    font-size: 14px;
    font-weight: 600;
  }
  
  #admin  .header-nav .badge-number {
    position: absolute;
    inset: -2px -5px auto auto;
    font-weight: normal;
    font-size: 12px;
    padding: 3px 6px;
  }
  
  #admin .header-nav .notifications {
    inset: 8px -15px auto auto !important;
  }
  
  #admin .header-nav .notifications .notification-item {
    display: flex;
    align-items: center;
    padding: 15px 10px;
    transition: 0.3s;
  }
  
  #admin .header-nav .notifications .notification-item i {
    margin: 0 20px 0 10px;
    font-size: 24px;
  }
  
  #admin  .header-nav .notifications .notification-item h4 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 5px;
  }
  
  #admin  .header-nav .notifications .notification-item p {
    font-size: 13px;
    margin-bottom: 3px;
    color: #919191;
  }
  
  #admin  .header-nav .notifications .notification-item:hover {
    background-color: #f6f9ff;
  }
  
  #admin  .header-nav .messages {
    inset: 8px -15px auto auto !important;
  }
  
  #admin .message-item {
    padding: 15px 10px;
    margin-top: -10px;
    transition: 0.3s;
    width: 100%;
    box-sizing: border-box;
  }
  
  #admin .header-nav .messages .message-item a {
    display: flex;
  }
  
  #admin  .header-nav .messages .message-item img {
    margin: 0 20px 0 10px;
    max-height: 40px;
  }
  
  #admin  .message-item h4 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 5px;
    color: black;
  }
  
  #admin  .message-item p {
    font-size: 15px;
    margin-bottom: 3px;
    color: gray;
 } 
 #admin .header-nav .messages .message-item:hover {
    background-color: #f6f9ff;
  }
  
  #admin  .header-nav .profile {
    min-width: 240px;
    padding-bottom: 0;
    top: 8px !important;
  }
  
  #admin  .header-nav .profile .dropdown-header h6 {
    font-size: 18px;
    margin-bottom: 0;
    font-weight: 600;
    color: #444444;
  }
  
  #admin   .header-nav .profile .dropdown-header span {
    font-size: 14px;
  }
  
  #admin .header-nav .profile .dropdown-item {
    font-size: 14px;
    padding: 10px 15px;
    transition: 0.3s;
  }
  
  #admin .header-nav .profile .dropdown-item i {
    margin-right: 10px;
    font-size: 18px;
    line-height: 0;
  }
  
  #admin  .header-nav .profile .dropdown-item:hover {
    background-color: #f6f9ff;
  }
  
  /*--------------------------------------------------------------
  # Sidebar
  --------------------------------------------------------------*/
   .sidebar {
    position: fixed;
    top: 60px;
    right: 0;
    bottom: 0;
    width: 300px;
    z-index: 996;
    transition: all 0.3s;
    padding: 20px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #aab7cf transparent;
    box-shadow: 0px 0px 20px rgba(1, 41, 112, 0.1);
    background-color: #fff;
  }
  .sidebar ul{
    margin-top: 50px;
  }
  @media (max-width: 1199px) {
     .sidebar {
      right: -300px;
    }
  }
  
   .sidebar::-webkit-scrollbar {
    width: 5px;
    height: 8px;
    background-color: #fff;
  }
  
   .sidebar::-webkit-scrollbar-thumb {
    background-color: #aab7cf;
  }
  
  @media (min-width: 1200px) {
  
     #main,
     #footer {
      margin-right: 300px;
    }
  }
  
  @media (max-width: 1199px) {
     .toggle-sidebar .sidebar {
      right: 0;
    }
  }
  
  @media (min-width: 1200px) {
  
    .toggle-sidebar #main,
     .toggle-sidebar #footer {
     margin-right: 0;
    }
  
    .toggle-sidebar .sidebar {
      right: -300px;
    }
  }
  
   .sidebar-nav {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  
  .sidebar-nav li {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  
  .sidebar-nav .nav-item {
    margin-bottom: 5px;
  }
  
   .sidebar-nav .nav-heading {
    font-size: 11px;
    text-transform: uppercase;
    color: #899bbd;
    font-weight: 600;
    margin: 10px 0 5px 15px;
  }
  
    .sidebar-nav .nav-link {
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 600;
    color: #4154f1;
    transition: 0.3;
    background: #d9e5fb;
    padding: 10px 15px;
    border-radius: 4px;
  }
  
  .sidebar-nav .nav-link i {
    font-size: 16px;
    margin-right: 10px;
    color: #4154f1;
  }
  
  .sidebar-nav .nav-link.collapsed {
    color: #012970;
    background: #fff;
  }
  
   .sidebar-nav .nav-link.collapsed i {
    color: #899bbd;
  }
  
   .sidebar-nav .nav-link:hover {
    color: #4154f1;
    background: #f6f9ff;
  }
  
   .sidebar-nav .nav-link:hover i {
   color: #4154f1;
  }
  
   .sidebar-nav .nav-link .bi-chevron-down {
    margin-right: 0;
    transition: transform 0.2s ease-in-out;
  }
  
   .sidebar-nav .nav-link:not(.collapsed) .bi-chevron-down {
    transform: rotate(180deg);
  }
  
   .sidebar-nav .nav-content {
    padding: 5px 0 0 0;
    margin: 0;
    list-style: none;
  }
  
   .sidebar-nav .nav-content a {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    color: #012970;
    transition: 0.3;
    padding: 10px 0 10px 40px;
    transition: 0.3s;
  }
  
    .sidebar-nav .nav-content a i {
    font-size: 6px;
    margin-right: 8px;
    line-height: 0;
    border-radius: 50%;
  }
  
   .sidebar-nav .nav-content a:hover,
    .sidebar-nav .nav-content a.active {
    color: #4154f1;
  }
  
   .sidebar-nav .nav-content a.active i {
    background-color: #4154f1;
  }
  
  /*--------------------------------------------------------------
  # Profie Page
  --------------------------------------------------------------*/
  /* General section styling */
  #admin .section .profile {
  padding: 40px 0;
  margin-top: 20px;
  background-color: #f8f9fa;
}
#admin .search-box {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-bottom: 10px;
}

#admin .search-box select, .search-box input {
  padding: 10px;
  margin-bottom: 5px;
  border: 1px solid #D1DCE1;
  border-radius: 4px; /* Optional: rounded corners */
  width: 100%; /* Full width */
  box-sizing: border-box; /* Ensure padding and border are included in the element's total width and height */
}

#admin .search-box button {
  background-color: #D1DCE1;
  color: #0b1116;
  border: none; /* Remove default border */
  border-radius: 6px;
  padding: 10px; /* Ensure consistent padding */
  width: 100%; /* Full width */
  cursor: pointer; /* Change cursor to pointer */
  transition: background-color 0.3s; /* Smooth transition for hover effect */
}

#admin .search-box button:hover {
  background-color: #b0bec5; /* Slightly darker shade for hover effect */
}

/* Container styling */
#admin .container {
  max-width: 1140px;
  margin: 0 auto;
}

/* Row styling */
#admin .row.gy-4 {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

/* Column styling */
#admin .col-lg-5 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Profile search styling */
#admin .profile-search {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

#admin .profile-search input[type="text"] {
  width:700px;
  max-width: 400px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}

#admin .profile-search button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

#admin .profile-search button:hover {
  background-color: #0056b3;
}
#admin .profile-card img {
    width: 100px;
    height: 150px;
  }
  
  #admin  .profile-card h2 {
    font-size: 24px;
    font-weight: 700;
    color: #2c384e;
    margin: 10px 0 0 0;
  }
  
  #admin .profile-card h3 {
    font-size: 18px;
  }
  
  #admin .profile-card .social-links a {
    font-size: 20px;
    display: inline-block;
    color: rgba(1, 41, 112, 0.5);
    line-height: 0;
    margin-right: 10px;
    transition: 0.3s;
  }
  
  #admin .profile .profile-card .social-links a:hover {
    color: #012970;
  }
  
  #admin .profile .profile-overview .row {
    margin-bottom: 20px;
    font-size: 15px;
  }
  
  #admin .profile .profile-overview .card-title {
    color: #012970;
  }
  
  #admin .profile .profile-overview .label {
    font-weight: 600;
    color: rgba(1, 41, 112, 0.6);
  }
  
  #admin .profile .profile-edit label {
    font-weight: 600;
    color: rgba(1, 41, 112, 0.6);
  }
  
  #admin .profile .profile-edit img {
    max-width: 120px;
  }

  #admin  .profile-overview {
    padding: 20px;
  }
  
  #admin  h6 {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
  
  #admin  .search-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  
  #admin   .search-container input[type="text"] {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    margin-right: 10px; /* Add margin between input and select */
  }
  
  #admin   .search-container select {
    width: 180px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }
  
  #admin  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  #admin  th,
  #admin td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  #admin  th {
    background-color: #f2f2f2;
    font-size: 14px;
  }
  
  #admin  tbody tr:hover {
    background-color: #f2f2f2;
  }
  
  .pagination {
    margin: 0;
  }
  
  #admin .pagination .page-item {
    cursor: pointer;
  }
  
  #admin .pagination .page-item.active .page-link {
    background-color: #007bff;
    border-color: #007bff;
    color: #fff;
  }
  
  #admin .pagination .page-link {
    color: #007bff;
    border: 1px solid #007bff;
  }
  
  #admin .pagination .page-link:hover {
    background-color: #007bff;
    border-color: #007bff;
    color: #fff;
  }
  
/*--------------------------------------------------------------
# Hero Section
--------------------------------------------------------------*/
#admin .hero {
  --background-color: color-mix(in srgb, var(--default-color), transparent 94%);
  width: 100%;
  min-height: 60vh;
  position: relative;
  padding: 60px 0;
  display: flex;
  align-items: center;
}

#admin .hero h1 {
  margin: 0;
  font-size: 64px;
  color: white;
  font-weight: 700;
}

#admin .hero p {
  color: color-mix(in srgb, var(--default-color), transparent 30%);
  margin: 5px 0 30px 0;
  font-size: 20px;
  color: white;
  font-weight: 400;
}

#admin .hero .btn-get-started {
  color: var(--contrast-color);
  background: var(--accent-color);
  font-weight: 400;
  font-size: 15px;
  letter-spacing: 1px;
  display: inline-block;
  padding: 10px 28px 12px 28px;
  border-radius: 50px;
  transition: 0.5s;
  box-shadow: 0 8px 28px color-mix(in srgb, var(--accent-color), transparent 80%);
}

#admin .hero .btn-get-started:hover {
  color: var(--contrast-color);
  background: color-mix(in srgb, var(--accent-color), transparent 15%);
  box-shadow: 0 8px 28px color-mix(in srgb, var(--accent-color), transparent 55%);
}

#admin .hero .btn-watch-video {
  font-size: 16px;
  transition: 0.5s;
  margin-left: 25px;
  color: var(--default-color);
  font-weight: 500;
}

#admin .hero .btn-watch-video i {
  color: var(--accent-color);
  font-size: 32px;
  transition: 0.3s;
  line-height: 0;
  margin-right: 8px;
}

#admin .hero .btn-watch-video:hover {
  color: var(--accent-color);
}

#admin .hero .btn-watch-video:hover i {
  color: color-mix(in srgb, var(--accent-color), transparent 15%);
}

#admin .hero .animated {
  animation: up-down 2s ease-in-out infinite alternate-reverse both;
}

@media (max-width: 640px) {
  #admin .hero h1 {
    font-size: 28px;
    line-height: 36px;
  }

  #admin .hero p {
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 30px;
  }

  #admin .hero .btn-get-started,
  #admin .hero .btn-watch-video {
    font-size: 13px;
  }
}

@keyframes up-down {
  0% {
    transform: translateY(10px);
  }

  100% {
    transform: translateY(-10px);
  }
}

/*--------------------------------------------------------------
# Contact
--------------------------------------------------------------*/
#admin .contact .info-box {
  padding: 28px 30px;
}

#admin .contact .info-box i {
  font-size: 38px;
  line-height: 0;
  color: #4154f1;
}

#admin .contact .info-box h3 {
  font-size: 20px;
  color: #012970;
  font-weight: 700;
  margin: 20px 0 10px 0;
}

#admin .contact .info-box p {
  padding: 0;
  line-height: 24px;
  font-size: 14px;
  margin-bottom: 0;
}

#admin .contact .php-email-form .error-message {
  display: none;
  color: #fff;
  background: #ed3c0d;
  text-align: left;
  padding: 15px;
  margin-bottom: 24px;
  font-weight: 600;
}

#admin .contact .php-email-form .sent-message {
  display: none;
  color: #fff;
  background: #18d26e;
  text-align: center;
  padding: 15px;
  margin-bottom: 24px;
  font-weight: 600;
}

#admin .contact .php-email-form .loading {
  display: none;
  background: #fff;
  text-align: center;
  padding: 15px;
  margin-bottom: 24px;
}

#admin .contact .php-email-form .loading:before {
  content: "";
  display: inline-block;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  margin: 0 10px -6px 0;
  border: 3px solid #18d26e;
  border-top-color: #eee;
  animation: animate-loading 1s linear infinite;
}

#admin .contact .php-email-form input,
#admin .contact .php-email-form textarea {
  border-radius: 0;
  box-shadow: none;
  font-size: 14px;
  border-radius: 0;
}

#admin .contact .php-email-form input:focus,
#admin .contact .php-email-form textarea:focus {
  border-color: #4154f1;
}

#admin .contact .php-email-form input {
  padding: 10px 15px;
}

#admin .contact .php-email-form textarea {
  padding: 12px 15px;
}

#admin .contact .php-email-form button[type=submit] {
  background: #4154f1;
  border: 0;
  padding: 10px 30px;
  color: #fff;
  transition: 0.4s;
  border-radius: 4px;
}

#admin .contact .php-email-form button[type=submit]:hover {
  background: #5969f3;
}

@keyframes animate-loading {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/*--------------------------------------------------------------
# Error 404
--------------------------------------------------------------*/
#admin .error-404 {
  padding: 30px;
}

#admin .error-404 h1 {
  font-size: 180px;
  font-weight: 700;
  color: #4154f1;
  margin-bottom: 0;
  line-height: 150px;
}

#admin .error-404 h2 {
  font-size: 24px;
  font-weight: 700;
  color: #012970;
  margin-bottom: 30px;
}

#admin .error-404 .btn {
  background: #51678f;
  color: #fff;
  padding: 8px 30px;
}

#admin .error-404 .btn:hover {
  background: #3e4f6f;
}

@media (min-width: 992px) {
  #admin .error-404 img {
    max-width: 50%;
  }
}

/*--------------------------------------------------------------
# Footer
--------------------------------------------------------------*/
#admin .footer {
  font-size: 14px;
  font-weight: 600;
  background-color: #1A2530;
  padding: 50px 0;
  color: #D1DCE1;
}

#admin .footer .logos {
  padding-left: 30%;
}

#admin .footer .footer-info .logo {
  line-height: 0;
  margin-bottom: 25px;
  width: 190px;
  height: 170px;
  margin-left: -50px;
}

#admin .footer .footer-info p {
  font-size: 15px;
  font-family: var(--font-primary);
}


#admin .footer h4 {
  font-size: 16px;
  font-weight: bold;
  position: relative;
  padding-bottom: 12px;
}

#admin .footer .footer-links {
  margin-bottom: 30px;
  text-decoration: none;
}

#admin .footer .footer-links ul {
  text-decoration: none;
  list-style: none;
  padding: 0;
  margin: 0;
}

#admin .footer .footer-links ul i {
  padding-right: 2px;
  color: rgba(149, 165, 166, 0.8); 
  text-decoration: none;
  font-size: 12px;
  line-height: 0;
}

#admin .footer .footer-links ul li {
  padding: 10px 0;
  text-decoration: none;
  display: flex;
  align-items: center;
}

#admin .footer .footer-links ul li:first-child {
  padding-top: 0;
}

#admin .footer .footer-links ul a {
  color: rgba(255, 255, 255, 0.6);
  transition: 0.3s;
  text-decoration: none;
  display: inline-block;
  line-height: 1;
}

#admin .footer .footer-links ul a:hover {
  color: #fff;
  font-size: 110%;
  text-decoration: none;
}

#admin .footer .copyright {
  text-align: center;
}

#admin .footer .credits {
  padding-top: 6px;
  text-align: center;
  font-size: 13px;
}

#admin .footer .copyright strong {
  font-weight: 400;
}

#admin .footer .footer-legal {
  background: #0b1116;
  padding: 40px 0;
  margin-bottom: -50px;
}

#admin .footer .footer-legal .social-links a {
  text-align: center;
  display: flex;
  width: 40px;
  height: 40px;
  background-color: rgba(149, 165, 166, 0.5);
  border-radius: 50%;
  color: #0b1116; 
  line-height: 40px;
  transition: 0.3s;
  align-items: center;
  justify-content: center;
  border: 1px solid #0b1116; 
  margin: 0 5px; 

}

#admin .footer .footer-legal .social-links a:hover {
  color: rgba(149, 165, 166, 0.5);
  background-color: #0b1116; 
  border: 1px solid rgba(149, 165, 166, 0.5);
}

#admin .footer .social-links {
  margin-top: 15px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center; 
}

#admin .footer .social-links i {
  font-size: 18px;
  margin: 9px; 
}
