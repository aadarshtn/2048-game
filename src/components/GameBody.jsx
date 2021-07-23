import React from 'react';
import { GridLayout, GridElement } from '../utils/utils';
import { TILE_COLORS } from '../utils/const';

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

    const findTileBgColor = (value) => {
        console.log(value, value in TILE_COLORS);
        if(value in TILE_COLORS) {
            return TILE_COLORS[value.toString()];
        } else {
            return "#7E7E7E";
        }
    }

    return (
        <GridLayout>
            {boardArray.map((value, index) => <GridElement 
                                                key={index}
                                                bgColor={findTileBgColor(value)}
                                                value={value}
                                            >
                                                {value !== "0" ? value : ""}
                                            </GridElement>)}
        </GridLayout>
    )
}