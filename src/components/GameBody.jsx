import React from 'react';
import { GridLayout, GridElement } from './utils';

export default function GameBody({boardState}) {
    const array = boardState.split(",");
    const firstChar = array[0].substr(1, array[0].length);
    const lastChar = array[array.length - 1].substr(0, array[array.length - 1].length - 1);
    array[0] = firstChar;
    array[array.length - 1] = lastChar;
    return (
        <GridLayout>
            {array.map((value, index) => <GridElement key={index}>{value !== "0" ? value : ""}</GridElement>)}
        </GridLayout>
    )
}