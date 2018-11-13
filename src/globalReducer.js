import { useEffect, useState } from "react";

import createEvent from "./createEvent";

/**
 * Creates a global reducer for use within any number of components. The function returned allows for a selector function to be passed to limit the re-renders of the consuming component.
 *
 * @param {Object} initialValue The initial value for the state.
 * @param {Object} reducer The dispatch functions.
 * @param {function(state: Object)} [onStateChange=undefined] onStateChange An optional callback for when the state changes. Can be used for persisting to local storage.
 * @return {function(selector: function = undefined, onComponentStateChanged: function = undefined): [Object, Object]}
 */
export default function globalReducer(
  initialValue,
  reducer,
  onStateChange = undefined
) {
  let state = initialValue;
  const onChange = createEvent();

  const dispatch = Object.keys(reducer).reduce(
    (p, c) => ({
      ...p,
      [c]: (...params) => {
        const newState = reducer[c](state, ...params);

        if (state !== newState) {
          state = newState;
          onChange(newState);

          if (onStateChange) {
            onStateChange(newState);
          }
        }
      }
    }),
    {}
  );

  return (selector = undefined, onComponentStateChanged = undefined) => {
    const [componentState, setComponentState] = useState(
      selector ? selector(state) : state
    );

    useEffect(
      () => {
        const onComponentChange = newState => {
          const newComponentState = selector ? selector(newState) : newState;

          if (newComponentState !== componentState) {
            setComponentState(newComponentState);

            if (onComponentStateChanged) {
              onComponentStateChanged(newComponentState);
            }
          }
        };

        onChange.add(onComponentChange);

        return () => {
          onChange.remove(onComponentChange);
        };
      },
      [componentState]
    );

    return [componentState, dispatch];
  };
}
