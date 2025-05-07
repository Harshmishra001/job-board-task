/**
 * Utility functions for handling company logos
 */

/**
 * Get the company logo URL for a job
 * @param {Object} job - The job object
 * @returns {string} - URL to the company logo
 */
export const getCompanyLogo = (job) => {
  if (!job) return '';
  
  // If the job has a companyImageUrl, use it
  if (job.companyImageUrl && job.companyImageUrl.trim() !== '') {
    return job.companyImageUrl;
  }
  
  // Clean the company name for use in URL
  const companyName = job.company ? job.company.toLowerCase().replace(/[^a-z0-9]/g, '') : '';
  
  // Try to get a logo from Clearbit API
  return `https://logo.clearbit.com/${companyName}.com`;
};

/**
 * Get the first letter of the company name for fallback display
 * @param {string} companyName - The company name
 * @returns {string} - First letter of the company name
 */
export const getCompanyInitial = (companyName) => {
  if (!companyName) return '?';
  
  // Get the first letter of the company name
  return companyName.trim().charAt(0).toUpperCase();
};
