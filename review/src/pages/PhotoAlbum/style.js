import { css } from "@emotion/react";


export const layout = css`
    padding: 0px 10px;

`;

export const imageCard = css`
    box-sizing: border-box;
    margin-bottom: 5px;
    border: 1px solid #151515;
    width: 100%;
    height: 300px;
    background-color: #151515 ;

`;


export const imageBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 250px;
    background-color: #000000;
    overflow: hidden;

    & > img {
        height: 100%;
    }
`;