import { TablePagination } from "../domain/table/RechargePagination";

export abstract class BaseRepository {
    protected baseUrl: string = import.meta.env.VITE_BACKEND_BASE_URL;

    public async getHeaders(contentType?: string): Promise<Headers> {
        const headers = new Headers();

        if (contentType) {
            headers.append("Content-Type", contentType);
        }

        return headers;
    }

    public async makeRequest<T>(url: string, options: RequestInit): Promise<T> {
        try {
            options.credentials = 'include';

            if (options.body instanceof FormData && options.headers) {
                (options.headers as Headers).delete("Content-Type");
            }

            const response = await fetch(url, options);

            if (!response.ok) {
                const errorText = await response.text();
                let errorDetails;

                try {
                    errorDetails = await response.json();
                } catch (e) {
                    errorDetails = null;
                }

                if (errorDetails?.error?.message) {
                    throw new Error(errorDetails.error.message);
                }

                throw new Error(errorText || 'Something went wrong');
            }

            return await response.json() as T;
        } catch (error: unknown) {
            if (error instanceof Error) {
                // console.error('Error occurred during the request:', error.message);

                throw new Error(`Request failed with URL: ${url}. Error: ${error.message}`);
            } else {
                // console.error('An unknown error occurred:', error);

                throw new Error(`Request failed with URL: ${url}. Error: Unknown error`);
            }
        }
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.baseUrl}${endpoint}`;
    }

    public getPaginationPath(pagination: TablePagination): string {
        const { pageSize, currentPage } = pagination;

        return `?currentPage=${currentPage}&pageSize=${pageSize}`;
    }
}