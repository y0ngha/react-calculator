import Button from "../presentational/Button";
import {useState} from "react";

function CalculatorContainer() {
    const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const operations: string[] = ["＋", "―", "÷", "×"]
    const specials: string[] = ["CLEAR", "ENTER", "DEL"]

    const [showDisplayNumber, setShowDisplayNumber] = useState<number>(0)

    const [result, setResult] = useState<number>(0)
    const [currentInNumber, setCurrentInNumber] = useState<number>(0)
    const [lastKeyInOperation, setLastKeyInOperation] = useState<string>("")

    const fetchNumberButtonClick = (fetchNumber: number) => {
        const concatNumber = Number(currentInNumber.toString().concat(fetchNumber.toString()))
        setCurrentInNumber(concatNumber)

        setShowDisplayNumber(concatNumber)
    }

    const getResult = (fetchOperation: string): number => {
        switch (fetchOperation) {
            case "＋":
                return result + currentInNumber
            case "―":
                return result - currentInNumber
            case "÷":
                return result / currentInNumber
            case "×":
                return result * currentInNumber
            default:
                return 0
        }
    }

    const fetchResult = (fetchOperation: string) => {
        const newResult = getResult(fetchOperation)
        setCurrentInNumber(0)
        setResult(newResult)
        setShowDisplayNumber(newResult)

    }
    const fetchOperationButtonClick = (fetchOperation: string) => {
        if (result === 0 && currentInNumber !== 0) {
            //초기 상태에서 눌렀을 경우
            setResult(currentInNumber)
            setCurrentInNumber(0)

            setShowDisplayNumber(0)
        } else if (result !== 0 && currentInNumber !== 0) {
            fetchResult(fetchOperation)
        }

        setLastKeyInOperation(fetchOperation)
    }

    const fetchSpecialButtonClick = (fetchSpecial: string) => {
        switch (fetchSpecial) {
            case "CLEAR":
                setCurrentInNumber(0)
                setResult(0)
                setShowDisplayNumber(0)
                break;
            case "ENTER":
                if (result !== 0 && currentInNumber !== 0) {
                    fetchResult(lastKeyInOperation)
                }

                break;
            case "DEL":
                if(currentInNumber !== 0) {
                    const temp = showDisplayNumber.toString().slice(0, -1)
                    const newShowDisplayNumber = Number(temp === "" ? 0 : Number(temp));
                    setCurrentInNumber(newShowDisplayNumber)
                    setShowDisplayNumber(newShowDisplayNumber)
                }
                break;
        }
    }

    return (
        <div className="container">
            <div className="result-wrapper">
                <input type="text" role="resultText" value={showDisplayNumber} onChange={() => {
                }} readOnly/>
            </div>
            <div className="number-wrapper">
                {
                    numbers.map((number: number, index: number) => {
                        return (
                            <Button key={`${number}-${index}`} displayText={number.toString()} onClickEvent={() => {
                                fetchNumberButtonClick(number);
                            }}/>
                        )
                    })
                }
            </div>
            <div className="operation-wrapper">
                {
                    operations.map((operation: string, index: number) => {
                        return (
                            <Button key={`${operation}-${index}`} displayText={operation} onClickEvent={() => {
                                fetchOperationButtonClick(operation)
                            }}/>
                        )
                    })
                }
            </div>
            <div className="special-wrapper">
                {
                    specials.map((special: string, index: number) => {
                        return (
                            <Button key={`${special}-${index}`} displayText={special} onClickEvent={() => {
                                fetchSpecialButtonClick(special)
                            }}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CalculatorContainer
