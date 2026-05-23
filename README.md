# 🚼 DevPulse API

A collaborative backend API platform for software teams to report bugs, suggest features, and coordinate issue resolutions.

---

## 🌐 Live URL

🔗 [https://your-live-link.com](https://devpulse-assign2.vercel.app)

---

## 📂 GitHub Repository

🔗 [https://github.com/yourusername/devpulse-api](https://github.com/Abir-hasan-52/Dev-Pulse-assignment-2)

---

## 🚀 Features

- ✅ User Registration & Login with JWT Authentication
- ✅ Role-Based Authorization (Contributor & Maintainer)
- ✅ Create Issues
- ✅ Get All Issues with Filtering & Sorting
- ✅ Get Single Issue
- ✅ Update Issues with Ownership & Status Validation
- ✅ Delete Issues (Maintainer Only)
- ✅ PostgreSQL Database Integration
- ✅ Modular Express.js Architecture
- ✅ Secure Password Hashing with bcrypt
- ✅ Raw SQL Queries using `pg`
- ✅ Centralized Response Structure

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime Environment |
| Express.js | Web Framework |
| TypeScript | Type Safety |
| PostgreSQL | Database |
| pg | PostgreSQL Client |
| bcryptjs | Password Hashing |
| jsonwebtoken | JWT Auth |
| dotenv | Environment Variables |
| cors | Cross-Origin Resource Sharing |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── modules/
│   ├── middleware/
│   ├── utils/
│   ├── types/
│   └── config/
├── db/
├── app.ts
└── server.ts
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/devpulse-api.git
```

### 2️⃣ Move to Project Folder

```bash
cd devpulse-api
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Create `.env` File

```env
PORT=5000
DATABASE_URL=your_postgresql_database_url
JWT_SECRET=your_secret_key
```

### 5️⃣ Run Development Server

```bash
npm run dev
```

---

## 🗄️ Database Schema Summary

### Users Table

| Field | Type |
|---|---|
| id | SERIAL PRIMARY KEY |
| name | VARCHAR |
| email | VARCHAR UNIQUE |
| password | TEXT |
| role | `contributor` / `maintainer` |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

---

### Issues Table

| Field | Type |
|---|---|
| id | SERIAL PRIMARY KEY |
| title | VARCHAR(150) |
| description | TEXT |
| type | `bug` / `feature_request` |
| status | `open` / `in_progress` / `resolved` |
| reporter_id | INTEGER |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

---

## 🔐 Authentication

JWT-based authentication system.

Protected routes require the following header:

```
Authorization: <JWT_TOKEN>
```

---

## 📌 API Endpoints

### 🔹 Authentication Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register User |
| POST | `/api/auth/login` | Login User |

---

### 🔹 Issue Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/issues` | Create Issue |
| GET | `/api/issues` | Get All Issues |
| GET | `/api/issues/:id` | Get Single Issue |
| PATCH | `/api/issues/:id` | Update Issue |
| DELETE | `/api/issues/:id` | Delete Issue |

---

## 🔍 Query Parameters

### Get All Issues

```
/api/issues?sort=newest
/api/issues?sort=oldest
/api/issues?type=bug
/api/issues?status=open
```

---

## 👥 User Roles

### 🟦 Contributor

- Create Issues
- View Issues
- Update Own Open Issues

### 🟥 Maintainer

- Full Contributor Access
- Update Any Issue
- Delete Any Issue
- Change Issue Status

---

## 🧠 Important Technical Decisions

- ⚡ Raw SQL queries used with `pg` — no ORM or Query Builder
- 🚫 No SQL JOINs used — reporter data fetched separately and merged manually
- 🏗️ Modular architecture maintained throughout
- 🔒 Strict TypeScript enforced across the entire codebase

---

## 📦 Scripts

### Run Development Server

```bash
npm run dev
```

### Build Project

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

---

## 👨‍💻 Author

**Abir Hasan**


---
