// ProductService.js
import { genericFetch } from './genericeService';  // The generic fetch function you created

const API_URL = 'http://localhost:5024/api/products/getProducts';  // Replace with your actual API URL

// Function to fetch the list of products from the API
export const fetchProducts = async () => {
  try {
    const products = await genericFetch(API_URL);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};
