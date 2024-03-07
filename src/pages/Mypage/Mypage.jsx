/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import WideButton from "../../components/WideButton/WideButton";
import { useInput } from "../../hooks/useInput";
import * as S from "./style";
import defaultProfile from "../../assets/images/profile/default.jpeg"
import RootHeader from "../../components/RootHeader/RootHeader";



/**
 * 
 * 1. 이미지 클릭시 이미지 변경가능해야함.
 * 2. 수정하기 버튼 클릭시 localStorage에 key: user value: JSON데이터
 *  {
 *      nickname: "테스트계정",
 *      namd: "김준일",
 *      birthday: "1994-09-07",
 *      imgUrl: ""
 *  }
 *  저장되어야하고 페이지 로드시 불러와야함.
 * 3. RootHeader의 프로필 이미지도 변경되어야함.
 */
function Mypage(props) {
    
   
    const [ nicknameValue, handleNicknameOnChange, setNicknameValue] = useInput();
    const [ nameValue, handleNameOnChange, setNameValue] = useInput();
    const [ birthdayValue, handleBirthdayOnChange, setBirthdayValue ] = useInput();
    const [ profileUrl, setProfileUrl] = useState(defaultProfile);
    const imgFileRef = useRef();

    useEffect(() =>{
        if(!!localStorage.getItem("user")){
            const loadUserInfo = JSON.parse(localStorage.getItem("user"));
            setProfileUrl(loadUserInfo.imgUrl);//onChange를 트리거로 값이 바뀌기에 useInput의 set을 가져와 사용
            setNicknameValue(loadUserInfo.nickname);
            setNameValue(loadUserInfo.name);
            setBirthdayValue(loadUserInfo.birthday);
        }
    }, [])

    const imageChange = (e) => {
        const file = Array.from(e.target.files)[0];
        console.log(file);
        if(e.target.files.length === 0) {
            imgFileRef.current.value ="";
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            setProfileUrl(e.target.result);
        };
        fileReader.readAsDataURL(file);
        }
        const handleSubmitOnClick = () => {
            const userInfo = {
                nickname: nicknameValue,
                name: nameValue,
                birthday: birthdayValue,
                imgUrl: profileUrl 
            }
            localStorage.setItem("user",JSON.stringify(userInfo));
            alert("수정완료!!!");
            window.location.reload(); // RootHeader의 경우 로컬스토리지의 변경을 인식하지 못하기에 일단 강제 새로고침으로 렌더링을 발생
        }
    return (
        <div css={S.layout}>
            <div css={S.imageBox}>
                <img src={profileUrl} alt="" onClick={() => imgFileRef.current.click()}/>
                <input type="file" style={{display: "none"}} ref={imgFileRef} onChange={imageChange} />  
            </div>
            <input css={S.inputBox} type="text" placeholder="닉네임" value={nicknameValue} onChange={handleNicknameOnChange} />
            <input css={S.inputBox} type="text" placeholder="이름" value={nameValue} onChange={handleNameOnChange} />
            <input css={S.inputBox} type="text" placeholder="생년월일" value={birthdayValue} onChange={handleBirthdayOnChange} />
            <WideButton text={"수정하기"} onClick={handleSubmitOnClick}/>
        </div>
    );
}

export default Mypage;