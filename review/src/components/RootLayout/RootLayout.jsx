/** @jsxImportSource @emotion/react */
import * as S from "./style";

function RootLayout({ children }) {
    return (
        <>
            <div css={S.background}></div>
            <div css={S.layout}>
                <div css={S.container}>
                    {children}
                </div>
            </div>
        </> 
    );
}

export default RootLayout;