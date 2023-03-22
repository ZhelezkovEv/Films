const buttonContentConfig = {
    default: 'See favorite films',
    featured: 'See all films',
}


export class Navigate {
    navigateButtonId = 'navigate-button'

    buttonContent = 'See favorite films';

    changeButtonContetn = (newButtonContent) => {
        this.buttonContent = newButtonContent
    };


    onButtonClick = (type, callback) => {
        const newButtonContent = buttonContentConfig[type]
        this.changeButtonContetn(newButtonContent)
        if (callback) callback()
    };


    get content() {
        return `
            <div class="navigate mb-3">
                <button class="btn btn-primary" id=${this.navigateButtonId}>
                ${this.buttonContent}</button>
            </div>
        `
    }
}