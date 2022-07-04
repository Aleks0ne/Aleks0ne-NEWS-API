interface GetResp {
    endpoint: string;
    options?: requestOptions;
}

interface requestOptions {
    [key: string]: string;
}

interface PreLoader {
    baseLink: string;
    options: requestOptions;
    getResp({ endpoint, options }: GetResp, callback: () => void): void;
    errorHandler(res: Response): Response;
    makeUrl(options: requestOptions, endpoint: string): string;
    load(method: string, endpoint: string, callback: (data: string) => void, options: requestOptions): void;
}

class Loader implements PreLoader {
    baseLink: string;
    options: requestOptions;
    constructor(baseLink: string, options: requestOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: GetResp,
        callback = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: requestOptions, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: 'GET' | 'POST', endpoint: string, callback: (data: string) => void, options: requestOptions = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
