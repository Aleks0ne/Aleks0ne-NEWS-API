import './sources.css';
export interface SourceObject {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}
class Sources {
    draw(data: SourceObject[]) {
        const fragment = document.createDocumentFragment() as DocumentFragment;
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        data.forEach((item: SourceObject) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLTemplateElement;

            sourceClone.querySelector<HTMLTemplateElement>('.source__item-name').textContent = item.name;
            sourceClone.querySelector<HTMLTemplateElement>('.source__item').setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        document.querySelector<HTMLTemplateElement>('.sources').append(fragment);
    }
}

export default Sources;
