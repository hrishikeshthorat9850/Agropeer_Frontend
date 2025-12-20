/**
 * API Helper Utilities
 * Provides consistent API calling patterns and error handling
 */

/**
 * Get the base URL for API calls
 * Works in both client and server environments
 */
export function getApiBaseUrl() {
  if (typeof window !== 'undefined') {
    // Client-side: use relative URL
    return '';
  }
  
  // Server-side: construct absolute URL
  return process.env.BASE_URL || process.env.NEXT_PUBLIC_APP_URL 
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null)
    || 'http://localhost:3000';
}

/**
 * Make an API request with proper error handling
 * @param {string} endpoint - API endpoint (e.g., '/api/post-comment')
 * @param {object} options - Fetch options
 * @returns {Promise<{data: any, error: Error|null}>}
 */
export async function apiRequest(endpoint, options = {}) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || `API request failed: ${response.statusText}`);
      error.status = response.status;
      error.data = data;
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    const error = new Error(err.message || 'Network error occurred');
    error.originalError = err;
    return { data: null, error };
  }
}

/**
 * Validate comment text
 * @param {string} text - Comment text to validate
 * @returns {{valid: boolean, error: string|null}}
 */
export function validateComment(text) {
  if (!text || typeof text !== 'string') {
    return { valid: false, error: 'Comment cannot be empty' };
  }

  const trimmed = text.trim();
  
  if (trimmed.length === 0) {
    return { valid: false, error: 'Comment cannot be empty' };
  }

  if (trimmed.length > 5000) {
    return { valid: false, error: 'Comment is too long (max 5000 characters)' };
  }

  // Check for potentially harmful content (basic XSS prevention)
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
  ];

  for (const pattern of dangerousPatterns) {
    if (pattern.test(trimmed)) {
      return { valid: false, error: 'Comment contains invalid content' };
    }
  }

  return { valid: true, error: null };
}

/**
 * Sanitize comment text (basic)
 * @param {string} text - Text to sanitize
 * @returns {string}
 */
export function sanitizeComment(text) {
  if (!text || typeof text !== 'string') {
    return '';
  }

  return text
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .slice(0, 5000); // Limit length
}

