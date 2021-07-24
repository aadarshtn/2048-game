import React, { useState } from 'react';
import {
    FlexBoxLayout,
    StartButton,
    UndoButton,
    RedoButton,
    ControlsWrapper
} from '../utils/utils';
import Game from './Game';

export const GameBoard = () => {

    const [status, setStatus] = useState("IN_PROGRESS");

    const [undoButtonClicked, setUndoButtonClicked] = useState(false);
    const [redoButtonClicked, setRedoButtonClicked] = useState(false);
    const [undoButtonActive, setUndoButtonActive] = useState(false);
    const [redoButtonActive, setRedoButtonActive] = useState(false);

    const [replayButtonClicked, setReplayButtonClicked] = useState(false);
    const [replayButtonActive, setReplayButtonActive] = useState(false);

    const handleUndoClick = () => {
        setUndoButtonClicked(true);
    }

    const handleRedoClick = () => {
        setRedoButtonClicked(true);
    }

    const handleReplayClick = () => {
        if(replayButtonClicked) {
            setReplayButtonClicked(false);
        } else {
            setReplayButtonClicked(true);
        }
    }

    return(
        <>
            <FlexBoxLayout
                d={status === "IN_PROGRESS" ? "none" : ""} 
                p={"absolute"} 
                l={"43vw"} 
                t={"40vh"} 
                fs={"40px"} 
                fw={"800"} 
                zIndex={"1"}
                bgColor={"#FFF"}
            >
                {status !== "IN_PROGRESS" ? status : ""}
            </FlexBoxLayout>
            <FlexBoxLayout bgColor="#765F8B" w="611px" h="587px" fd="column" minw="611px" minh="587px">
                <Game
                    setStatus={setStatus}
                    undoClick={undoButtonClicked}
                    setUndoClick={setUndoButtonClicked}
                    setUndoButtonActive={setUndoButtonActive}
                    redoClick={redoButtonClicked}
                    setRedoClick={setRedoButtonClicked}
                    setRedoButtonActive={setRedoButtonActive}
                    replayClick={replayButtonClicked}
                    setReplayClick={setReplayButtonClicked}
                    setReplayButtonActive={setReplayButtonActive}
                />
                <ControlsWrapper
                    childrenArray={
                        [
                            <UndoButton key="undo" handleClick={handleUndoClick} active={undoButtonActive}/>,
                            <StartButton key="replay" handleClick={handleReplayClick} active={replayButtonActive}/>,
                            <RedoButton key="redo" handleClick={handleRedoClick} active={redoButtonActive}/>
                        ]
                    }
                />
            </FlexBoxLayout>
        </>
    )
}