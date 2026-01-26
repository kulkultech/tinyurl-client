import * as axios from "axios";
import * as chai from "chai";
import sinon from "sinon";
import shortenUrl from "../src";

const { expect } = chai;

describe("Shorten URL", () => {
  describe("Create short URL without alias", () => {
    let axiosPostStub;

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

  describe("Create short URL with alias (deprecated)", () => {
    let axiosPostStub;

    before(() => {
      // Mock returns a random slug since aliases are not supported
      axiosPostStub = sinon
        .stub(axios, "post")
        .returns({ data: { tinyurl: "https://tinyurl.com/abc123xyz" } });
    });

    after(() => {
      axiosPostStub.restore();
    });

    it("should ignore alias parameter and return random slug", async () => {
      const url = "https://kulkul.tech";
      const response = await shortenUrl(url, "shorted-kulkul");
      // The alias is ignored and a random slug is returned
      expect(response).to.be.equal("https://tinyurl.com/abc123xyz");
    });
  });

  describe("Error handling", () => {
    let axiosPostStub;

    afterEach(() => {
      if (axiosPostStub) {
        axiosPostStub.restore();
      }
    });

    it("should throw error for empty URL", async () => {
      try {
        await shortenUrl("");
        expect.fail("Should have thrown an error");
      } catch (error) {
        expect(error.message).to.include("non-empty string");
      }
    });

    it("should throw error for non-string URL", async () => {
      try {
        await shortenUrl(null);
        expect.fail("Should have thrown an error");
      } catch (error) {
        expect(error.message).to.include("non-empty string");
      }
    });

    it("should handle API errors gracefully", async () => {
      axiosPostStub = sinon
        .stub(axios, "post")
        .rejects(new Error("Network error"));

      try {
        await shortenUrl("https://kulkul.tech");
        expect.fail("Should have thrown an error");
      } catch (error) {
        expect(error.message).to.include("Failed to shorten URL");
      }
    });

    it("should handle invalid response structure", async () => {
      axiosPostStub = sinon
        .stub(axios, "post")
        .returns({ data: { invalid: "response" } });

      try {
        await shortenUrl("https://kulkul.tech");
        expect.fail("Should have thrown an error");
      } catch (error) {
        expect(error.message).to.include("Invalid response");
      }
    });
  });
});
