export default function apiService(search, page, callback) {

  fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${search}&page=${page}&per_page=12&key=16992764-8af42002c4860ee5a456b1bc1`)
    .then(response => response.json())
    .then(d => callback(d));
  return callback
}
