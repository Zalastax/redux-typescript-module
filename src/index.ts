
// ===============================================================================
// TYPES
// ===============================================================================

export interface Action<P> {
    readonly type: string
    payload: P
}

export type Reducer<STATE, ACTION> = (state: STATE, action: ACTION) => STATE
export type EmptyReducer<STATE> = (state: STATE, action: Action<undefined>) => STATE

export type ActionCreator<P> = (payload: P) => Action<P>

export type Handler<S, ACTION_TYPES> = {[K in Key<ACTION_TYPES>]: Reducer<S, Action<ACTION_TYPES[K]>>}

export interface Module<STATE, ACTION_TYPES> {
    reducer: (state: STATE | undefined, action: Action<any>) => STATE,
    actions: {[K in Key<ACTION_TYPES>]: ActionCreator<ACTION_TYPES[K]>},
}

export type Key<T> = keyof T

// ===============================================================================
// FUNCTION
// ===============================================================================

export default function createModule<STATE, ACTION_TYPES>(initial: STATE, handler: Handler<STATE, ACTION_TYPES>):
    Module<STATE, ACTION_TYPES> {

    const reducer = (state = initial, action: Action<any>) => {
        return handler[action.type] ? handler[action.type](state, action) : state
    }

    const actions = mapObject((v, key) => {
        const actionCreator = (payload: ACTION_TYPES[Key<ACTION_TYPES>]) => ({ type: key, payload })
        return actionCreator
    }, handler)

    return { reducer, actions }
}

// ===============================================================================
// HELPERS
// ===============================================================================

type Mapping<T, S> = {
    [P in Key<T>]: S
}

type Mapper<T, S> = (value: T[Key<T>], key: Key<T>) => S

function mapObject<T, S>(f: Mapper<T, S>, obj: T): Mapping<T, S> {
    const result: Mapping<T, S> = {} as any
    const keys = Object.keys(obj) as Key<T>[]
    for (const key of keys) {
        result[key] = f(obj[key], key)
    }
    return result
}
