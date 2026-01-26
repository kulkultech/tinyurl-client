import * as axios from "axios";
import * as chai from "chai";
import sinon from "sinon";
import shortenUrl from "../src";

const { expect } = chai;

describe("Shorten URL", () => {
  let axiosPostStub;

  describe("Create short URL without alias", () => {
    before(() => {
      axiosPostStub = sinon
        .stub(axios, "post")
        .returns({ data: { tinyurl: "https://tinyurl.com/ydyofn2z" } });
    });

    after(() => {
      axiosPostStub.restore();
    });

    it("should be able to shorten url using TinyURL", async () => {
      const url = "https://kulkul.tech";
      const response = await shortenUrl(url);
      expect(response).to.be.equal("https://tinyurl.com/ydyofn2z");
    });
  });

  describe("Create short URL with alias", () => {
    before(() => {
      axiosPostStub = sinon
        .stub(axios, "post")
        .returns({ data: { tinyurl: "https://tinyurl.com/shorted-kulkul" } });
    });

    after(() => {
      axiosPostStub.restore();
    });

    it("should be able to shorten url using TinyURL with alias (note: actual API doesn't support custom aliases)", async () => {
      const url = "https://kulkul.tech";
      const response = await shortenUrl(url, "shorted-kulkul");
      // Note: In reality, the alias parameter is ignored by the API
      // This test is kept for backwards compatibility but returns a random slug
      expect(response).to.be.equal("https://tinyurl.com/shorted-kulkul");
    });
  });
});
