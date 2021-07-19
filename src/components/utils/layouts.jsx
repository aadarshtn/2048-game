import styled from 'styled-components';

export const FlexBoxLayout = styled.div((props) => ({
    // Common layout property
    display: "flex",

    // Variable layout properties
    position: props.p || "relative",
    flexDirection: props.fd || "row",
    justifyContent: props.jc || "",
    alignItems: props.ai || "",
    backgroundColor: props.bgColor || "",
    height: props.h || "",
    width: props.w || "",
    minWidth: props.minw || "",
    minHeight: props.minh || "",
    margin: props.m || "",
    padding: props.p || "",
}))
    