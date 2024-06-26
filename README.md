# Institute Library Website

A web application for managing the library system of our institute. This project aims to simplify library operations like cataloging books, managing members, and tracking borrow/return activities.

## Table of Contents
- [Project Description](#project-description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contact](#contact)

## Project Description
This web application provides a user-friendly interface for both librarians and members of the institute. Librarians can add, update, and delete book records, manage member information, and oversee borrowing and returning activities. Members can browse the catalog, search for books, view their borrowing history, receive reminders for returning books, get personalised book recommendations and message the admin. 

## Features
- User authentication and authorization
- Book catalog management 
- Member management 
- Borrowing and returning books
- Search functionality
- Responsive design
- Know about the library's:
    - Vision
    - Policies
    - Team
      
## Installation

### Prerequisites
- Node.js and npm
- MongoDB

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/nay-hey/Devshelf.git
    ```

2. Set up the MongoDB database:
    - Open your terminal and start `mongosh`:
        ```bash
        mongosh
        ```
    - Create a new database named `library`:
        ```javascript
        use library
        ```
    - Create the `books` collection and insert books from the .json file:
        ```javascript
        db.createCollection("books")
        db.books.insertMany({[copy paste contents of books.json]})
        ```
    - Create the `issues` collection:
        ```javascript
        db.createCollection("issues")
        ```

3. Set up the environment variables:
    Create a `.env` file in the root directory and add the following:
    ```env
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```
4. Starting frontend:

    - Change directory:
        ```bash
        cd frontend
        ```
   
    - Install dependencies:
        ```bash
        npm install
        ```
   
    - Run the development server:
        ```bash
        npm start
        ```
5. Similarly for backend:

    - Change directory:
        ```bash
        cd backend_folder
        ```
   
    - Install dependencies:
        ```bash
        npm install
        ```
   
    - Run the development server:
        ```bash
        npm start
        ```

7. Open your browser and navigate to `http://localhost:3000`.

## Usage
- **Home page:** This is the landing page from where you can access all other pages. 
- **About Us:** This page provides some information about the library and contains links to four sub-pages.
- **Login page:** This can be accessed by clicking the login button in the header. It validates user credentials and has two seperate sections for admin and student.
- **Admin Dashboard:** Log in with librarian credentials to manage books and members and access other special features.
- **Student Dashboard:** Log in with member credentials to access several features like searching for books and viewing borrowing history.

### Screenshots
![Home Page](/home.png)
![Home3 Page](/home3.png)
![About Page](/about.png)
![Login Page](/login.png)
![Student Page](/student.png)
![Admin Page](/admin.png)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
If you have any questions or feedback, please contact us.

