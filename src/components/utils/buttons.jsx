import React from "react";
import styled from 'styled-components';

const StyledSVGButton = styled.svg`
    &:hover {
        cursor: pointer;
        path {
            filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
        }
    }
`;

const StyledWrapperDiv = styled.div`
    display: flex;
    width: 550px;
    justify-content: space-around;
    margin: auto;
    margin-top: 36px;
`;

export const ReplayButton = () => {
    return(
        <StyledSVGButton width="51" height="74" viewBox="0 0 51 74" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M51 37L0 73.3731L0 0.626934L51 37Z" fill="white"/>
        </StyledSVGButton>
    );
}

export const UndoButton = () => {
    return(
        <StyledSVGButton width="101" height="75" viewBox="0 0 101 75" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M34.7004 38.171C50.5052 38.171 65.5052 34.671 87.0052 68.171C79.0052 30.671 54.5052 22.671 34.7004 22.671L34.7004 7.98285L3.00512 30.671L34.7004 52.6708L34.7004 38.171Z" fill="white"/>
        </StyledSVGButton>
    );
}

export const RedoButton = () => {
    return(
        <StyledSVGButton width="101" height="75" viewBox="0 0 101 75" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M65.9977 38.171C50.1929 38.171 35.1929 34.671 13.6929 68.171C21.6929 30.671 46.1929 22.671 65.9977 22.671L65.9977 7.98285L97.693 30.671L65.9977 52.6708L65.9977 38.171Z" fill="white"/>
        </StyledSVGButton>
    );
}

export const ControlsWrapper = (props) => {
    return(
        <StyledWrapperDiv>
            {props.childrenArray.map((child) => child)}
        </StyledWrapperDiv>
    )
}