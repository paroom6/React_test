/** @jsxImportSource @emotion/react */
import * as S from "./style";

function WideButton({ text, onClick }) {
    return (
        <button css={S.wideButton} onClick={onClick}>{text}</button>
    );
}

export default WideButton;