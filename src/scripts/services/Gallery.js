import { Navigate } from "./Navigate.js";
import { Films } from "./Films.js";

const titleTextConfig = {
    default: 'All Films',
    featured: 'Favorite films'
}

export class Gallery {
    title = {
        content: 'All Films',
        id: 'title'
    }


    rootElement = null;

    isFeatured = false;

    navigateService = new Navigate();

    filmsService = new Films();


    constructor(rootElementId) {
        this.rootElement = document.querySelector(rootElementId);
    }

    switchIsFeatured = () => {
        this.isFeatured = !this.isFeatured
    }

    get content() {
        return `
            <div class="main-layout">
                <h1 id=${this.title.id}>${this.title.content}</h1>
                <div class="main-layout__content">
                ${this.navigateService.content}
                    <div id="films">
                        ${this.filmsService.getContent(this.isFeatured)}
                    </div>
                </div>
            </div>
        `
    }

    changeTitle = (type) => {
        this.title.content = titleTextConfig[type]
    };


    updateFilms = () => {
        const filmsNode = document.getElementById("films")
        filmsNode.innerHTML = this.filmsService.getContent(this.isFeatured)
    }

    initNavigateButtonListener = () => {
        const navigateButton = document.getElementById(this.navigateService.navigateButtonId);
        const title = document.getElementById(this.title.id)

        navigateButton.addEventListener("click", () => {
            this.switchIsFeatured()

            const type = this.isFeatured ? 'featured' : 'default';

            this.changeTitle(type);

            this.navigateService.onButtonClick(type, () => {
                navigateButton.innerHTML = this.navigateService.buttonContent;
                title.innerHTML = this.title.content;
                this.updateFilms();
            });
        });
    };

    initLikeButtonsListener = () => {
        document.addEventListener("click", (event) => {
            if (event.target.classList.contains('btn-like')) {
                const itemId = event.target.getAttribute('data-id')

                this.filmsService.switchLikeFilm(itemId);
                this.updateFilms()
            }
        });
    };


    initializeEventListeners = () => {
        this.initNavigateButtonListener();
        this.initLikeButtonsListener();
    }

    render = async () => {
        await this.filmsService.requestFilms()


        this.rootElement.innerHTML = this.content;

        this.initializeEventListeners()
    }
}

