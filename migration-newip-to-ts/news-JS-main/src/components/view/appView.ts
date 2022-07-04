import News from './news/news';
import { NewsObject } from './news/news';
import Sources from './sources/sources';
import { SourceObject } from './sources/sources';

interface ApiNewsObject {
    articles: NewsObject[];
    status: string;
    totalResults: number;
}
interface ApiSourceObject {
    status: string;
    sources: SourceObject[];
}

export class AppView {
    news: News;
    sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: ApiNewsObject) {
        const values: NewsObject[] | [] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: ApiSourceObject) {
        console.log('drawSources', data);
        const values: SourceObject[] | [] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
