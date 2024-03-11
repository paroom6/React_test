import { css } from "@emotion/react";

export const background = css`
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-color: #222222;
`;

export const layout = css`
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 30px auto;
    border: 2px solid #fafafa;
    border-radius: 30px;
    padding-top: 40px;
    width: 420px;
    height: 800px;
    background-color: #000000;
    overflow: hidden;
`;

export const container = css`
    height: 665px;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
    }
`;