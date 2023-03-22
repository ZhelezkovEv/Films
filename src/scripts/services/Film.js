
export class Film {
    film = null;
    constructor(film) {
        this.film = film;
    }

    getHearthIcon = (isFeatured) => {
        if (isFeatured) return 'src/assets/hearth-filled.svg';
        return 'src/assets/hearth.svg';
    };
    get content() {
        return `
            <div class="col-4">
                <div class="card">
                  <img class="card-img-top" src=${this.film.posterUrl} alt=${this.film.nameRu}>
                  <div class="card-body">
                    <h5 class="card-title">${this.film.nameRu}</h5>
                    <p class="card-text">${this.film.year}</p>
                    <button data-id=${this.film.filmId} class="btn btn-like btn-light">
                        <img class="featured-icon" src=${this.getHearthIcon(this.film.isFeatured)} alt="Like">
                    </button>
                  </div>
                </div>
            </div>
        `;
    }
}
