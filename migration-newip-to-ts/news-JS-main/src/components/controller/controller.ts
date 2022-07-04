import AppLoader from './appLoader';

type Func = <T>(arg?: T) => void;

class AppController extends AppLoader {
    getSources(callback: Func) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: Func) {
        console.log(e);
        let target = <HTMLTemplateElement>e.target;
        const newsContainer = <HTMLTemplateElement>e.currentTarget;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = <HTMLTemplateElement>target.parentNode;
        }
    }
}

export default AppController;
