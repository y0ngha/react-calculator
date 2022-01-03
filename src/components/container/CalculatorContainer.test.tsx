import React from "react"
import {render} from "@testing-library/react";
import CalculatorContainer from "./CalculatorContainer";
import userEvent from "@testing-library/user-event";

describe("CalculatorContainer Component Rendering", () => {
    const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const operations: string[] = ["＋", "―", "÷", "×"]
    const specials: string[] = ["CLEAR", "ENTER", "DEL"]
    describe("ElementNodes rendering Check", () => {
        it("number Button Rendering Check", () => {
            const wrapper = render(<CalculatorContainer/>)

            for (const number of numbers) {
                const button = wrapper.queryByText(number, {selector: "button"})
                expect(button).toBeTruthy()
            }
        })

        it("operation Button Rendering Check", () => {
            const wrapper = render(<CalculatorContainer/>)
            for (const operation of operations) {
                expect(wrapper.queryByText(operation, {selector: "button"})).toBeTruthy()
            }
        })

        it("special Button Rendering Check", () => {
            const wrapper = render(<CalculatorContainer/>)
            for (const special of specials) {
                expect(wrapper.queryByText(special, {selector: "button"})).toBeTruthy()
            }
        })

        it("result text Rendering Check", () => {
            const wrapper = render(<CalculatorContainer/>)
            const input = wrapper.getByRole("resultText")
            expect(input).toHaveValue("0")
        })
    })

    describe("Button Action Test", () => {
        it("number Button Action Check", () => {
            let currentInNumber = ""
            const wrapper = render(<CalculatorContainer/>)
            const input = wrapper.getByRole("resultText")

            for (const number of numbers) {
                const button = wrapper.getByText(number, {selector: "button"})
                userEvent.click(button)
                expect(input).toHaveValue(currentInNumber.concat(number.toString()))
                currentInNumber += number.toString()
            }
        })

        it("operation Button Action Check", () => {
            const wrapper = render(<CalculatorContainer/>)
            const oneButton = wrapper.getByText(1, {selector: "button"})
            const twoButton = wrapper.getByText(2, {selector: "button"})
            const plusButton = wrapper.getByText("＋", {selector: "button"}) // PLUS Button
            const input = wrapper.getByRole("resultText")

            expect(input).toHaveValue("0")

            userEvent.click(oneButton)
            expect(input).toHaveValue("1")

            userEvent.click(plusButton)


            expect(input).toHaveValue("0")

            userEvent.click(oneButton)
            userEvent.click(plusButton)

            expect(input).toHaveValue("2")

            userEvent.click(twoButton)
            userEvent.click(plusButton)

            expect(input).toHaveValue("4")
        })

        describe("special Button Action Check", () => {

            it("CLEAR Button Action Check", () => {
                const wrapper = render(<CalculatorContainer/>)
                const oneButton = wrapper.getByText(1, {selector: "button"})
                const clearButton = wrapper.getByText("CLEAR", {selector: "button"})
                const input = wrapper.getByRole("resultText")

                expect(input).toHaveValue("0")

                userEvent.click(oneButton)

                expect(input).toHaveValue("1")

                userEvent.click(clearButton)

                expect(input).toHaveValue("0")
            })

            it("DEL Button Action Check", () => {
                const wrapper = render(<CalculatorContainer/>)
                const oneButton = wrapper.getByText(1, {selector: "button"})
                const delButton = wrapper.getByText("DEL", {selector: "button"})
                const input = wrapper.getByRole("resultText")

                expect(input).toHaveValue("0")

                userEvent.click(oneButton)
                userEvent.click(oneButton)

                expect(input).toHaveValue("11")

                userEvent.click(delButton)
                expect(input).toHaveValue("1")

                userEvent.click(delButton)
                expect(input).toHaveValue("0")
            })

            it("ENTER Button Action Check", () => {
                const wrapper = render(<CalculatorContainer/>)
                const oneButton = wrapper.getByText(1, {selector: "button"})
                const enterButton = wrapper.getByText("ENTER", {selector: "button"})
                const plusButton = wrapper.getByText("＋", {selector: "button"})
                const input = wrapper.getByRole("resultText")

                expect(input).toHaveValue("0")

                userEvent.click(oneButton)
                userEvent.click(plusButton)
                userEvent.click(oneButton)
                userEvent.click(enterButton)

                expect(input).toHaveValue("2")

            })
        })
    })
})
