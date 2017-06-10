import createModule, { Action } from "redux-typescript-module"

const calculator = createModule(1, {
    INC: (state: number, ignored: Action<undefined>) => state + 1,
    MULT: (state: number, action: Action<number>) => state * action.payload,
})

calculator.actions.INC(undefined)
calculator.actions.MULT(5)
calculator.reducer(10, calculator.actions.MULT(90))
// typings:expect-error
calculator.actions.INC({})
// typings:expect-error
calculator.actions.MULT("")

interface Foo {
    bar: string
    baz: number
}

const initialFoo: Foo = {
    bar: "bar",
    baz: 10,
}

const foo = createModule(initialFoo, {
    FOOIFY: (state: Foo, action: Action<Foo>) => action.payload,
    NOTBAR: (state: Foo, action: Action<string>) => Object.assign({}, state, { bar: "not-bar-" + action.payload }),
})

const foo2 = createModule<Foo, { FOOIFY: Foo; NOTBAR: string; }>(initialFoo, {
    FOOIFY: (state: Foo, action: Action<Foo>) => action.payload,
    NOTBAR: (state: Foo, action: Action<string>) => Object.assign({}, state, { bar: "not-bar-" + action.payload }),
})

const secondFoo = foo.reducer(initialFoo, foo.actions.NOTBAR("foo"))
foo.reducer(initialFoo, foo.actions.FOOIFY(secondFoo))

// typings:expect-error
createModule(initialFoo, { FOOIFY: (state: Foo, action: Action<number>) => action.payload })
// typings:expect-error
createModule(0, { FOOIFY: (state: Foo, action: Action<number>) => action.payload })
// typings:expect-error
createModule(0, { FOOIFY: (state: Foo, action: Action<Foo>) => action.payload })
// typings:expect-error
createModule(initialFoo, { FOOIFY: (state: number, action: Action<Foo>) => action.payload })
// typings:expect-error
createModule(initialFoo, { FOOIFY: (state: number, action: Action<number>) => action.payload })
