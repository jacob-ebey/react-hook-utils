import React from "react";
import { fireEvent, render } from "react-testing-library";

import globalReducer from "./globalReducer";

const createReducer = (onStateChange = undefined) =>
  globalReducer(
    { count: 0 },
    {
      increment: state => ({
        ...state,
        count: state.count + 1
      }),
      noop: state => state
    },
    onStateChange
  );

function TestComponent({ useTestReducer, selector = undefined, onComponentStateChange = undefined }) {
  const [state, dispatch] = useTestReducer(selector, onComponentStateChange);

  return <button onClick={dispatch.increment}>{state.count}</button>;
}

function NoopComponent({
  useTestReducer,
  selector = undefined,
  onComponentStateChange = undefined
}) {
  const [state, dispatch] = useTestReducer(selector, onComponentStateChange);

  return <button onClick={dispatch.noop}>{state.count}</button>;
}

describe("globalReducer", () => {
  it("selector is used", () => {
    const useTestReducer = createReducer();
    const selector = jest.fn(state => state);

    render(
      <TestComponent useTestReducer={useTestReducer} selector={selector} />
    );
    expect(selector).toHaveBeenCalledTimes(1);
  });

  it("should pass initial state to component", () => {
    const {
      container: { firstChild }
    } = render(<TestComponent useTestReducer={createReducer()} />);

    expect(firstChild.textContent).toBe("0");
  });

  it("should dispatch action", () => {
    const component = <TestComponent useTestReducer={createReducer()} />;
    const { container, rerender } = render(component);

    expect(container.firstChild.textContent).toBe("0");

    fireEvent.click(container.firstChild);
    rerender(component);

    expect(container.firstChild.textContent).toBe("1");
  });

  it("should dispatch action to multiple components", () => {
    const useTestReducer = createReducer();
    const component = (
      <div>
        <TestComponent useTestReducer={useTestReducer} />
        <TestComponent useTestReducer={useTestReducer} />
      </div>
    );
    const { container, rerender } = render(component);

    expect(container.firstChild.childNodes[0].textContent).toBe("0");
    expect(container.firstChild.childNodes[1].textContent).toBe("0");

    fireEvent.click(container.firstChild.firstChild);
    rerender(component);

    expect(container.firstChild.childNodes[0].textContent).toBe("1");
    expect(container.firstChild.childNodes[1].textContent).toBe("1");
  });

  it("should dispatch state changes", () => {
    const onStateChange = jest.fn();
    const onComponentStateChange = jest.fn();
    const component = (
      <TestComponent
        useTestReducer={createReducer(onStateChange)}
        onComponentStateChange={onComponentStateChange}
      />
    );
    const { container, rerender } = render(component);

    fireEvent.click(container.firstChild);
    rerender(component);

    expect(onStateChange).toHaveBeenCalledTimes(1);
    expect(onComponentStateChange).toHaveBeenCalledTimes(1);
  });

  it("should not dispatch noops", () => {
    const onStateChange = jest.fn();
    const onComponentStateChange = jest.fn();
    const component = (
      <NoopComponent
        useTestReducer={createReducer(onStateChange)}
        onComponentStateChange={onComponentStateChange}
      />
    );
    const { container, rerender } = render(component);

    fireEvent.click(container.firstChild);
    rerender(component);

    expect(onStateChange).toHaveBeenCalledTimes(0);
    expect(onComponentStateChange).toHaveBeenCalledTimes(0);
  });
});
