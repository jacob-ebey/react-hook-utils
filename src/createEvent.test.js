import createEvent from "./createEvent";

describe("createEvent", () => {
  it("is raisable without subscribers", () => {
    const event = createEvent();

    event();
  });

  it("raises subscriber only once", () => {
    const event = createEvent();
    const subscriber = jest.fn();
    event.add(subscriber);

    event();
    expect(subscriber).toHaveBeenCalledTimes(1);
  });

  it("raises multiple subscribers only once", () => {
    const event = createEvent();
    const subscriber = jest.fn();
    event.add(subscriber);
    const subscriber2 = jest.fn();
    event.add(subscriber2);

    event();
    expect(subscriber).toHaveBeenCalledTimes(1);
    expect(subscriber2).toHaveBeenCalledTimes(1);
  });

  it("allows removing a subscriber", () => {
    const event = createEvent();
    const subscriber = jest.fn();
    event.add(subscriber);

    event();
    event.remove(subscriber);
    event();

    expect(subscriber).toHaveBeenCalledTimes(1);
  });
})
