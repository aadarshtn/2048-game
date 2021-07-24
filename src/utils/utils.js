import React from 'react';
import styled from 'styled-components';

const StyledSVGButton = styled.svg``;

const StyledButton = styled.button((props) => ({
  backgroundColor: '#765F8B',
  border: 'none',
  '&:hover': {
    cursor: props.disabled ? '' : 'pointer',
    svg: {
      path: {
        filter: props.disabled
          ? ''
          : 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
      },
    },
  },
}));

const StyledWrapperDiv = styled.div`
  display: flex;
  width: 550px;
  justify-content: space-around;
  margin: auto;
  margin-top: 36px;
`;

export const ResponsiveDisplayDiv = styled.div`
  width: 300px;
  height: 353px;
  background-color: #fcf9f0;
  margin: auto;
`;

export const StartButton = ({ handleClick, active }) => {
  return (
    <StyledButton
      onClick={() => {
        handleClick();
      }}
    >
      {active ? (
        <StyledSVGButton
          width='44'
          height='44'
          viewBox='0 0 44 44'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect width='44' height='44' fill='white' />
        </StyledSVGButton>
      ) : (
        <StyledSVGButton
          width='51'
          height='74'
          viewBox='0 0 51 74'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M51 37L0 73.3731L0 0.626934L51 37Z' fill='#FFF' />
        </StyledSVGButton>
      )}
    </StyledButton>
  );
};

export const UndoButton = ({ handleClick, active }) => {
  return (
    <StyledButton
      onClick={() => {
        handleClick();
      }}
      disabled={!active}
    >
      <StyledSVGButton
        width='101'
        height='75'
        viewBox='0 0 101 75'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M34.7004 38.171C50.5052 38.171 65.5052 34.671 87.0052 68.171C79.0052 30.671 54.5052 22.671 34.7004 22.671L34.7004 7.98285L3.00512 30.671L34.7004 52.6708L34.7004 38.171Z'
          fill={active ? 'white' : '#969696'}
        />
      </StyledSVGButton>
    </StyledButton>
  );
};

export const RedoButton = ({ handleClick, active }) => {
  return (
    <StyledButton
      onClick={() => {
        handleClick();
      }}
      disabled={!active}
    >
      <StyledSVGButton
        width='101'
        height='75'
        viewBox='0 0 101 75'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M65.9977 38.171C50.1929 38.171 35.1929 34.671 13.6929 68.171C21.6929 30.671 46.1929 22.671 65.9977 22.671L65.9977 7.98285L97.693 30.671L65.9977 52.6708L65.9977 38.171Z'
          fill={active ? 'white' : '#969696'}
        />
      </StyledSVGButton>
    </StyledButton>
  );
};

export const ControlsWrapper = (props) => {
  return (
    <StyledWrapperDiv>
      {props.childrenArray.map((child) => child)}
    </StyledWrapperDiv>
  );
};

export const FlexBoxLayout = styled.div((props) => ({
  // Common layout property
  display: props.d ? props.d : 'flex',

  // Variable layout properties
  position: props.p || 'relative',

  left: props.l || "",
  top: props.t || "",
  zIndex: props.zIndex || "",

  flexDirection: props.fd || 'row',
  justifyContent: props.jc || '',
  alignItems: props.ai || '',
  backgroundColor: props.bgColor || '',
  height: props.h || '',
  width: props.w || '',
  minWidth: props.minw || '',
  minHeight: props.minh || '',
  margin: props.m || '',
  padding: props.p || '',
  fontSize: props.fs || '',
  fontWeight: props.fw || '',
}));

export const GridLayout = styled.div((props) => ({
  // Common layout property
  display: 'grid',

  // Variable layout properties
  gridTemplateColumns: 'auto auto auto auto',
  width: '250px',
  maxHeight: '250px',
  backgroundColor: '#BCAD9D',
  padding: '7px 7px 7px 7px',
  gap: '7px',
  textAlign: 'center',
  verticalAlign: 'middle',
}));

export const GridElement = styled.h2((props) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '56px',
  height: '54px',
  color: props.value > 4 ? '#EEEEEE' : '#786E65',
  backgroundColor: props.bgColor ? props.bgColor : 'rgba(255, 255, 255, 0.8)',
  fontSize: props.value > 512 ? '16px' : props.value > 64 ? '20px' : '22px',
  margin: '0px',
  boxShadow:
    props.bgColor === '#CDC1B5' ? '' : '0px 1px 3px rgba(0, 0, 0, 0.25)',
}));

export const Text = styled.p((props) => ({
  fontSize: props.fs || '',
  fontWeight: props.fw || '',
  letterSpacing: props.ls || '',
  color: props.c || '#000',
  margin: '0px',
  textAlign: props.ta || 'start',
  width: props.w || '',
  height: props.h || 'inherit',
  backgroundColor: props.bgColor || '',
  lineHeight: 'inherit',
}));
