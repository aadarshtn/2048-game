import React, { useState } from 'react';
import styled from 'styled-components';
import { FlexBoxLayout } from './utils/layouts';

const ResponsiveDisplayDiv = styled.div`
    width: 300px;
    height: 353px;
    background-color: #FCF9F0;
    margin: auto;
`;

const ScoreBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 29px;
    width: 67px;
    background-color: #BBAE9E;
`;

const Text = styled.p((props) => ({
    fontSize: props.fs || "",
    fontWeight: props.fw || "",
    letterSpacing: props.ls || "",
    color: props.c || "#000",
    margin: "0px",
    textAlign: props.ta || "start",
    width: props.w || "",
    height: props.h || "",
    backgroundColor: props.bgColor || "inherit"
}));

const HeaderWrapper = styled(FlexBoxLayout)({
    flexDirection: "column",
    height: "60px",
    justifyContent: "space-between",
    padding: "11px 17px 15px 25px",
    backgroundColor: "#FCF9F0"
});

const renderGameHeader = ({currScore, bestScore}) => {
    return(
        <HeaderWrapper>
            <FlexBoxLayout jc="space-between">
                <Text fs="35px" fw="700" c="#756C65">2048</Text>
                <FlexBoxLayout w="137px" jc="space-around">
                    <ScoreBox>
                        <Text ta="center" fs="9px" fw="800" c="#F0E3D6" ls="1px">Score</Text>
                        <Text ta="center" fs="14px" fw="700" c="#FBFCFA" ls="1px">{currScore}</Text>
                    </ScoreBox>
                    <ScoreBox>
                        <Text ta="center" fs="9px" fw="800" c="#F0E3D6" ls="1px">Best</Text>
                        <Text ta="center" fs="14px" fw="700" c="#FBFCFA" ls="1px">{bestScore}</Text>
                    </ScoreBox>
                </FlexBoxLayout>
            </FlexBoxLayout>
            <Text fs="10px" fw="500" c="#938C84">Join the numbers and get to the 2048 tile!</Text>
        </HeaderWrapper>
    );
}

const renderGameConsole = () => {
    return(
        <div>Hi</div>
    );
}

function GameDisplay() {

    // States to hold points
    const [currScore, setCurrScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);

    // State to hold current screenshot of the game console
    const [board, setBoard] = useState([]);

    return(
        <ResponsiveDisplayDiv>
            {renderGameHeader({currScore,bestScore})}
            {renderGameConsole()}
        </ResponsiveDisplayDiv>
    );
};


export default GameDisplay;