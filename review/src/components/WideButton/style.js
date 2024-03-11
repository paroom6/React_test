import { css } from "@emotion/react";


export const wideButton = css`
    box-sizing: border-box;
    margin-bottom: 20px;
    border: none;
    width: 100%;
    height: 50px;
    background-color: #151515;
    color: white;
    font-size: 18px;
    cursor: pointer;
    &:hover {
        background-color: #333333;
    }
    &:active {
        background-color: #222222;
    }
`;