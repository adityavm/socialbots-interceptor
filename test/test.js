const assert = require("assert");

describe ("socialbot interceptor", () => {

  const interceptor = require("../index");

  it("should exist", () => {
    assert(interceptor !== undefined);
  });

  it("should return a function", () => {
    assert(typeof interceptor === "function");
  });

  describe("when responding", () => {

    let
      called,
      req,
      res,
      next;

    beforeEach(() => {

        called = false,
        req = { get: () => "Twitterbot" },
        res = { send: () => null },
        next = () => null;

    });

    it("should check for request to be from a bot", () => {

      // success case
      interceptor(null, () => {
        called = true;
      })(req, res, next);

      assert(called === true);

      called = false;
      req = { get: () => `Mozilla/5.0 (iPad; U; CPU OS 3_2_1 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Mobile/7B405` };

      // failure case
      interceptor(null, () => {
        called = true;
      })(req, res, next);

      assert(called === false);

    });

    it("should not proceed by default", () => {

      let _next = () => called = true;

      interceptor({}, (req, res, _next) => {
        called = false;
      })(req, res, next);

      assert(called === false);

    });

    it("should proceed if set", () => {

      interceptor({ shouldProceed: true }, (req, res, () => called = true))(req, res, next);

      assert(called === true);

    });

  });

});
