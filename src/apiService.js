const amountRow = Math.floor(window.innerWidth / 360) * 3;
const apiKey = '23544458-47d8a7ce6c6a4e594a1925349';

export default {
  searchQuery: '',
  page: 1,

  fetchGAlleryImage() {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${amountRow}&key=${apiKey}`;

    return fetch(url)
      .then(res => res.json())
      .then(({ hits }) => {
        this.page += 1;
        return hits;
      })
      .catch(error => console.log(error));
  },
  get query() {
    return this.searchQuery;
  },
  set query(value) {
    this.searchQuery = value;
  },
  resetPage() {
    this.page = 1;
  },
};
