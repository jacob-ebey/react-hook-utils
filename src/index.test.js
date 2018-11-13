import { createEvent, globalReducer, usePromise } from "./";

describe("module", () => {
  it("should export createEvent", () => expect(createEvent).toBeDefined());

  it("should export globalReducer", () => expect(globalReducer).toBeDefined());

  it("should export usePromise", () => expect(usePromise).toBeDefined());
});
