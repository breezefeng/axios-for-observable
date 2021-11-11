import { AxiosInstance } from 'axios';
import { Observable } from 'rxjs';
declare type AxiosObservable<T> = Observable<T>;
declare module 'axios' {
    interface Axios {
        request<T = never, R = AxiosResponse<T>>(config: AxiosRequestConfig<T>): AxiosObservable<R> | AxiosPromise<R>;
        create(config?: AxiosRequestConfig): AxiosInstance;
    }
}
declare const _default: AxiosInstance;
export default _default;
