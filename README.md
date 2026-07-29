# 📝 MERN Blog Platform

A full-stack blogging application built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)** where users can create, manage, and discuss blog posts through comments.

The platform includes secure authentication, post management, category filtering, search functionality, user profiles, and an interactive commenting system.

---

## ✨ Features

### 🔐 Authentication

* User registration and login
* JWT-based authentication
* Secure user sessions
* Protected user actions

### 📝 Blog Features

* Create new blog posts
* Edit and delete posts
* View detailed blog pages
* Search posts
* Filter posts by category

### 💬 Comment System

* Add comments to blog posts
* View discussions under blogs
* Interactive user engagement

### 👤 User Features

* User profile section
* Manage personal posts

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* React Router
* Axios
* CSS

## Backend

* Node.js
* Express.js
* REST APIs

## Database

* MongoDB Atlas

## Authentication

* JWT
* bcrypt

## Tools

* Git & GitHub
* VS Code
* MongoDB Compass

---

# 📂 Project Structure

```text
mern-blog-platform/
│
├── client/              # React frontend
│
├── server/              # Express backend
│
├── screenshots/         # Application screenshots
│
└── README.md
```

---

# 📸 Screenshots

## 🏠 Home Page

![Home Page](screenshots/home.png)

## 📝 Register Page

![Register Page](screenshots/register.png)

## 🔐 Login Page

![Login Page](screenshots/login.png)

## ✍️ Create Post Page

![Create Post](screenshots/create-post.png)

## 💬 Blog Details & Comments

![Blog Details](screenshots/post-details.png)

---

# ⚙️ Getting Started

## Clone Repository

```bash
git clone https://github.com/ananyag-haldipur/mern-blog-platform.git
```

---

## Backend Setup

Navigate to the server folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Start backend server:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

## Frontend Setup

Open another terminal:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start React application:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# 🔮 Future Enhancements

* Image upload for blog posts
* Rich text editor
* Likes and bookmarks
* User dashboard improvements
* Cloud deployment

---

# 👩‍💻 Author

**Ananya Gangadhar Haldipur**

Computer Science Engineering Student
MERN Stack Developer

---

⭐ If you like this project, consider starring the repository.
