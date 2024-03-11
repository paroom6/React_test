/** @jsxImportSource @emotion/react */
import { Link } from "react-router-dom";
import * as S from "./style";
import { SIDEBAR_MENUS } from "../../constants/menu";
import MainSidebarMenu from "../MainSidebarMenu/MainSidebarMenu";

function MainSidebarBottom() {
    return (
        <ul css={S.layout}>
            {
                SIDEBAR_MENUS.map(
                    menu => 
                    <MainSidebarMenu key={menu.id} path={menu.path} icon={menu.icon} name={menu.name}/>
                )
            }
        </ul>
    );
}

export default MainSidebarBottom;