import { AxiosRequestConfig, AxiosResponse, AxiosInterceptorManager, CancelStatic, CancelTokenStatic, AxiosError } from 'axios';
import { Observable } from 'rxjs';

export class AxiosObservable {
    constructor(config?: AxiosRequestConfig);
    defaults: AxiosRequestConfig;
    interceptors: {
      request: AxiosInterceptorManager<AxiosRequestConfig>;
      response: AxiosInterceptorManager<AxiosResponse>;
    };
    getUri(config?: AxiosRequestConfig): string;
    request<T = never, R = AxiosResponse<T>> (config: AxiosRequestConfig<T>): Observable<R>;
    get<T = never, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig<T>): Observable<R>;
    delete<T = never, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig<T>): Observable<R>;
    head<T = never, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig<T>): Observable<R>;
    options<T = never, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig<T>): Observable<R>;
    post<T = never, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig<T>): Observable<R>;
    put<T = never, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig<T>): Observable<R>;
    patch<T = never, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig<T>): Observable<R>;
  }
  
  export interface AxiosObservableInstance extends AxiosObservable {
    <T, R>(config: AxiosRequestConfig<T>): Observable<R>;
    <T, R>(url: string, config?: AxiosRequestConfig<T>): Observable<R>;
  }
  
  export interface AxiosObservableStatic extends AxiosObservableInstance {
    create(config?: AxiosRequestConfig): AxiosObservableInstance;
    Cancel: CancelStatic;
    CancelToken: CancelTokenStatic;
    Axios: typeof AxiosObservable;
    readonly VERSION: string;
    isCancel(value: any): boolean;
    all<T>(values: (T | Promise<T>)[]): Observable<T[]>;
    spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R;
    isAxiosError(payload: any): payload is AxiosError;
  }


declare const _default: AxiosObservableStatic;
export default _default;
