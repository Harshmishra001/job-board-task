# Job Board Application

A modern job board application built with Next.js, MongoDB, and React.

## Environment Setup

This project uses environment variables for configuration. Before starting the development server, you need to set up your environment variables.

### Setting Up Environment Variables

1. Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your own values for the following variables:
   ```
   # Database
   MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database

   # Authentication
   JWT_SECRET=your-secure-random-string-at-least-32-characters-long
   JWT_LIFETIME=30d
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

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production Deployment

When deploying to production:

1. Make sure to set all environment variables in your hosting platform.
2. Never expose sensitive information in client-side code.
3. Consider using a more secure method for storing secrets in production.
