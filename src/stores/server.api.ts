import {
    plainToClass,
    plainToInstance,
  } from 'class-transformer';
  import router from '../router';
  export type Endpoints =
    | 'shops'
   
  
  export interface Query {
    key: string;
    value: string;
  }
  export interface ApiError extends Error {
    status: number;
  }
  
  export class Api {
    static shared = () => {
            return new Api(`http://localhost:3000/api`);
      };
    private rootPath: string;
    path: string = '';
    constructor(rootPath: string) {
      this.rootPath = rootPath;
    }
    child(endpoint: Endpoints, params?: string): Api {
      this.path = this.path + `/${endpoint}`;
      if (params) this.path = this.path + `/${params}`;
      return this;
    }
    async get<Entity>(
      queryParams: Array<Query> = [],
      constructor: any,
    ): Promise<Entity> {
      let url = new URL(`${this.rootPath}${this.path}`);
      queryParams.forEach((q) => url.searchParams.append(q.key, q.value));
      const response: string = await fetch(url.toString(), {
        method: 'GET',
      }).then((response) => {
        return this.handleResponse(response);
      });
      return await plainToInstance<Entity, string>(constructor, response);
    }
  
    async delete(query?: Query): Promise<any> {
      let url = new URL(this.rootPath + this.path);
      let request = new Request(url.toString(), {
        headers: {
          Accept: 'application/json;charset=utf-8',
          Origin: '*',
          'Access-Control-Max-Age': '600',
        },
        method: 'DELETE',
      });
      return await fetch(request).then((response) => {
        return this.handleResponse(response);
      });
    }
    async post<Save, Created>(entity: Save, constructor: any): Promise<Created> {
      let request = new Request(this.rootPath + this.path, {
        headers: {
          Accept: 'application/json;charset=utf-8',
          'Access-Control-Max-Age': '600',
          'Content-Type': 'application/json;charset=utf-8',
        },
        mode: 'cors',
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(entity),
      });
      const reponse: string = await fetch(request).then((response) =>
        this.handleResponse(response),
      );
  
      return await plainToClass(constructor, reponse);
    }
    async update<Update, Entity>(
      entity: Update,
      constructor: any,
      query?: Query,
    ): Promise<Entity> {
      let url = new URL(this.rootPath + this.path);
      if (query) url.searchParams.append(query.key, query.value);
      let request = new Request(url.toString(), {
        headers: {
          Accept: 'application/json;charset=utf-8',
          Origin: '*',
          'Access-Control-Max-Age': '600',
          'Content-Type': 'application/json;charset=utf-8',
        },
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify(entity),
      });
      const response: string = await fetch(request).then((response) => {
        return this.handleResponse(response);
      });
      return await plainToInstance<Entity, string>(constructor, response);
    }
    async upload<F extends FormData, Entity>(
      entity: F,
      constructor: any,
      query?: Query,
    ): Promise<Entity> {
      let url = new URL(this.rootPath + this.path);
      if (query) url.searchParams.append(query.key, query.value);
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'multipart/form-data');
      let request = new Request(url.toString(), {
        credentials: 'include',
        method: 'POST',
        body: entity,
      });
      const response: string = await fetch(request).then((response) => {
        return this.handleResponse(response);
      });
      return await plainToInstance<Entity, string>(constructor, response);
    }
    private handleResponse(response: Response): Promise<any> {
      return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
          if (response.status === 401) {  
            router.push('/auth');
            location.reload();
          }
          const error = (data && data.error) || response.statusText;
          const apiError: ApiError = {
            status: response.status,
            name: 'apiError',
            message: error,
          };
          throw apiError;
        }
        return data;
      });
    }
  }
  
  