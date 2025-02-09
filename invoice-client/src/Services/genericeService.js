// genericFetch.js
export async function genericFetch(url) {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return await response.json();
}
