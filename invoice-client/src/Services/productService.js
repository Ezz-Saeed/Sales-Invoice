// ProductService.js
import { genericFetch, genericPost} from './genericeService';  

const API_URL = 'http://localhost:5024/api/products';

// Function to fetch the list of products from the API
export const fetchProducts = async () => {
  try {
    const products = await genericFetch(`${API_URL}/getProducts`);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};


export async function getInvoice(invoiceId = 18) {
  try{
    const invoice = await genericFetch(`${API_URL}/getInvoiceItems/${invoiceId}`)
    // console.log(invoice)
    return invoice;
  } catch(error){
    console.error('Error fetching items:', error);
    throw new Error('Failed to fetch items');
  }
}


export async function addToCart(invoiceItem) {
  const url = `${API_URL}/addToCart`;
  const data = {
    productId: invoiceItem.productId,
    quantity: invoiceItem.quantity,
    invoiceId: invoiceItem.invoiceId,
    unitPrice: invoiceItem.unitPrice
  };
  const invoice = await genericPost(url, data);
  // console.log(invoice)
  return invoice;
}


export async function checkout(invoiceId = 18) {
  const url = `${API_URL}/checkout/${invoiceId}`;
  const data = {};
  const invoice = await genericPost(url, data);
  // console.log(invoice)
  return invoice;
}

