
# axios-for-observable
##### Observable (as opposed to Promise) based HTTP client for the browser and node.js
Want to use axios in a rxjs (observable) way? There we go!

This API of axios-for-observable is same as API of axios, giving you smooth transition. So the documentation mirrors the one of axios (A few exceptions will be cleared pointed out).

## Features

- The same api with axios
- Make [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) from the browser
- Make [http](http://nodejs.org/api/http.html) requests from node.js
- Supports the **Observable** API
- Intercept request and response
- Transform request and response data
- Cancel requests through unsubscribe
- Automatic transforms for JSON data
- Client side support for protecting against [XSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery)
- Strong support for typescript

## Installing

Using npm:
note: `axios` and `rxjs` are peer dependencies.

```bash
$ npm install axios rxjs axios-for-observable
```
