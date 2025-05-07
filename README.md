# Job Board Application

<<<<<<< HEAD
A modern job board application built with Next.js, MongoDB, and React.

## Environment Setup

This project uses environment variables for configuration. Before starting the development server, you need to set up your environment variables.

### Setting Up Environment Variables
=======
A responsive, feature-rich job board application built with Next.js and MongoDB. This platform allows users to browse job listings, view detailed job information, filter jobs by various criteria, and apply to positions directly.

## ✨ Features

- **Responsive Design**: Optimized for all device sizes from mobile to desktop
- **Job Listings**: Browse through a comprehensive list of job opportunities
- **Detailed Job View**: View complete job details including company information, requirements, and application links
- **Advanced Filtering**: Filter jobs by location, company, experience level, and tags
- **Dark Mode**: Toggle between light and dark themes for comfortable viewing
- **MongoDB Integration**: Real-time data from MongoDB database
- **JWT Authentication**: Secure user authentication system
- **Job Creation**: Authenticated users can post new job listings
- **Company Profiles**: Display company information and logos

## 🏗️ Project Structure

```
/app                  # Next.js App Directory
  /api                # API Routes
    /jobs             # Job-related API endpoints
    /auth             # Authentication endpoints
  /components         # Reusable UI Components
    /JobList.jsx      # Job listing component
    /Filter.jsx       # Job filtering component
    /JobCard.jsx      # Job card component
  /jobs               # Job-related pages
    /[id]             # Dynamic job details page
  /globals.css        # Global styles
  /layout.js          # Root layout component
  /page.js            # Home page component
/lib                  # Library code
  /mongoose.js        # MongoDB connection setup
/models               # Database models
  /Job.js             # Job schema and model
/scripts              # Utility scripts
  /seed-db.js         # Database seeding script
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.18.0 or higher)
- npm or yarn
- MongoDB account or local MongoDB instance

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Environment Setup
>>>>>>> fb9339cc1c973814029fada4e1338abcd5df66c6

1. Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

<<<<<<< HEAD
2. Edit `.env.local` and add your own values for the following variables:
   ```
   # Database
   MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database
=======
2. Edit `.env.local` with your MongoDB connection string and JWT settings:
   ```
   # Database
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jobboard
>>>>>>> fb9339cc1c973814029fada4e1338abcd5df66c6

   # Authentication
   JWT_SECRET=your-secure-random-string-at-least-32-characters-long
   JWT_LIFETIME=30d
<<<<<<< HEAD
   ```

3. Make sure to generate a strong, random string for `JWT_SECRET`. You can use an online generator or run this command:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

### Security Notes

- **IMPORTANT**: Never commit your `.env.local` file to version control. It contains sensitive information.
- The `.gitignore` file is already configured to exclude `.env.local` and other sensitive files.
- When deploying to production, set these environment variables in your hosting platform's dashboard.

## Required Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB connection string | Yes | None |
| `JWT_SECRET` | Secret key for JWT token generation | Yes | None |
| `JWT_LIFETIME` | Lifetime of JWT tokens | No | `30d` |
| `NODE_ENV` | Environment (development/production) | No | `development` |
| `NEXT_PUBLIC_API_URL` | Base URL for API requests | No | Current host |
| `NEXT_PUBLIC_SITE_URL` | Base URL for the site | No | Current host |

## Development

To start the development server:
=======

   # Environment
   NODE_ENV=development

   # Public URLs
   NEXT_PUBLIC_API_URL=http://localhost:3000
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. Generate a strong JWT secret:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

### Database Setup

1. Set up your MongoDB database
2. Seed the database with sample data:
   ```bash
   npm run seed
   ```

### Running the Application
>>>>>>> fb9339cc1c973814029fada4e1338abcd5df66c6

```bash
npm run dev
# or
yarn dev
```

<<<<<<< HEAD
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production Deployment

When deploying to production:

1. Make sure to set all environment variables in your hosting platform.
2. Never expose sensitive information in client-side code.
3. Consider using a more secure method for storing secrets in production.
=======
Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔐 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB connection string | Yes | None |
| `JWT_SECRET` | Secret key for JWT token generation | Yes | None |
| `JWT_LIFETIME` | Lifetime of JWT tokens | No | `30d` |
| `NODE_ENV` | Environment (development/production) | No | `development` |
| `NEXT_PUBLIC_API_URL` | Base URL for API requests | No | Current host |
| `NEXT_PUBLIC_SITE_URL` | Base URL for the site | No | Current host |

## 🧩 Technologies Used

- **Frontend**: Next.js 15.2.4, React 19.0.0, Tailwind CSS 4.1.3
- **Backend**: Next.js API Routes
- **Database**: MongoDB 6.5.0, Mongoose 8.3.1
- **Authentication**: JWT (jsonwebtoken 9.0.2, bcryptjs 3.0.2)
- **Styling**: Tailwind CSS with dark mode support
- **Animation**: Framer Motion 12.10.0

## 📄 License

This project is licensed under the MIT License.
>>>>>>> fb9339cc1c973814029fada4e1338abcd5df66c6
