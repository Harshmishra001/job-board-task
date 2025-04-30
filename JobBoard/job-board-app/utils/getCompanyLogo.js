/**
 * Utility function to get a company logo URL
 * 
 * This function tries to find a logo for a company in the following order:
 * 1. Use the provided companyImageUrl if it exists
 * 2. Generate a logo from a logo API based on company name
 * 3. Fall back to a default placeholder
 * 
 * @param {Object} job - The job object
 * @returns {String} - URL to the company logo
 */
export function getCompanyLogo(job) {
  // If the job already has a company image URL, use it
  if (job.companyImageUrl && job.companyImageUrl.trim() !== '') {
    return job.companyImageUrl;
  }

  // Company name for generating a logo
  const companyName = job.company || 'Company';
  
  // Generate a logo using UI Avatars API (text-based avatar)
  // This creates a colored avatar with the company's initial
  const uiAvatarsUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&background=random&color=fff&size=128&bold=true`;
  
  // Alternative: Use Clearbit Logo API (actual company logos)
  // Note: This might not work for all companies and has usage limits
  const clearbitUrl = `https://logo.clearbit.com/${encodeURIComponent(companyName.toLowerCase().replace(/\s+/g, '') + '.com')}`;
  
  // Return the UI Avatars URL as it's more reliable
  return uiAvatarsUrl;
}

/**
 * Get a fallback logo with company initials
 * 
 * @param {String} companyName - The company name
 * @returns {String} - The first letter of the company name
 */
export function getCompanyInitial(companyName) {
  if (!companyName) return '?';
  return companyName.charAt(0).toUpperCase();
}
