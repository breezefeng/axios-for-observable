import axios, { AxiosPromise, AxiosResponse, AxiosRequestConfig, CancelTokenSource, Axios, AxiosInstance }  from 'axios';
import { Observable } from 'rxjs';

type AxiosObservable<T> = Observable<T>;

declare module 'axios' {
    interface Axios {
        request<T = never, R = AxiosResponse<T>>(config: AxiosRequestConfig<T>): AxiosObservable<R> | AxiosPromise<R>;
        create(config?: AxiosRequestConfig): AxiosInstance;
    }
}

const originalRequest = Axios.prototype.request;

// @ts-ignore
Axios.prototype.request = function <T = never, R = AxiosResponse<T>>(config: AxiosRequestConfig<T>): AxiosObservable<R> | AxiosPromise<R> {
    let cancelSource: CancelTokenSource;
    const hasCancelToken = Boolean(config.cancelToken);
    if (hasCancelToken) {
        console.warn(
            `No need to use cancel token, just unsubscribe the subscription would cancel the http request automatically`,
        );
    }
    const observable:AxiosObservable<R> = new Observable((subscriber: any) => {
        if (!hasCancelToken) {
            cancelSource = axios.CancelToken.source();
            config.cancelToken = cancelSource.token;
        }

        originalRequest
            .call(this, config)
            // @ts-ignore
            .then((response: any) => {
                subscriber.next(response);
            })
            .catch((error: any) => subscriber.error(error))
            .finally(() => {
                subscriber.complete();
            });
    });

    const _subscribe = observable.subscribe.bind(observable);

    observable.subscribe = (...args2: any[]) => {
        const subscription = _subscribe(...args2);

        const _unsubscribe = subscription.unsubscribe.bind(subscription);

        subscription.unsubscribe = () => {
            if (cancelSource) {
                cancelSource.cancel();
            }
            _unsubscribe();
        };
        return subscription;
    };

    return observable;
};

export default axios.create(axios.defaults as any);