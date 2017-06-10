import createModule, { Action } from "../src"
import { AsyncTest, Expect, Test, TestCase, TestFixture } from "alsatian"
import { join } from "path"
import { checkDirectory } from "typings-tester"

@TestFixture()
export class Tests {

    @Test("typings")
    public typings() {
        Expect(() => {
            checkDirectory(join(__dirname, "typings"))
        }).not.toThrow()
    }

    @Test("action creators")
    public testActionCreators() {
        const calculator = createModule(1, {
            INC: (state: number, ignored: Action<undefined>) => state + 1,
            MULT: (state: number, action: Action<number>) => state * action.payload,
        })

        const incPayload = calculator.actions.INC(undefined)
        Expect(incPayload.type).toBe("INC")
        Expect(incPayload.payload).not.toBeDefined()

        const multPayload = calculator.actions.MULT(90)
        Expect(multPayload.type).toBe("MULT")
        Expect(multPayload.payload).toBe(90)
    }

    @Test("reducers")
    public testReducers() {
        const calculator = createModule(1, {
            INC: (state: number, ignored: Action<undefined>) => state + 1,
            MULT: (state: number, action: Action<number>) => state * action.payload,
        })

        const { reducer, actions } = calculator

        Expect(reducer(undefined, actions.INC(undefined))).toBe(2)

        Expect(reducer(
            reducer(undefined, actions.MULT(5),
            ), actions.MULT(30)),
        ).toBe(150)

        Expect(reducer(undefined, actions.MULT(10))).toBe(10)

        Expect(reducer(undefined, { type: "UNKNOWN", payload: null })).toBe(1)
    }
}
