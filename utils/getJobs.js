/**
 * Utility function to fetch jobs from the API
 * @param {Object} filters - Optional filters to apply to the job search
 * @returns {Promise<Array>} - Array of job objects
 */
export const getJobs = async (filters = {}) => {
  try {
    // Build query string from filters
    const queryParams = new URLSearchParams();
    
    // Add each filter to the query params if it has a value
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value);
      }
    });
    
    // Create the URL with query parameters if any
    const queryString = queryParams.toString();
    const url = `/api/jobs${queryString ? `?${queryString}` : ''}`;
    
    console.log('Fetching jobs from:', url);
    
    // Fetch jobs from the API
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch jobs: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Sort jobs by posted date (newest first)
    // User-submitted jobs (those with postedBy field) should appear at the top
    return data.sort((a, b) => {
      // First sort by source (User Submitted first)
      if ((a.postedBy && !b.postedBy) || (a.source === 'User Submitted' && b.source !== 'User Submitted')) {
        return -1;
      }
      if ((!a.postedBy && b.postedBy) || (a.source !== 'User Submitted' && b.source === 'User Submitted')) {
        return 1;
      }
      
      // Then sort by date (newest first)
      const dateA = a.postedDateTime?.$date ? new Date(a.postedDateTime.$date) : new Date(0);
      const dateB = b.postedDateTime?.$date ? new Date(b.postedDateTime.$date) : new Date(0);
      return dateB - dateA;
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
};
