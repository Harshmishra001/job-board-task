# 💼 JobBoard - Modern Job Listing Platform

![JobBoard Banner](https://via.placeholder.com/1200x300/0d9488/ffffff?text=JobBoard+Platform)

A responsive, feature-rich job board application built with Next.js and MongoDB. This platform allows users to browse job listings, view detailed job information, filter jobs by various criteria, and apply to positions directly.

[![Next.js](https://img.shields.io/badge/Next.js-13.0+-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

## 📋 Table of Contents

- [Features](#-features)
- [Project Structure](#️-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Database Setup](#database-setup)
  - [Running the Development Server](#running-the-development-server)
  - [Available Scripts](#available-scripts)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Deployment](#-deployment)
  - [Deploy on Vercel](#deploy-on-vercel-recommended)
  - [Other Deployment Options](#other-deployment-options)
- [Technologies Used](#-technologies-used)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)
- [Learn More](#-learn-more)
- [Contact](#-contact)

## ✨ Features

- **Responsive Design**: Optimized for all device sizes from mobile to desktop
- **Job Listings**: Browse through a comprehensive list of job opportunities
- **Detailed Job View**: View complete job details including company information, requirements, and application links
- **Company Logos**: Visual identification of companies with logo display
- **Advanced Filtering**: Filter jobs by location, company, experience level, and more
- **Similar Jobs**: Discover related job opportunities based on your interests
- **Dark Mode**: Toggle between light and dark themes for comfortable viewing
- **Share Jobs**: Easily share job listings on social media or via direct links
- **MongoDB Integration**: Real-time data from MongoDB database
- **Responsive Animations**: Smooth transitions and loading states for better UX

## 🏗️ Project Structure

```
/app                  # Next.js App Directory
  /api                # API Routes
    /jobs             # Job-related API endpoints
  /components         # Reusable UI Components
    /Filter.jsx       # Job filtering component
    /JobCard.jsx      # Job card component
    /ShareJob.jsx     # Job sharing functionality
    /SimilarJobs.jsx  # Similar jobs component
  /data               # Data files
    /jobs.json        # Sample job data
  /jobs               # Job-related pages
    /[id]             # Dynamic job details page
  /globals.css        # Global styles
  /layout.js          # Root layout component
  /page.js            # Home page component
/lib                  # Library code
  /mongoose.js        # MongoDB connection setup
/models               # Database models
  /Job.js             # Job schema and model
/utils                # Utility functions
  /getJobs.js         # Functions to fetch jobs
  /getCompanyLogo.js  # Company logo utility
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/) (v8.0.0 or higher) or [yarn](https://yarnpkg.com/) (v1.22.0 or higher)
- [MongoDB](https://www.mongodb.com/) (Account for MongoDB Atlas or local MongoDB instance)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/job-board.git
   cd job-board-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Environment Setup

This project uses environment variables for configuration. Before starting the development server:

1. Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your MongoDB connection string and any other required environment variables:
   ```
   MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database
   ```

3. Make sure `.env.local` is in your `.gitignore` file to prevent committing sensitive information.

### Database Setup

1. Create a MongoDB database (either locally or using MongoDB Atlas)
2. If using the sample data, you can seed the database with:
   ```bash
   npm run seed
   # or
   yarn seed
   ```

### Running the Development Server

After setting up your environment variables and database, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check code quality
- `npm run seed` - Seed the database with sample data

## 🔐 Environment Variables

This project uses the following environment variables:

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB connection string | Yes | None |
| `NODE_ENV` | Environment (development/production) | No | `development` |
| `NEXT_PUBLIC_API_URL` | Base URL for API requests (if different from host) | No | Current host |
| `NEXT_PUBLIC_SITE_URL` | Base URL for the site (for sharing) | No | Current host |

These variables should be defined in a `.env.local` file at the root of the project. For security reasons, this file should not be committed to version control.

### Example .env.local file

```
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jobboard

# Environment
NODE_ENV=development

# Public URLs (optional)
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🌐 API Reference

The application provides the following API endpoints:

### Get all jobs

```
GET /api/jobs
```

Query parameters:
- `location` (optional): Filter by location
- `company` (optional): Filter by company name
- `experience` (optional): Filter by experience level
- `country` (optional): Filter by country
- `minExp` (optional): Filter by minimum experience
- `maxExp` (optional): Filter by maximum experience

### Get job by ID

```
GET /api/jobs/{id}
```

Path parameters:
- `id`: The job ID

## 🚢 Deployment

### Deploy on Vercel (Recommended)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

1. Push your code to a Git repository (GitHub, GitLab, BitBucket)
2. Import your project into Vercel
3. Set up environment variables in the Vercel dashboard:
   - Go to your project settings
   - Navigate to the "Environment Variables" section
   - Add all the required variables from your `.env.local` file
4. Deploy!

### Other Deployment Options

#### Deploy on AWS

1. Build your application:
   ```bash
   npm run build
   ```

2. Deploy using AWS Amplify, Elastic Beanstalk, or EC2:
   - For Amplify: Follow the [AWS Amplify deployment guide](https://docs.aws.amazon.com/amplify/latest/userguide/deploy-nextjs-app.html)
   - For EC2: Set up a Node.js server and use PM2 to manage the process

#### Deploy on Docker

1. Create a Dockerfile in the root directory:
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. Build and run the Docker image:
   ```bash
   docker build -t job-board .
   docker run -p 3000:3000 --env-file .env.local job-board
   ```

## 🧩 Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: (Optional) NextAuth.js
- **Deployment**: Vercel (recommended)
- **State Management**: React Hooks
- **Styling**: Tailwind CSS with custom animations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [MongoDB](https://www.mongodb.com/) - The database for modern applications
- [Vercel](https://vercel.com/) - Platform for frontend frameworks and static sites

## 📚 Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - explore Tailwind CSS
- [MongoDB Documentation](https://docs.mongodb.com/) - learn about MongoDB

## 📧 Contact

If you have any questions or feedback, please reach out to us at:

- Email: harsh.mishra.332003@gmail.com

