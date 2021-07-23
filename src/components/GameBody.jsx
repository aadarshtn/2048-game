import React from 'react';
import { GridLayout, GridElement } from '../utils/utils';

export default function GameBody({boardState}) {

    // available boardState = "[x,x,x,x,x,x,x,x,x,x,x,x]"
    // required Array Format = [x,x,x,x,x,x,x,x,x,x,x,x]
    // Creating an array out of string type board State
    const boardArray = boardState.split(",");

    // Removing the first and last square brackets
    const firstChar = boardArray[0].substr(1, boardArray[0].length);
    const lastChar = boardArray[boardArray.length - 1].substr(0, boardArray[boardArray.length - 1].length - 1);
    boardArray[0] = firstChar;
    boardArray[boardArray.length - 1] = lastChar;

    
    return (
        <GridLayout>
            {boardArray.map((value, index) => <GridElement key={index}>{value !== "0" ? value : ""}</GridElement>)}
        </GridLayout>
    )
}