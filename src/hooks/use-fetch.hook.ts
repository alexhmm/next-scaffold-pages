// Types
import { FetchDataOptions } from '../types/fetch-data.types';

class FetchError extends Error {
  constructor(public response: Response, message?: string) {
    super(message);
  }
}

const useFetch = () => {
  /**
   * Fetch data by query.
   * @param path Path
   * @param options Fetch options
   * @returns JSON data | Error
   */
  const fetchData = async (path: string, options?: FetchDataOptions) => {
    try {
      // Cast query params to string
      const params = options?.params?.toString();

      // Setup url with query params
      const url = `https://swapi.dev/api/${path}${
        params && params?.length > 0 ? `?${options?.params}` : ''
      }`;

      return fetch(url, {
        body: options?.body ? JSON.stringify(options.body) : undefined,
        method: options?.method,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }).then(async (response) => {
        if (!response.ok) {
          throw new FetchError(response, JSON.stringify(options?.body));
        }
        return await response.json().catch((error) => {
          if (response.status === 200 || response.status === 204) {
            return {};
          } else {
            console.error('Error fetching data:', error);
            return {};
          }
        });
      });
    } catch (error) {
      console.error('ERROR fetching data:', error);
    }
  };

  /**
   * Handle common http errors / status codes.
   * @param status Http response status code
   * @returns Error message
   */
  const handleError = (status: number): string => {
    switch (status) {
      case 401:
        // Logout if unauthorized
        return '';
      default:
        // return `Code ${status}: ${t('app.fetch.error.response')}`;
        return `Code ${status}`;
    }
  };

  /**
   * Handle http request retry by status code.
   * Response status codes beginning with the digit "5" indicate cases in which the server is aware that it has encountered an error or is otherwise incapable of performing the request.
   * @param failureCount Failure count
   * @param error Error response
   * @returns Retrying state
   */
  const handleRetry = (failureCount: number, error: any): boolean => {
    const status = error?.response?.status;
    // Abort retrying after 3 tries
    if (status && status >= 500 && status <= 513 && failureCount < 2) {
      return true;
    } else {
      return false;
    }
  };

  return {
    fetchData,
    handleError,
    handleRetry,
  };
};

export default useFetch;
