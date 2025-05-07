'use client';

import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

export default function PostJobForm() {
  const { user, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    company_url: '',
    job_link: '',
    employment_type: 'Full-time',
    experience: '0-5 years',
    companyImageUrl: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Include the user ID in the job data
      const jobData = {
        ...formData,
        userId: user?.id
      };

      const response = await fetch('/api/jobs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: 'Job posted successfully! It will appear at the top of the job listings.'
        });
        // Reset form
        setFormData({
          title: '',
          company: '',
          location: '',
          description: '',
          company_url: '',
          job_link: '',
          employment_type: 'Full-time',
          experience: '0-5 years',
          companyImageUrl: ''
        });
        // Close form after successful submission
        setTimeout(() => {
          setShowForm(false);
        }, 3000);
      } else {
        setSubmitStatus({
          success: false,
          message: data.error || 'Failed to post job. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error posting job:', error);
      setSubmitStatus({
        success: false,
        message: 'An error occurred while posting the job. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
      // Refresh the page after 3 seconds on success to show the new job
      if (submitStatus && submitStatus.success) {
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    }
  };

  return (
    <div className="mb-8">
      {isAuthenticated && user?.role === 'employer' ? (
        <>
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 mb-4"
          >
            {showForm ? 'Hide Job Posting Form' : 'Post a New Job'}
          </button>

          {showForm && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 animate-fadeIn">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Post a New Job</h2>

              {submitStatus && (
                <div className={`p-4 mb-4 rounded-lg ${submitStatus.success ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-200'}`}>
                  {submitStatus.message}
                </div>
              )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Job Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="e.g. Frontend Developer"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Company Name *</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="e.g. Acme Inc."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="e.g. New York, NY or Remote"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Employment Type</label>
                  <select
                    name="employment_type"
                    value={formData.employment_type}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Company Website</label>
                  <input
                    type="url"
                    name="company_url"
                    value={formData.company_url}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="e.g. https://company.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Application Link</label>
                  <input
                    type="url"
                    name="job_link"
                    value={formData.job_link}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="e.g. https://company.com/careers/job123"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Company Logo URL</label>
                <input
                  type="url"
                  name="companyImageUrl"
                  value={formData.companyImageUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="e.g. https://company.com/logo.png"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Job Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Describe the job role, responsibilities, requirements, etc."
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 rounded-lg font-semibold text-white ${isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} transition-colors duration-300`}
                >
                  {isSubmitting ? 'Posting...' : 'Post Job'}
                </button>
              </div>
            </form>
            </div>
          )}
        </>
      ) : isAuthenticated ? (
        <div className="bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-200 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2">Want to post a job?</h3>
          <p className="mb-4">You need an employer account to post jobs. Please log out and create a new account as an employer.</p>
        </div>
      ) : (
        <div className="bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-200 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2">Want to post a job?</h3>
          <p className="mb-4">Please sign up or log in as an employer to post jobs.</p>
          <button
            onClick={() => {
              // This would ideally trigger the auth modal in the Navbar
              alert('Please use the Sign Up button in the navigation bar to create an employer account.');
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Sign Up as Employer
          </button>
        </div>
      )}
    </div>
  );
}
