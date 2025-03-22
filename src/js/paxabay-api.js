import axios from 'axios';

export async function getImage(imgInfo, page) {
  const { data } = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '49113920-f9af0cc3a936c3f1f6e808981',
      q: imgInfo,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page,
    },
  });
  return data;
}