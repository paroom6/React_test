/** @jsxImportSource @emotion/react */
import { Link } from "react-router-dom";
import * as S from "./style";

function MainSidebarMenu({ path, icon, name }) {
    return (
        <Link css={S.menuLink} to={path}>
            <li css={S.menu}>
                <span>{icon}</span>
                <span>{name}</span>
            </li>
        </Link>
    );
}

export default MainSidebarMenu;