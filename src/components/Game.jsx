import React, { useEffect, useState } from 'react';
import GameBody from './GameBody';
import GameHeader from './GameHeader';
import { ResponsiveDisplayDiv } from "../utils/utils";

//  ----------------------------------------------------------  //


// Global Variable to store score and update it on each move || undo || redo - Creted outside the function due to a Chromium Bug
// https://stackoverflow.com/questions/40732294/js-global-let-variable-not-updating-in-function
// TODO - Check for official fixes
let updatedCurrScore = 0;
let updatedBestScore = 0;

// ------------- Exported Component --------------- //
function Game({undoClick, setUndoClick, setUndoButtonActive, redoClick, setRedoClick, setRedoButtonActive}) {

    // States
    const [board, setBoard] = useState(new Array(16).fill(0));
    const [boardState, setBoardState] = useState(JSON.stringify(board));
    const [currScore, setCurrScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);

    // Variables to store Undo Stack & Redo Stack
    // We need to kkep track of - BOARD && CURR_SCORE && BEST_SCORE
    const [boardUndoStack, setBoardUndoStack] = useState([]);
    const [currScoreUndoStack, setCurrScoreUndoStack] = useState([]);
    const [bestScoreUndoStack, setBestScoreUndoStack] = useState([]);

    const [boardRedoStack, setBoardRedoStack] = useState([]);
    const [currScoreRedoStack, setCurrScoreRedoStack] = useState([]);
    const [bestScoreRedoStack, setBestScoreRedoStack] = useState([]);

    

    // Function to : Generate Number Two At One random positions
    const generateSingleTwo = () => {
        let randomIndex = Math.floor(Math.random() * (board.length));
        if(checkLost()) return;
        if(board[randomIndex] === 0) {
            board[randomIndex] = 2;
            setBoardState(JSON.stringify(board));
            // An Additional checkLost() needs to run here to handle an edge case
            // If a 2 is added to the only empty cell and further there are no moves then also we should say Player Lost
            if(checkLost())  return;
        } else generateSingleTwo();
    };

    // Function to : Generate Number Two At Two random positions
    const generateDoubleTwo = () => {

        let zeroesCount = 0;
        for(let i = 0; i < board.length; i++) {
            if(board[i] === 0) {
                zeroesCount += 1;
            }
        }

        if(zeroesCount >= 2) {
            let firstRandomIndex = Math.floor(Math.random() * (board.length - 1));
            let secondRandomIndex = -1;
            while(secondRandomIndex === -1 || secondRandomIndex === firstRandomIndex) {
                secondRandomIndex = Math.floor(Math.random() * (board.length - 1));
            }
            if(board[firstRandomIndex] === 0 && board[secondRandomIndex] === 0) {
                board[firstRandomIndex] = 2;
                board[secondRandomIndex] = 2;
                setBoardState(JSON.stringify(board));
            } else generateDoubleTwo();
        }        
    }

    // Initialise board with two two's --- Note: This code runs only once in a game life cycle
    useEffect(() => {
        // Retrieve the state before reload from localStorage --- String Format
        const localBoard = window.localStorage.getItem('board');
        updatedCurrScore = parseInt(window.localStorage.getItem('2048currScore')) ? parseInt(window.localStorage.getItem('2048currScore')) : 0;
        updatedBestScore = parseInt(window.localStorage.getItem('2048bestScore')) ? parseInt(window.localStorage.getItem('2048bestScore')) : 0;
        
        const localBoardUndoStack = window.localStorage.getItem('boardUndoStack');
        const localCurrScoreUndoStack = window.localStorage.getItem('currScoreUndoStack');
        const localBestScoreUndoStack = window.localStorage.getItem('bestScoreUndoStack');

        const localBoardRedoStack = window.localStorage.getItem('boardRedoStack');
        const localCurrScoreRedoStack = window.localStorage.getItem('currScoreRedoStack');
        const localBestScoreRedoStack = window.localStorage.getItem('bestScoreRedoStack');

        // Cleaning up localUndoStack Values ===> to proper Format
        const boardUndoStackArray = localBoardUndoStack ? localBoardUndoStack.split(",") : [];
        const currScoreUndoStackArray = localCurrScoreUndoStack ? localCurrScoreUndoStack.split(",") : [];
        const bestScoreUndoStackArray = localBestScoreUndoStack ? localBestScoreUndoStack.split(",") : [];
        for(let i = 0; i < boardUndoStackArray.length; i++) {
            boardUndoStackArray[i] = parseInt(boardUndoStackArray[i]);
        }
        for(let i = 0; i < (boardUndoStackArray.length/16); i++) {
            boardUndoStack.push(boardUndoStackArray.slice((i*16), ((i+1)*16)));
            currScoreUndoStack.push(parseInt(currScoreUndoStackArray[i]));
            bestScoreUndoStack.push(parseInt(bestScoreUndoStackArray[i]));
        }
        if(boardUndoStack.length) {
            setUndoButtonActive(true);
        }

        // Cleaning up localRedoStack Values ===> to proper format
        const boardRedoStackArray = localBoardRedoStack ? localBoardRedoStack.split(",") : [];
        const currScoreRedoStackArray = localCurrScoreRedoStack ? localCurrScoreRedoStack.split(",") : [];
        const bestScoreRedoStackArray = localBestScoreRedoStack ? localBestScoreRedoStack.split(",") : [];
        for(let i = 0; i < boardRedoStackArray.length; i++) {
            boardRedoStackArray[i] = parseInt(boardRedoStackArray[i]);
        }
        for(let i = 0; i < (boardRedoStackArray.length/16); i++) {
            boardRedoStack.push(boardRedoStackArray.slice((i*16), ((i+1)*16)));
            currScoreRedoStack.push(parseInt(currScoreRedoStackArray[i]));
            bestScoreRedoStack.push(parseInt(bestScoreRedoStackArray[i]));
        }
        if(boardRedoStack.length) {
            setRedoButtonActive(true);
        }

        // Convert localBoard String Back To Array Format
        const boardArray = localBoard ? localBoard.split(",") : [];
        for(let i = 0; i < boardArray.length; i++){
            board[i] = parseInt(boardArray[i]);
        }

        // Setting Local Score Values
        setCurrScore(updatedCurrScore);
        setBestScore(updatedBestScore);

        setBoardState(JSON.stringify(board));

        if(!localBoard) {
            generateDoubleTwo();
        }
        
        window.localStorage.setItem('board', board);
        window.localStorage.setItem('boardUndoStack', boardUndoStack);
        document.addEventListener('keyup', handleMove);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() => {
        if(undoClick) {
            // Populate the redo stacks
            boardRedoStack.push([...board]);
            currScoreRedoStack.push(updatedCurrScore);
            bestScoreRedoStack.push(updatedBestScore);
            
            const lastBoardState = boardUndoStack.pop();
            const lastCurrScore = currScoreUndoStack.pop();
            const lastBestScore = bestScoreUndoStack.pop();
            updatedCurrScore = lastCurrScore;
            updatedBestScore = lastBestScore;
            for(let i = 0; i < lastBoardState.length; i++) {
                board[i] = lastBoardState[i];
            }
            setBoardState(JSON.stringify(board));
            setCurrScore(lastCurrScore);
            setBestScore(lastBestScore);
            window.localStorage.setItem('board', board);
            window.localStorage.setItem('boardUndoStack', boardUndoStack);
            window.localStorage.setItem('boardRedoStack', boardRedoStack);
            window.localStorage.setItem('2048currScore', lastCurrScore);
            window.localStorage.setItem('2048bestScore', lastBestScore);
            window.localStorage.setItem('currScoreUndoStack', currScoreUndoStack);
            window.localStorage.setItem('bestScoreUndoStack', bestScoreUndoStack);
            window.localStorage.setItem('currScoreRedoStack', currScoreRedoStack);
            window.localStorage.setItem('bestScoreRedoStack', bestScoreRedoStack);
            setUndoClick(false);
            if(!boardUndoStack.length) {
                setUndoButtonActive(false);
            }
            if(boardRedoStack.length) {
                setRedoButtonActive(true);
            }
        }
    },[undoClick]);

    useEffect(() => {
        if(redoClick) {
            // Populate the redo stacks
            boardUndoStack.push([...board]);
            currScoreUndoStack.push(updatedCurrScore);
            bestScoreUndoStack.push(updatedBestScore);
            
            const lastBoardState = boardRedoStack.pop();
            const lastCurrScore = currScoreRedoStack.pop();
            const lastBestScore = bestScoreRedoStack.pop();
            updatedCurrScore = lastCurrScore;
            updatedBestScore = lastBestScore;
            for(let i = 0; i < lastBoardState.length; i++) {
                board[i] = lastBoardState[i];
            }
            setBoardState(JSON.stringify(board));
            setCurrScore(lastCurrScore);
            setBestScore(lastBestScore);
            window.localStorage.setItem('board', board);
            window.localStorage.setItem('boardUndoStack', boardUndoStack);
            window.localStorage.setItem('2048currScore', lastCurrScore);
            window.localStorage.setItem('2048bestScore', lastBestScore);
            window.localStorage.setItem('currScoreUndoStack', currScoreUndoStack);
            window.localStorage.setItem('bestScoreUndoStack', bestScoreUndoStack);
            window.localStorage.setItem('currScoreRedoStack', currScoreRedoStack);
            window.localStorage.setItem('bestScoreRedoStack', bestScoreRedoStack);
            setRedoClick(false);
            if(!boardRedoStack.length) {
                setRedoButtonActive(false);
            }
            if(boardUndoStack.length) {
                setUndoButtonActive(true);
            }
        }
    },[redoClick]);

    // ------------- Left & Right Arrow key functions --------------- //
    const rightMove = (board) => {
        for(let i = 0; i < 16; i++) {
            if(i % 4 === 0) {
                // Take out each row
                let row = board.slice(i, i+4);
                // Filter the nodes having a number into a subArray
                let filteredRow = row.filter(num => num);
                // Find Missing Length
                let missing = 4 - filteredRow.length;
                // Create Empty Array With Zeroes
                let zeroes = new Array(missing).fill(0);
                // Concat FilteredRow and New Zeroes array in correct oreder
                let newRow = zeroes.concat(filteredRow);
                // Put the values back in original board
                for(let j = i; j < i + 4; j++) {
                    board[j] = newRow[j - i];
                }
            }
        }
        // Stringify to absorb the state change
        setBoardState(JSON.stringify(board));
    }

    const leftMove = (board) => {
        for(let i = 0; i < 16; i++) {
            if(i % 4 === 0) {
                let row = board.slice(i, i+4);
                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length;
                let zeroes = new Array(missing).fill(0);
                let newRow = filteredRow.concat(zeroes);
                for(let j = i; j < i + 4; j++) {
                    board[j] = newRow[j - i];
                }
            }
        }
        setBoardState(JSON.stringify(board));
    }

    // -------- Row Combine Function ---------- //
    const combineRow = (board) => {
        for(let i = 0; i < 15; i++) {
            if((i % 4 !== 3) && board[i] === board[i + 1]) {
                let combinedTotal = board[i] + board[i + 1];
                board[i] = combinedTotal;
                board[i + 1] = 0;
                updatedCurrScore += combinedTotal;
                setCurrScore(score => (score + combinedTotal));
                window.localStorage.setItem('2048currScore', updatedCurrScore);
                if(updatedCurrScore > updatedBestScore) {
                    updatedBestScore = updatedCurrScore;
                    setBestScore(updatedBestScore);
                    window.localStorage.setItem('2048bestScore', updatedBestScore)
                }
            }
        }
        checkWin();
    }


    // ------------- Up & Down Arrow key functions --------------- //
    const upMove = (board) => {
        for(let i = 0; i < 4; i++) {
            // Take out each column
            let col = [board[i], board[i + 4], board[i + 8], board[i + 12]];
            // Filter the nodes having a number into a sub Column Array
            let filteredCol = col.filter(num => num);
            // Find Missing Length
            let missing = 4 - filteredCol.length;
            // Create Empty Array With Zeroes
            let zeroes = new Array(missing).fill(0);
            // Concat FilteredRow and New Zeroes array in correct oreder
            let newCol = filteredCol.concat(zeroes);
            // Put the values back in original board
            for(let j = i; j < 16; j+=4) {
                board[j] = newCol[Math.floor(j/4)];
            }
        }
        // Stringify to absorb the state change
        setBoardState(JSON.stringify(board));
    }

    const downMove = (board) => {
        for(let i = 0; i < 4; i++) {
            let col = [board[i], board[i + 4], board[i + 8], board[i + 12]];
            let filteredCol = col.filter(num => num);
            let missing = 4 - filteredCol.length;
            let zeroes = new Array(missing).fill(0);
            let newCol = zeroes.concat(filteredCol);
            for(let j = i; j < 16; j+=4) {
                board[j] = newCol[Math.floor(j/4)];
            }
        }
        setBoardState(JSON.stringify(board));
    }

    // -------- Column Combine Function ---------- //
    const combineColumn = (board) => {
        for(let i = 0; i < 12; i++) {
            if(board[i] === board[i + 4]) {
                let combinedTotal = board[i] + board[i + 4];
                board[i] = combinedTotal;
                board[i + 4] = 0;
                updatedCurrScore += combinedTotal;
                setCurrScore(score => (score + combinedTotal));
                window.localStorage.setItem('2048currScore', updatedCurrScore);
                if(updatedCurrScore > updatedBestScore) {
                    updatedBestScore = updatedCurrScore;
                    setBestScore(updatedBestScore);
                    window.localStorage.setItem('2048bestScore', updatedBestScore);
                }
            }
        }
        checkWin();
    }

    // --------- Check Win & Check Lose Functions --------- //
    const checkWin = () => {
        for(let i = 0; i < 16; i++) {
            if(board[i] === 2048) {
                document.removeEventListener('keyup', handleMove);
                return true;
            }
        }
        return false;
    }

    const checkLost = () => {
        
        let boardSimulationCopy = [...board];
        let zeroes = 0;
        for(let i = 0; i < 16; i++) {
            if(boardSimulationCopy[i] === 0) {
                zeroes += 1;
            }
        }
        if(zeroes === 0) {
            // At this point we dont have any empty cells
            // Now we need to simulate Left,Rigth,Up & Down and see if board changes for each of them
            let prevBoard = JSON.stringify(boardSimulationCopy);
            let currBoard;
            // Simulating Right
            rightMove(boardSimulationCopy);
            combineRow(boardSimulationCopy);
            rightMove(boardSimulationCopy);
            currBoard = JSON.stringify(boardSimulationCopy);

            if(prevBoard === currBoard) {
                boardSimulationCopy = [...board];
                // Simulating Left
                leftMove(boardSimulationCopy);
                combineRow(boardSimulationCopy);
                leftMove(boardSimulationCopy);
                currBoard = JSON.stringify(boardSimulationCopy);

                if(prevBoard === currBoard) {
                    boardSimulationCopy = [...board];
                    // Simulating Up
                    upMove(boardSimulationCopy);
                    combineColumn(boardSimulationCopy);
                    upMove(boardSimulationCopy);
                    currBoard = JSON.stringify(boardSimulationCopy);

                    if(prevBoard === currBoard){
                        boardSimulationCopy = [...board];
                        // Simulating Down
                        downMove(boardSimulationCopy);
                        combineColumn(boardSimulationCopy);
                        downMove(boardSimulationCopy);
                        currBoard = JSON.stringify(boardSimulationCopy);

                        if(prevBoard === currBoard) {
                            document.removeEventListener('keyup', handleMove);
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    const handleMove = (e) => {
        const prevBoard = JSON.stringify(board);
        let currBoard;
        switch(e.key) {
            case "ArrowRight":
                boardUndoStack.push([...board]);
                currScoreUndoStack.push(updatedCurrScore);
                bestScoreUndoStack.push(updatedBestScore);
                rightMove(board);
                combineRow(board);
                rightMove(board);
                currBoard = JSON.stringify(board);
                if(prevBoard !== currBoard) generateSingleTwo();
                window.localStorage.setItem('board', board);
                setUndoButtonActive(true);
                window.localStorage.setItem('boardUndoStack', boardUndoStack);
                window.localStorage.setItem('currScoreUndoStack', currScoreUndoStack);
                window.localStorage.setItem('bestScoreUndoStack', bestScoreUndoStack);
                break;
            case "ArrowLeft":
                boardUndoStack.push([...board]);
                currScoreUndoStack.push(updatedCurrScore);
                bestScoreUndoStack.push(updatedBestScore);
                leftMove(board);
                combineRow(board);
                leftMove(board);
                currBoard = JSON.stringify(board);
                if(prevBoard !== currBoard) generateSingleTwo();
                window.localStorage.setItem('board', board);
                setUndoButtonActive(true);
                window.localStorage.setItem('boardUndoStack', boardUndoStack);
                window.localStorage.setItem('currScoreUndoStack', currScoreUndoStack);
                window.localStorage.setItem('bestScoreUndoStack', bestScoreUndoStack);
                break;
            case "ArrowUp":
                boardUndoStack.push([...board]);
                currScoreUndoStack.push(updatedCurrScore);
                bestScoreUndoStack.push(updatedBestScore);
                upMove(board);
                combineColumn(board);
                upMove(board);
                currBoard = JSON.stringify(board);
                if(prevBoard !== currBoard) generateSingleTwo();
                window.localStorage.setItem('board', board);
                setUndoButtonActive(true);
                window.localStorage.setItem('boardUndoStack', boardUndoStack);
                window.localStorage.setItem('currScoreUndoStack', currScoreUndoStack);
                window.localStorage.setItem('bestScoreUndoStack', bestScoreUndoStack);
                break;
            case "ArrowDown":
                boardUndoStack.push([...board]);
                currScoreUndoStack.push(updatedCurrScore);
                bestScoreUndoStack.push(updatedBestScore);
                downMove(board);
                combineColumn(board);
                downMove(board);
                currBoard = JSON.stringify(board);
                if(prevBoard !== currBoard) generateSingleTwo();
                window.localStorage.setItem('board', board);
                setUndoButtonActive(true);
                window.localStorage.setItem('boardUndoStack', boardUndoStack);
                window.localStorage.setItem('currScoreUndoStack', currScoreUndoStack);
                window.localStorage.setItem('bestScoreUndoStack', bestScoreUndoStack);
                break;
            default:
                break;
        }
    }

    return(
        <ResponsiveDisplayDiv>
            <GameHeader currScore={currScore} bestScore={bestScore}/>
            <GameBody boardState={boardState}/>
        </ResponsiveDisplayDiv>
    );
};


export default Game;