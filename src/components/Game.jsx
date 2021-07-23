import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import GameBody from './GameBody';
import GameHeader from './GameHeader';


// ------------- Styled Components ----------------- //
const ResponsiveDisplayDiv = styled.div`
    width: 300px;
    height: 353px;
    background-color: #FCF9F0;
    margin: auto;
`;


// ------------- Exported Component --------------- //
function Game() {

    // States
    const board = new Array(16).fill(0);
    const [boardState, setBoardState] = useState(JSON.stringify(board));
    const [currScore, setCurrScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);

    let updatedCurrScore = 0;
    let updatedBestScore = bestScore;

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
        setCurrScore(updatedCurrScore);
        setBestScore(updatedBestScore);

        // Convert String Back To Array Format
        const boardArray = localBoard ? localBoard.split(",") : [];

        // Populating board Array with values before reolad
        for(let i = 0; i < boardArray.length; i++){
            board[i] = parseInt(boardArray[i]);
        }

        setBoardState(JSON.stringify(board));

        if(!localBoard) {
            generateDoubleTwo();
        }
        
        window.localStorage.setItem('board', board);
        document.addEventListener('keyup', handleMove);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

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
                rightMove(board);
                combineRow(board);
                rightMove(board);
                currBoard = JSON.stringify(board);
                if(prevBoard !== currBoard) generateSingleTwo();
                window.localStorage.setItem('board', board);
                break;
            case "ArrowLeft":
                leftMove(board);
                combineRow(board);
                leftMove(board);
                currBoard = JSON.stringify(board);
                if(prevBoard !== currBoard) generateSingleTwo();
                window.localStorage.setItem('board', board);
                break;
            case "ArrowUp":
                upMove(board);
                combineColumn(board);
                upMove(board);
                currBoard = JSON.stringify(board);
                if(prevBoard !== currBoard) generateSingleTwo();
                window.localStorage.setItem('board', board);
                break;
            case "ArrowDown":
                downMove(board);
                combineColumn(board);
                downMove(board);
                currBoard = JSON.stringify(board);
                if(prevBoard !== currBoard) generateSingleTwo();
                window.localStorage.setItem('board', board);
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