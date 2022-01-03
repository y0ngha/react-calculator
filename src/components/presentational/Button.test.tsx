import React from "react"
import {render} from "@testing-library/react";
import Button from "./Button";
import userEvent from "@testing-library/user-event";

describe("Button Components Rendering", () => {
    const onClickEvent = jest.fn()
    it("Props Rendering Check", () => {
        const wrapper = render(<Button displayText={"+"} onClickEvent={onClickEvent}/>)
        const button = wrapper.queryByText("+")
        expect(button).toBeTruthy()

        if(button) {
            userEvent.click(button)
            expect(onClickEvent).toBeCalled()
        }
    })
})
