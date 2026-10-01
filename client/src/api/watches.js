 const BASE_URL = import.meta.env.VITE_API_URL || '/api';

  // Get all watches (used on Collection page)
  export const getAllWatches = async () => {
    const response = await fetch(`${BASE_URL}/watches`);
    if (!response.ok) {
      throw new Error('Failed to fetch watches');
    }
    return response.json();
  };

  // Get a single watch by its slug (used on ProductDetail page)
  export const getWatchBySlug = async (slug) => {
    const response = await fetch(`${BASE_URL}/watches/${slug}`);
    if (!response.ok) {
      throw new Error('Failed to fetch this watch');
    }
    return response.json();
  };

  // Submit an enquiry (used on the enquiry form later)
  export const submitEnquiry = async (enquiryData) => {
    const response = await fetch(`${BASE_URL}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiryData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit enquiry');
    }
    return response.json();
  };
