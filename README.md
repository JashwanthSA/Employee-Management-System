# Employee Mangement System
This project demonstrates a web application designed to manage employee records efficiently. It allows administrators to log in, manage employee details, categorize employees, and track various statistics such as total employees and salary expenses. The application is built using React for the frontend and Node.js with Express for the backend, utilizing MySQL as the database.

## Features ✨
- User authentication for admins
- CRUD operations for employee management
- Category management for employees
- Image upload functionality for employee profiles
- Dashboard displaying key statistics

## Prerequisites 🤖
- Node.js (14.17.0 or higher)
- MySQL (8.0.21 or higher)
- Docker (optional, for containerized setup)

## Getting Started ☀️

1. Clone this repository
```bash
git clone https://github.com/yourusername/EmployeeMS.git
cd EmployeeMS
```
### Backend Setup
1. Install Dependencies
``` bash
cd server
npm install
```
2. Create a .env file in the server directory and add your database configuration:
```code
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=employeems
```
3. Run the server
```bash
npm start
```
### Frontend Setup
1. Navigate to frontend directory
```bash
cd ../EmployeeMS
```
2. Install Dependencies
```bash
npm install
```
3. Start the frontend application
```bash
npm run dev
```

### Docker Setup (Optional)
1. Build and Start the container
```bash
docker-compose up --build
```
2. Access the application at http://localhost:5173