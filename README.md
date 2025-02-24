# **Full-Stack Coding Challenge: Task Management App**

## **Deadline**: Sunday, Feb 23th 11:59 pm PST

---

## **🚀 Overview**

This is a **Task Management** application built with **React + TypeScript** (frontend), **Node.js** (backend), and **PostgreSQL** (database).  
It allows users to:

1. **Register** (sign up) and **Log in** (sign in).
2. **Manage Tasks** (CRUD operations):
   - View a list of tasks.
   - Create a new task.
   - Update an existing task (e.g., mark as complete, edit).
   - Delete a task.

💡 **Focus on correctness, functionality, and code clarity** rather than visual design.

---

## **1️⃣ Authentication**

### **User Model**
- `id`: Primary key
- `username`: Unique string
- `password`: Hashed string

### **Endpoints**
| HTTP Method | Endpoint           | Description |
|------------|-------------------|-------------|
| `POST`     | `/auth/register`  | Create a new user |
| `POST`     | `/auth/login`     | Login user, return a JWT token |

### **Security Features**
- **JWT Authentication** → Secure task routes (only authenticated users can manage tasks).
- **Password Hashing** → Uses `bcrypt` for secure password storage.
- **Token Verification** → Middleware checks JWT for all protected routes.

---

## **2️⃣ Backend (Node.js + PostgreSQL)**

### **Task Model**
- `id`: Primary key
- `title`: string
- `description`: string (optional)
- `isComplete`: boolean (default `false`)
- `userId`: Foreign key linking the task to its owner

### **Task CRUD API**
| HTTP Method | Endpoint         | Description |
|------------|-----------------|-------------|
| `GET`      | `/tasks`        | Retrieve all tasks (filtered by user) |
| `POST`     | `/tasks`        | Create a new task |
| `PUT`      | `/tasks/:id`    | Update a task (mark complete, edit title/desc) |
| `DELETE`   | `/tasks/:id`    | Delete a task |

### **Database Setup (PostgreSQL)**

#### **Step 1: Install PostgreSQL (If Not Installed)**
```bash
sudo apt update && sudo apt install postgresql postgresql-contrib
```

#### **Step 2: Create the Database**
Start PostgreSQL:
```bash
psql postgres
```
Then, create the database:
```sql
CREATE DATABASE taskmanager;
```

#### **Step 3: Create Tables**
Switch to the database:
```sql
\c taskmanager;
```
Run the following queries:

#### **Users Table**
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);
```

#### **Tasks Table**
```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    isComplete BOOLEAN DEFAULT false,
    userId INTEGER REFERENCES users(id) ON DELETE CASCADE
);
```

---

## **3️⃣ Environment Variables (`.env`)**
Create a `.env` file inside the **backend/** folder:
```ini
DATABASE_URL=postgresql://your_username:your_password@localhost:5432/taskmanager
JWT_SECRET=your_secret_key
PORT=5001
```
💡 **Replace `your_username` and `your_password` with your actual PostgreSQL credentials.**

---

## **4️⃣ How to Run the Backend**
#### **Step 1: Navigate to Backend Folder**
```bash
cd backend
```

#### **Step 2: Install Dependencies**
```bash
npm install
```

#### **Step 3: Start the Backend Server**
```bash
npm run dev
```
👉 **Server should start on:** `http://localhost:5001/`

---

## **5️⃣ How to Run the Frontend**
#### **Step 1: Navigate to Frontend Folder**
```bash
cd frontend
```

#### **Step 2: Install Dependencies**
```bash
npm install
```

#### **Step 3: Start the Frontend**
```bash
npm run dev
```
👉 **Frontend should open at:** `http://localhost:5173/`

---

## **6️⃣ Testing API (cURL Commands)**
Manually test API endpoints using **cURL**.

#### **User Registration**
```bash
curl -X POST http://localhost:5001/auth/register \
-H "Content-Type: application/json" \
-d '{"username": "testuser1", "password": "password123"}'
```

#### **User Login (Get JWT Token)**
```bash
curl -X POST http://localhost:5001/auth/login \
-H "Content-Type: application/json" \
-d '{"username": "testuser1", "password": "password123"}'
```
👉 **Copy the token from the response.**

#### **Create a Task**
```bash
curl -X POST http://localhost:5001/tasks \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
-d '{"title": "Finish Project", "description": "Work on the final project report"}'
```

#### **Get All Tasks**
```bash
curl -X GET http://localhost:5001/tasks \
-H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

#### **Update a Task**
```bash
curl -X PUT http://localhost:5001/tasks/1 \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
-d '{"title": "Updated Task", "description": "Updated task description", "isComplete": true}'
```

#### **Delete a Task**
```bash
curl -X DELETE http://localhost:5001/tasks/1 \
-H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

---

## **7️⃣ Salary Expectations**
💰 **Expected Salary:** **$7,500 per month**



