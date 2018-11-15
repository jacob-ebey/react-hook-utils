declare module "react-hook-utils" {
  /**
   * An event handler that allows for subscriptions to be added and removed.
   */
  export interface EventHandler {
    /**
     * Raise the event
     */
    (...params: any[]): void;
    /**
     * Add a callback.
     * @param callback The callback to add.
     */
    add(callback: (...params: any[]) => void);
    /**
     * Remove a callback.
     * @param callback The callback to remove.
     */
    remove(callback: (...params: any[]) => void);
  }

  /**
   * Creates a new event that allows subscribers to add and remove event handlers.
   * @return {function}
   * @property {function(handler: function)} add Add a new event handler.
   * @property {function(handler: function)} remove Remove an event handler.
   */
  export function createEvent(): EventHandler;

  export type ReducerFunc<TState> = (state: TState, ...rest: any[]) => TState;

  export interface Reducer<TState> {
    [key: string]: ReducerFunc<TState>;
  }

  export type ReducerInstance<TState, TReducer extends Reducer<TState>> = {
    [key in keyof TReducer]: (...params: any[]) => void
  };

  export type ReducerSelectorFunc<TState, TResult> = (state: TState) => TResult;

  export type UseReducerFunc<TState, TReducer extends Reducer<TState>> = <
    TResult = TState
  >(
    selector?: ReducerSelectorFunc<TState, TResult>,
    onComponentStateChanged?: (state: TResult) => void
  ) => [TResult, ReducerInstance<TState, TReducer>];

  /**
   * Creates a global reducer for use within any number of components. The function returned allows for a selector function to be passed to limit the re-renders of the consuming component.
   *
   * @param {Object} initialValue The initial value for the state.
   * @param {Object} reducer The dispatch functions.
   * @param {function(state: Object)} [onStateChange=undefined] onStateChange An optional callback for when the state changes. Can be used for persisting to local storage.
   * @return {function(selector: function = undefined, onComponentStateChanged: function = undefined): [Object, Object]}
   */
  export function globalReducer<TState, TReducer extends Reducer<TState>>(
    initialState: TState,
    reducer: TReducer,
    onStateChange?: (state: TState) => void
  ): UseReducerFunc<TState, TReducer>;

  /**
   * Use a promise and receive [data, error, loading] values. It is strongly recommended to use in conjunction with useMemo.
   *
   * @param {Promise} promise The promise to use.
   * @return {[Object, Error, boolean]}
   */
  export function usePromise<T = any>(
    promise: Promise<T>
  ): [T | null, Error | null, boolean];
}
