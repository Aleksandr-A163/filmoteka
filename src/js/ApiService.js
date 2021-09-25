const BASE_URL = 'https://api.themoviedb.org/3/'
const KEY = '1e27ccd499acdd34586e1a1998d6f578'


export default class FilmsApiService {
  constructor() {
    this.page = 1; 
    this.periodOfPop = 'day';
  };

  fetchFilmsHomePage() {
    const url = `${BASE_URL}trending/movie/${this.periodOfPop}?api_key=${KEY}&page=${this.page}`;

    return fetch(url)
      .then(res=> res.json())
      .then((info) => {
        console.log(info);
        return info })
  };
}

