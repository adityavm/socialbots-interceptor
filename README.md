# socialbots-interceptor

An ExpressJS middleware to intercept requests from social media service crawlers (like Twitter, Facebook) and allow defining a custom handler.

## Usage
```javascript
const Interceptor = require("socialbots-interceptor");
// ...
app.use(Interceptor(cfg, (req, res, next) => {
  // ...
  res.status(404).send("Not found");
}));
```

## Options
* `shouldProceed`   (boolean, default `false`) makes the interceptor non-blocking
* `shouldWait`      (boolean, default `false`) waits on a promise from the given callback to proceed

*Note* Enabling either of them is not recommended. Your handler should completely handle and respond to the request, then quit.

## Supports
Currently supports:
* Twitter (`Twitterbot`)
* Facebook (`facebookexternalhit`)
