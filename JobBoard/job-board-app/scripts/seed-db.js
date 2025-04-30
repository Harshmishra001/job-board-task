// This script imports the job data from the JSON file into MongoDB
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// MongoDB connection string
const MONGODB_URI = 'mongodb+srv://mohit:LNOfIPta7WSxrNEE@cluster0.ievjznx.mongodb.net/jobboard';

// Read the JSON file
const jobsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../app/data/mployee-data-clean.json'), 'utf8')
);

// Define the Job schema
const JobSchema = new mongoose.Schema({
  "Job ID (Numeric)": {
    type: String,
    required: true,
    unique: true,
  },
  id: {
    type: String,
    default: function() {
      return this["Job ID (Numeric)"];
    }
  },
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  job_link: {
    type: String,
    required: false,
  },
  employment_type: {
    type: String,
    required: false,
  },
  experience: {
    type: String,
    required: false,
  },
  source: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  postedDateTime: {
    type: Object,
    required: false,
  },
  companyImageUrl: {
    type: String,
    required: false,
  },
  min_exp: {
    type: Number,
    required: false,
  },
  max_exp: {
    type: Number,
    required: false,
  },
  seniority_level: {
    type: String,
    required: false,
  },
  company_url: {
    type: String,
    required: false,
  },
  companytype: {
    type: String,
    required: false,
  }
});

// Create the Job model
const Job = mongoose.model('Job', JobSchema);

async function seedDatabase() {
  try {
    // Connect to the database
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if we can access the database
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections in database:', collections.map(c => c.name));

    // Clear existing data
    await Job.deleteMany({});
    console.log('Cleared existing job data');

    // Insert the job data
    const result = await Job.insertMany(jobsData);
    console.log(`Inserted ${result.length} jobs into the database`);

    // Verify the data was inserted
    const count = await Job.countDocuments();
    console.log(`Total jobs in database after seeding: ${count}`);

    // List a few jobs to verify
    const sampleJobs = await Job.find().limit(2).lean();
    console.log('Sample jobs:', JSON.stringify(sampleJobs, null, 2));

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
