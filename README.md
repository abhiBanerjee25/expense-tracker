# 💰 Full-Stack MERN Expense Tracker

A modern, real-time **MERN Stack** (MongoDB, Express.js, React.js, Node.js) web application for tracking personal income and expenses. Built with a decoupled **React + Vite** glassmorphism UI on the frontend and a **RESTful Express & Mongoose API** on the backend.

🏗️ Architecture & Tech Stack
This project follows a decoupled 3-Tier Client–Server–Database Architecture communicating over RESTful HTTP endpoints using Axios.
┌──────────────────────────┐        HTTP / Axios (JSON)       ┌──────────────────────────┐          Mongoose ODM          ┌──────────────────────────┐
│   React + Vite Client    │ ───────────────────────────────> │  Node.js + Express API   │ ─────────────────────────────> │     MongoDB Database     │
│  (Port 5173 - Frontend)  │ <─────────────────────────────── │   (Port 3000 - Backend)  │ <───────────────────────────── │    (expense-tracker)     │
└──────────────────────────┘          REST API Responses      └──────────────────────────┘       Persistent Documents     └──────────────────────────┘

🛠️ Tech Stack
Frontend: React 19, Vite, Axios, CSS3
Backend: Node.js, Express.js (v5), CORS, Dotenv   
Database: MongoDB with Mongoose ODM 

✨ Key Features
⚡ Real-Time Balance Summary: Automatically calculates and displays total balance in ₹ with visual indicators.
📝 Full CRUD Functionality: Create, Read, Update, and Delete income and expense records seamlessly.
🗄️ Persistent MongoDB Storage: Mongoose schema validation ensures every transaction has a required title, numeric amount, and strict type (income or expense).   

👨‍💻 Author
Abhi Banerjee