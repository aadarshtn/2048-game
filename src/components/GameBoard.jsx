import React, { useState } from 'react';
import {
    FlexBoxLayout,
    ReplayButton,
    UndoButton,
    RedoButton,
    ControlsWrapper
} from '../utils/utils';
import Game from './Game';

export const GameBoard = () => {

    const [undoButtonClicked, setUndoButtonClicked] = useState(false);
    const [redoButtonClicked, setRedoButtonClicked] = useState(false);
    const [undoButtonActive, setUndoButtonActive] = useState(false);
    const [redoButtonActive, setRedoButtonActive] = useState(false);

    const handleUndoClick = () => {
        setUndoButtonClicked(true);
    }

    const handleRedoClick = () => {
        setRedoButtonClicked(true);
    }

    return(
        <FlexBoxLayout bgColor="#765F8B" w="611px" h="587px" fd="column" minw="611px" minh="587px">
            <Game
                undoClick={undoButtonClicked}
                setUndoClick={setUndoButtonClicked}
                setUndoButtonActive={setUndoButtonActive}
                redoClick={redoButtonClicked}
                setRedoClick={setRedoButtonClicked}
                setRedoButtonActive={setRedoButtonActive}
            />
            <ControlsWrapper
                childrenArray={
                    [
                        <UndoButton key="undo" handleClick={handleUndoClick} active={undoButtonActive}/>,
                        <ReplayButton key="replay"/>,
                        <RedoButton key="redo" handleClick={handleRedoClick} active={redoButtonActive}/>
                    ]
                }
            />
        </FlexBoxLayout>
    )
}