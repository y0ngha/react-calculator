import React from "react"

export interface IButtonProps {
    displayText: string,
    onClickEvent: () => void,
    className?: string,
}

function Button({ displayText, onClickEvent, className }: IButtonProps ) {
    return (
        <button className={className ?? "button-component"} onClick={onClickEvent}>{displayText}</button>
    )
}

export default Button
