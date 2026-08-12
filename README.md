# Wanderlust 🏡

A full-stack accommodation and travel listing web application developed as a web development project.

Wanderlust is designed around the idea of discovering, viewing, and managing accommodation listings through a web-based interface.

---

## 📌 Project Overview

Wanderlust provides a platform for users to explore accommodation listings and interact with property information through a structured web application.

The project focuses on building a practical full-stack application with:

- Property listings
- Listing details
- User interaction
- Dynamic web pages
- Responsive user interface
- Server-side application logic
- Database-backed data management

---

## ✨ Key Features

- Browse accommodation listings
- View detailed property information
- Create and manage listings
- Dynamic listing pages
- User-oriented interaction
- Responsive web interface
- Server-side request handling
- Database-backed application

---

## 🛠️ Technology Stack

| Technology | Usage |
|---|---|
| JavaScript | Application logic |
| Node.js | Server-side runtime |
| Express.js | Backend web framework |
| MongoDB | Database |
| EJS | Server-side page rendering |
| HTML5 | Page structure |
| CSS3 | Styling and layout |

---

## 🏗️ Application Structure

```text
Wanderlust/
│
├── models/
│   └── Database models
│
├── routes/
│   └── Application routes
│
├── views/
│   └── EJS templates
│
├── public/
│   └── CSS / client-side assets
│
├── controllers/
│   └── Application logic
│
├── middleware/
│   └── Middleware functions
│
├── app.js
└── README.md

                    ┌───────────────┐
                    │     User      │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │   EJS Views   │
                    │   / Frontend  │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ Express Routes│
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ Controllers / │
                    │ Application   │
                    │ Logic         │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │    MongoDB    │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │    Response   │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ Rendered Page │
                    └───────────────┘
