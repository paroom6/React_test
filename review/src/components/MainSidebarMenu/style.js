import { css } from "@emotion/react";

export const menuLink = css`
    text-decoration: none;
    color: white;
    padding: 10px;
`;

export const menu = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > span {
        font-size: 30px;
    }
    & > span:nth-of-type(2) {
        font-size: 14px;
    }
`;