"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importStar(require("axios"));
const rxjs_1 = require("rxjs");
const originalRequest = axios_1.Axios.prototype.request;
// @ts-ignore
axios_1.Axios.prototype.request = function (config) {
    let cancelSource;
    const hasCancelToken = Boolean(config.cancelToken);
    if (hasCancelToken) {
        console.warn(`No need to use cancel token, just unsubscribe the subscription would cancel the http request automatically`);
    }
    const observable = new rxjs_1.Observable((subscriber) => {
        if (!hasCancelToken) {
            cancelSource = axios_1.default.CancelToken.source();
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
exports.default = axios_1.default.create(axios_1.default.defaults);
