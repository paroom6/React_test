import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 30px;
    width: 100%;
    height: 60px;
`;

export const titleLink = css`
    text-decoration: none;
    color: #fafafa;
    & > h1 {
        font-size: 24px;
    }
`;

export const mypageLink = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    overflow: hidden;

    & > img {
        height: 100%;
    }
`;