import { add, minus, divide, multiplication} from "./CalculatorLogic";

describe("Calculator Logic Test", () => {
    it("calculated 'add' Test", () => {
        expect(add(1, 1)).toBe(2)
    })

    it("calculated 'minus' Test", () => {
        expect(minus(1, 1)).toBe(0)
    })

    it("calculated 'divide' Test", () => {
        expect(divide(4, 2)).toBe(2)
    })

    it("calculated 'multiplication' Test", () => {
        expect(multiplication(2, 2)).toBe(4)
    })
})
