import axios from 'axios';

const API_KEY = '49113920-f9af0cc3a936c3f1f6e808981';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 40;

export async function fetchImages(query, page) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                per_page: PER_PAGE,
                page: page,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
}