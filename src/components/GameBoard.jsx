import React from 'react';
import {
    FlexBoxLayout,
    ReplayButton,
    UndoButton,
    RedoButton,
    ControlsWrapper
} from '../utils/utils';
import Game from './Game';

export const GameBoard = () => {
    return(
        <FlexBoxLayout bgColor="#765F8B" w="611px" h="587px" fd="column" minw="611px" minh="587px">
            <Game />
            <ControlsWrapper childrenArray={[<UndoButton key="undo"/>,<ReplayButton key="replay"/>,<RedoButton key="redo"/>]} />
        </FlexBoxLayout>
    )
}