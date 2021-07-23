import React from 'react';
import styled from 'styled-components';
import { 
    FlexBoxLayout,
    Text,
 } from '../utils/utils';

const HeaderWrapper = styled(FlexBoxLayout)({
    flexDirection: "column",
    height: "60px",
    justifyContent: "space-between",
    padding: "11px 17px 15px 25px",
    backgroundColor: "#FCF9F0"
});

const ScoreBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 29px;
    width: 67px;
    background-color: #BBAE9E;
`;

export default function GameHeader({currScore, bestScore}) {
    return (
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
    )
}
