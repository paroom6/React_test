import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 20px 0px;
`;

export const imageBox = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    border: 3px solid #666666;
    border-radius: 50%;
    width: 250px;
    height: 250px;
    overflow: hidden;
    cursor: pointer;

    & > img {
        height: 100%;
    }
`;

export const inputBox = css`
    box-sizing: border-box;
    margin-bottom: 20px;
    border: none;
    border-bottom: 1px solid #666666;
    padding: 10px 20px;
    width: 100%;
    height: 50px;
    background-color: #151515;
    color: white;
    font-size: 20px;
`;
