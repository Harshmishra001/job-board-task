import mongoose from 'mongoose';

// Check if the Job model already exists to prevent overwriting
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
    $date: {
      type: String,
      required: false,
    }
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
  },
  description: {
    type: String,
    required: false,
  },
  expired: {
    type: Boolean,
    default: false
  }
});

// Use mongoose.models to check if the model exists already
export default mongoose.models.Job || mongoose.model('Job', JobSchema);
