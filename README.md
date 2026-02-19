# 🧠 JavaScript Quiz App

Day 3 of my **30 Days JavaScript Challenge**.

An interactive quiz application built using Vanilla JavaScript that tests users with multiple-choice questions, tracks scores, and displays results.

---

## 🚀 Features

- 📋 Multiple-choice questions  
- 👉 Next question navigation  
- 🎯 Score tracking  
- ✅ Highlight correct and incorrect answers  
- 🏁 Final result screen  
- 🔄 Restart quiz functionality  
- 📱 Fully responsive design  

---

## 🧠 Architecture Approach

The application uses a **state-driven approach**.

Quiz data is stored as an array of objects:

```js
[
  {
    question: "What is JavaScript?",
    options: ["Language", "Library", "Framework", "Database"],
    answer: 0
  }
]
Application state includes:

Current question index

Selected answer

Score

The UI updates dynamically based on state changes.

🛠 Tech Stack
HTML5

CSS3

Vanilla JavaScript

📚 What I Learned
Managing multi-step application state

Rendering dynamic content from data

Handling user interaction flow

Score calculation logic

Conditional UI rendering

Building restartable application logic




🌍 Live Demo
https://saurabh-js-quiz-app.netlify.app/

💻 GitHub Repository
https://github.com/saurabh54e/js-Quiz-App

🚀 Challenge Goal
Building 30 JavaScript projects in 30 days to strengthen frontend fundamentals, improve architecture thinking, and build consistently in public.