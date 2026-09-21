# EduHub - An Online School

A modern Learning Management System (LMS) built with **Next.js**, **Strapi CMS**, and **PostgreSQL**. The platform enables instructors to create and manage courses while allowing students to enroll, learn through lessons, and take quizzes.

---

## Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Role-based Authorization
- Student & Instructor Roles

### Student
- Browse Courses
- Enroll in Courses
- View Enrolled Courses
- Watch Lessons
- Take Quizzes
- View Quiz Results
- Track Learning Progress

### Instructor
- Create Courses
- Update Courses
- Delete Courses
- Manage Lessons
- Create Quizzes
- Add Questions
- View Student Enrollments

### Quiz System
- Multiple Choice Questions
- Automatic Scoring
- Quiz Submission History
- Result Storage

### Course Management
- Rich Course Descriptions
- Lesson Ordering
- Media Support
- Instructor-specific Course Management

---

# Tech Stack

## Frontend
- Next.js
- TypeScript
- Tailwind CSS
- Axios

## Backend
- Strapi 5
- Node.js

## Database
- PostgreSQL

## Deployment
- **Frontend:** Vercel
- **Backend:** Railway
- **Database:** Railway PostgreSQL

---

# Project Structure

```text
LMS/
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── hooks/
│   ├── public/
│   ├── package.json
│   └── next.config.ts
│
└── backend/
    ├── src/
    ├── config/
    ├── database/
    ├── public/
    └── package.json
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/shoaib221/LMS.git
cd LMS
```

---

# Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file and configure your environment variables.

Run in development mode:

```bash
npm run develop
```

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

# Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:1337
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

# API Features

## Authentication
- Register
- Login
- Logout

## Courses
- Browse Courses
- Create Course
- Update Course
- Delete Course
- Enroll in Course

## Lessons
- Create Lesson
- Update Lesson
- Delete Lesson
- View Course Lessons

## Quizzes
- Create Quiz
- Update Quiz
- Delete Quiz
- Submit Quiz
- View Quiz Results

---

# Deployment

## Frontend
**Vercel**.
Live at: https://lms-delta-cyan.vercel.app/

## Backend
**Railway**.
Live at: https://eduhub-production-dbbd.up.railway.app/api


## Database
**Railway PostgreSQL**.


---

# Target problems

- Learning Strapi
- Vibe Coding
- Quiz 
- Blog 

---

# Contributing

Contributions are welcome! Feel free to fork the repository, create a feature branch, and submit a pull request.

```bash
git checkout -b feature/your-feature-name
git commit -m "Add your feature"
git push origin feature/your-feature-name
```

---

# License

This project is licensed under the MIT License.

---

## Author

**MD Shoaib Tasrif Emon**

- GitHub: https://github.com/shoaib221
