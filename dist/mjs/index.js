import axios, { Axios } from 'axios';
import { Observable } from 'rxjs';
const originalRequest = Axios.prototype.request;
// @ts-ignore
Axios.prototype.request = function (config) {
    let cancelSource;
    const hasCancelToken = Boolean(config.cancelToken);
    if (hasCancelToken) {
        console.warn(`No need to use cancel token, just unsubscribe the subscription would cancel the http request automatically`);
    }
    const observable = new Observable((subscriber) => {
        if (!hasCancelToken) {
            cancelSource = axios.CancelToken.source();
            config.cancelToken = cancelSource.token;
        }
        originalRequest
            .call(this, config)
            // @ts-ignore
            .then((response) => {
            subscriber.next(response);
        })
            .catch((error) => subscriber.error(error))
            .finally(() => {
            subscriber.complete();
        });
    });
    const _subscribe = observable.subscribe.bind(observable);
    observable.subscribe = (...args2) => {
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
export default axios.create(axios.defaults);
