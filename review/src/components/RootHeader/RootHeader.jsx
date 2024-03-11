/** @jsxImportSource @emotion/react */
import { Link } from "react-router-dom";
import * as S from "./style";
import defaultImg from "../../assets/images/profile/default.jpeg"
import { useEffect } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { MypageSubmitRefresh } from "../../atom/mypageSubmitRefresh.js";
function RootHeader() {//기본 defaultImg 로컬스토리지 user의 이미지 존재한다면 대체
    const [ profileUrl, setProfileUrl ] = useState(defaultImg);
    const [refresh, setRefresh] = useRecoilState(MypageSubmitRefresh);
    useEffect(() =>{
        if(refresh){
            const loadUserInfo = JSON.parse(localStorage.getItem("user"));
            if(!loadUserInfo) {
                return;
            }
            setProfileUrl(loadUserInfo.imgUrl);
            setRefresh(false);
        }
    }, [refresh]);
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