# react-hook-utils

>

[![NPM](https://img.shields.io/npm/v/react-hook-utils.svg)](https://www.npmjs.com/package/react-hook-utils)

## Install

```bash
npm install --save react-hook-utils
```

## Usage

### Global Reducer

Create a global reducer for re-use in components:

```jsx
// useCount.js
import { globalReducer } from "react-hook-utils";

export default globalReducer(
  { count: 0 },
  {
    decrement: state => ({
      ...state,
      count: state.count - 1
    }),
    increment: state => ({
      ...state,
      count: state.count + 1
    })
    set: (state, count) => ({
      ...state,
      count
    }),
  }
);
```

Use the reducer within a component:

```jsx
import React, { useCallback } from "react";

import useCount from "./useCount";

export function CountControls() {
  // Select only the count property from the state
  const [count, { decrement, increment, set }] = useCount(s => s.count);

  // Create a callback to reset the count
  const reset = useCallback(() => set(0), [set]);

  return (
    <div>
      <button onClick={decrement}>-</button>
      {count}
      <button onClick={increment}>+</button>
      <br />
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### Use Promise

In the following example, API.getUserAsync returns a Promise. We combine usePromise with useMemo as follows to only make an API call when the userId changes:

```jsx
import React, { useMemo } from "react";
import { usePromise } from "react-hook-utils";

import API from "./api";

export function UserView({ userId }) {
  const [user, error, loading] = usePromise(
    useMemo(() => API.getUserAsync(userId), [userId])
  );

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Something went wrong :(</div>;
  }

  return <div>Hello, {user.name}</div>;
}
```

## License

MIT © [](https://github.com/)
