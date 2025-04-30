# 💼 Job Board UI

This is a responsive Job Board web application built using **Next.js** and **Tailwind CSS**. It allows users to view job listings, explore detailed job descriptions, and filter jobs by location and tags. The project is powered by a mock API using a local JSON file.

## Tech Stack:
- Next.js
- Tailwind CSS
- Local JSON API

## 🧩 Features:
- List of jobs from mock API
- Dynamic job details page
- Responsive and styled with Tailwind
- Dark mode toggle (bonus)

## 📂 Project Structure
/app → Next.js App Directory
/components → Reusable UI Components
/data/jobs.json → Mock job listing data
/styles → Tailwind & Global styles
/utils → Utility functions (e.g., getJobById)

## Setup Instructions:
1. Clone this repo
2. `npm install`
3. `npm run dev`
4. Visit `http://localhost:3000`

## 💡 My Approach:
The goal was to build a clean, intuitive, and responsive Job Board UI that showcases essential job details and smooth navigation between pages. I chose the Next.js App Router for scalability and built the layout using Tailwind CSS for flexibility and quick styling.

The data is sourced from a local mock JSON file, simulating an API call. I implemented dynamic routing for the Job Details page, and included filter functionality (by location & tags) along with a Dark Mode toggle as a bonus. Each component is modular, reusable, and responsive across screen sizes. The project emphasizes clean code, accessibility, and minimal design.

## 🌐 Live Demo
Deploy the app on Vercel and drop the live link here:  
🔗 [https://job-board-umber.vercel.app/](https://job-board-umber.vercel.app/)

