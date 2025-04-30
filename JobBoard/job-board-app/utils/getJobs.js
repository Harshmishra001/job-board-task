export async function getJobs(filters = {}) {
  try {
    console.log('Fetching jobs with filters:', filters);
    let url = '/api/jobs';

    // Add query parameters if filters are provided
    if (Object.keys(filters).length > 0) {
      const params = new URLSearchParams();

      if (filters.location) params.append('location', filters.location);
      if (filters.experience) params.append('experience', filters.experience);
      if (filters.company) params.append('company', filters.company);
      if (filters.source) params.append('source', filters.source);
      if (filters.country) params.append('country', filters.country);
      if (filters.minExp) params.append('minExp', filters.minExp);
      if (filters.maxExp) params.append('maxExp', filters.maxExp);

      url += `?${params.toString()}`;
    }

    console.log('Fetching from URL:', url);

    const response = await fetch(url, {
      // Add cache: 'no-store' to prevent caching issues
      cache: 'no-store'
    });

    if (!response.ok) {
      console.error(`Error fetching jobs: ${response.status} ${response.statusText}`);
      throw new Error('Failed to fetch jobs');
    }

    const jobs = await response.json();
    console.log(`Fetched ${jobs.length} jobs successfully`);
    return jobs;
  } catch (error) {
    console.error('Error in getJobs:', error);
    // Return empty array instead of throwing to prevent UI crashes
    return [];
  }
}

export async function getJobById(id) {
  console.log(`Fetching job with ID: ${id}`);

  try {
    const response = await fetch(`/api/jobs/${id}`, {
      // Add cache: 'no-store' to prevent caching issues
      cache: 'no-store'
    });

    if (!response.ok) {
      console.error(`Error fetching job: ${response.status} ${response.statusText}`);
      return null;
    }

    const job = await response.json();
    console.log(`Job fetched successfully:`, job);
    return job;
  } catch (error) {
    console.error(`Error in getJobById:`, error);
    return null;
  }
}
