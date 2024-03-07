/** @jsxImportSource @emotion/react */
import { Link } from "react-router-dom";
import * as S from "./style";
import defaultImg from "../../assets/images/profile/default.jpeg"
import { useEffect } from "react";
import { useState } from "react";
let isChange = false;
function RootHeader() {
    const [ profileUrl, setProfileUrl ] = useState(defaultImg);
    useEffect(() =>{
        if(!!localStorage.getItem("user")){
            const loadUserInfo = JSON.parse(localStorage.getItem("user"));
            setProfileUrl(loadUserInfo.imgUrl);
        }
    }, []);
    return (
        <div css={S.layout}>
            <Link css={S.titleLink} to={"/"}>
                <h1>사진첩 어플</h1>
            </Link>
            <Link css={S.mypageLink} to={"/mypage"}>    
                <img src={profileUrl} alt="" />
            </Link>
        </div>
    );
}       

export default RootHeader;