/*
 * redirect requests from social media
 * to different renderer
 */

function Render(cfg, cb = () => null) {

  let
    callback = cb;
    agents = [
      "Twitterbot",
      "facebookexternalhit",
    ];
    config = {
      shouldProceed: false,
      shouldWait: false,
    };

  // overwrite
  overwrite(cfg);

  return function (req, res, next) {
    let
      headers = req.get("user-agent"),
      match = false,
      proceed = null;

    agents.forEach(agent => {
      if (headers.match(agent)) {
        match = true;
      }
    });

    if (match === true) {
      proceed = cb(req, res, next);
    } else {
      next();
    }

    // if go to next route handler
    if (config.shouldProceed) {
      // if async
      if (config.shouldWait) {
        proceed.then(() => next());
      }
      // just proceed
      else {
        next();
      }
    }
  }

  function overwrite() {
    if (cfg === null) return;
    Object.keys(cfg).forEach(key => {
      config[key] = cfg[key];
    });
  }
}

module.exports = Render;
