"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createModule(initial, handler) {
    var reducer = function (state, action) {
        if (state === void 0) { state = initial; }
        return handler[action.type] ? handler[action.type](state, action) : state;
    };
    var actions = mapObject(function (v, key) {
        var actionCreator = function (payload) { return ({ type: key, payload: payload }); };
        return actionCreator;
    }, handler);
    return { reducer: reducer, actions: actions };
}
exports.default = createModule;
function mapObject(f, obj) {
    var result = {};
    var keys = Object.keys(obj);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        result[key] = f(obj[key], key);
    }
    return result;
}
