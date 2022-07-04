import './news.css';
type source = {
    id: string;
    name: string;
};
// interface NewsObject {
//     [key: string]: string | source;
// }
export interface NewsObject {
    source: source;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

class News {
    draw(data: NewsObject[]): void {
        const news: NewsObject[] = data.length >= 10 ? data.filter((_item: NewsObject, idx: number) => idx < 10) : data;

        const fragment = document.createDocumentFragment() as DocumentFragment;
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item: NewsObject, idx: number) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLTemplateElement;

            if (idx % 2) newsClone.querySelector<HTMLTemplateElement>('.news__item').classList.add('alt');
            newsClone.querySelector<HTMLTemplateElement>('.news__meta-photo').style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;

            newsClone.querySelector<HTMLTemplateElement>('.news__meta-author').textContent =
                item.author || item.source.name;

            newsClone.querySelector<HTMLTemplateElement>('.news__meta-date').textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            newsClone.querySelector<HTMLTemplateElement>('.news__description-title').textContent = item.title;
            newsClone.querySelector<HTMLTemplateElement>('.news__description-source').textContent = item.source.name;
            newsClone.querySelector<HTMLTemplateElement>('.news__description-content').textContent = item.description;
            newsClone.querySelector<HTMLTemplateElement>('.news__read-more a').setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        document.querySelector<HTMLTemplateElement>('.news').innerHTML = '';
        document.querySelector('.news').appendChild(fragment);
    }
}

export default News;
