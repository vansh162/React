// API configuration for local development and production
// In development, use localhost JSON server
// In production, use relative URL which will work with Vercel serverless function
export const API_PRODUCTS_URL = import.meta.env.DEV 
  ? 'http://localhost:3004/product'
  : '/api/product';

