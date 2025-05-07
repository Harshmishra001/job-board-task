import jwt from 'jsonwebtoken';

// JWT Secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_LIFETIME = process.env.JWT_LIFETIME || '30d';

// Ensure JWT_SECRET is defined
if (!JWT_SECRET) {
  console.warn('WARNING: JWT_SECRET is not defined in environment variables. Using fallback secret for development only.');
}

// Create JWT token
export const createJWT = ({ payload }) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_LIFETIME,
  });
};

// Verify JWT token
export const isTokenValid = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

// Attach cookies to response (for server-side auth)
export const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user });

  // Define expiration time (30 days)
  const longerExp = 1000 * 60 * 60 * 24 * 30;

  // Check if res.cookies exists (Next.js App Router)
  if (res.cookies && typeof res.cookies.set === 'function') {
    res.cookies.set('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + longerExp),
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  }
  // For Pages Router or custom server
  else if (res.cookie && typeof res.cookie === 'function') {
    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + longerExp),
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  }

  return token;
};
