import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Use environment variable for MongoDB connection string
const uri = process.env.MONGODB_URI || '';

// Check if MongoDB URI is defined
if (!uri) {
  console.error('ERROR: MONGODB_URI is not defined in environment variables');
  throw new Error('MongoDB connection string is required. Please set MONGODB_URI in your .env.local file.');
} else {
  // Only log that we found the URI, but don't show any part of it
  console.log('MongoDB URI found in environment variables');
}
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
