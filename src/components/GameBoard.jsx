import React from 'react';
import { FlexBoxLayout } from './utils/layouts';
import {
    ReplayButton,
    UndoButton,
    RedoButton,
    ControlsWrapper
} from './utils/buttons';
import GameDisplay from './GameDisplay';

export const GameBoard = () => {
    return(
        <FlexBoxLayout bgColor="#765F8B" w="611px" h="587px" fd="column" minw="611px" minh="587px">
            <GameDisplay />
            <ControlsWrapper childrenArray={[<UndoButton/>,<ReplayButton />,<RedoButton />]} />
        </FlexBoxLayout>
    )
}