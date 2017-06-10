export interface Action<P> {
    readonly type: string;
    payload: P;
}
export declare type Reducer<STATE, ACTION> = (state: STATE, action: ACTION) => STATE;
export declare type EmptyReducer<STATE> = (state: STATE, action: Action<undefined>) => STATE;
export declare type ActionCreator<P> = (payload: P) => Action<P>;
export declare type Handler<S, ACTION_TYPES> = {
    [K in Key<ACTION_TYPES>]: Reducer<S, Action<ACTION_TYPES[K]>>;
};
export interface Module<STATE, ACTION_TYPES> {
    reducer: (state: STATE | undefined, action: Action<any>) => STATE;
    actions: {
        [K in Key<ACTION_TYPES>]: ActionCreator<ACTION_TYPES[K]>;
    };
}
export declare type Key<T> = keyof T;
export default function createModule<STATE, ACTION_TYPES>(initial: STATE, handler: Handler<STATE, ACTION_TYPES>): Module<STATE, ACTION_TYPES>;
