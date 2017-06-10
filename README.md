Specify reducer and action creators in one swoop.
A single function that returns a reducer and action creators.
Based on [redux-create-module](Emilios1995/redux-create-module).

## Installation
`npm install --save redux-typescript-module` or `yarn add redux-typescript-module`

## API
There's just one function: `createModule(initalState, handler) -> {reducer, actions}`

#### Parameters

`initialState` is the initial state for the module.

`handler` is an object where the keys are action names
and the values are action handlers. For example:
```js
const counter = createModule(0, {
  increment: (state, action) => state + 1,
  decrement: (state, action) => state - 1
})
```
#### Returns
`createModule` returns an object with two things:

`actions` is an object with action creators. 
for example: `counter.actions.increment()` will return 
`{ type: 'increment', payload: {} }`

`reducer` is regular reducer that you can pass to the redux store or to `combineReducers`
