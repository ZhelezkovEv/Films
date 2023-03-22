import { Film } from "./Film.js";


export class Films {
    films = [];

    get featuredFilms() {
        return this.films.filter((film) => film.isFeatured);
    };

    sortFilms = () => {
        this.films.sort((a, b) => a.filmId - b.filmId).sort((a) => (a.isFeatured ? -1 : 1));
    };

    switchLikeFilm = (filmId) => {
        this.films = this.films.map((film) => {
            if (film.filmId === +filmId) {
                return {
                    ...film,
                    isFeatured: !film.isFeatured,
                };
            }

            return film;
        })

        this.sortFilms()
    }

    requestFilms = async () => {
        const response = await fetch("./src/api/films.json")
        this.films = await response.json();

        this.sortFilms();
    };
    
    getContent(isFeatured) {
        const correctFilmArray = isFeatured ? this.featuredFilms : this.films

        return `
            <div class="row g-5">${correctFilmArray.map((film) => new Film(film).content).join('')}</div>
        `;
    }

}

