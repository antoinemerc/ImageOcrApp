
enum RequestTypeValue { 
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface IHttpRequest { 

  endpoint: string;

  fetchApi(url: string, requestType: RequestTypeValue, options: any): Promise<any>;
  post(endpoint: string, options: { body: any }): Promise<any>;
  handleFetchError(err: any): Response;
}


export class HttpRequest implements IHttpRequest { 

  endpoint = import.meta.env.VITE_BACKEND_ENDPOINT;

  constructor() {}

  /**
   * Do not use directly, implement method function (get, put, delete, post, etc...)
   * @param apiRoute will be transformed to ${endpoint}/${apiRoute}
   * @param requestType see @type {RequestTypeValue}
   * @param options left as @type {any} to accomodate different function type
   * @returns result of API in promise
   */
  fetchApi(apiRoute: string, requestType: RequestTypeValue, options: any): Promise<any> { 
    return fetch(`${this.endpoint}/${apiRoute}`, {
      method: requestType,
      ...options,
    }).catch(this.handleFetchError);
  }

  /**
   * 
   * @param apiRoute will be transformed to ${endpoint}/${apiRoute}
   * @param body options of the post request ex: {body: formData}
   * @returns  result of API in promise
   */
  post(apiRoute: string, body: any): Promise<any> { 
    return this.fetchApi(apiRoute, RequestTypeValue.POST, body)
  }

  handleFetchError(err: any) {
    console.warn(err);
    return new Response(JSON.stringify({
      code: 400,
      message: 'Network Error'
    }));
  }

}