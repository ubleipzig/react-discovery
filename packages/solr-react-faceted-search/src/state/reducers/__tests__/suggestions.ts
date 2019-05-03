import expect from "expect";
import {suggestionsReducer} from "../suggestions";

describe("suggestionsReducer", () => {
  it("should SET_SUGGESTIONS", () => {
    expect(suggestionsReducer({
      init: "bar",
      suggestionsPending: true
    }, {
      type: "SET_SUGGESTIONS",
      data: {
        response: {
          docs: ["123"]
        }
      }
    })).toEqual({
      init: "bar",
      docs: ["123"],
      suggestionsPending: false
    });
  });

  it("should SET_SUGGESTIONS_PENDING", () => {
    expect(suggestionsReducer({
      init: "bar",
      suggestionsPending: false
    }, {
      type: "SET_SUGGESTIONS_PENDING"
    })).toEqual({
      init: "bar",
      suggestionsPending: true
    });
  });
});
