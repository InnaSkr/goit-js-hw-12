import axios from 'axios';

const API_KEY = '49113920-f9af0cc3a936c3f1f6e808981';
const BASE_URL = 'https://pixabay.com/api/';
export const PAGE_SIZE = 15;

export async function fetchPixabay(searchQuery, currentPage = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: currentPage,
        per_page: PAGE_SIZE,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}