import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'e1536853551245008bf7901259fe3ef3', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
