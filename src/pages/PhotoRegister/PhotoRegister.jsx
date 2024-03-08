/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as S from "./style";
import WideButton from "../../components/WideButton/WideButton";
import { useEffect, useRef } from "react";
import { useState } from "react";

/**
 *  1. 사진 불러오기 버튼을 클릭 후 5개 이상의 이미지를 불러올 수 있어야함.
 *  2. PromiseAll을 사용하여 이미지를 순서대로 불러와야함.
 *  3. 불러오기가 완료되면 "이미지를 저장하시겠습니까?" 라는 확인 취소 메세지 창이 떠야함.
 *  4. 확인 클릭시 localStorage에 key: photo, value: JSON 데이터
 *      [
 *          {
 *              id: 1,
 *              imageUrl: ""
 *          },
 *          {
 *              id: 2,
 *              imageUrl: ""
 *          }
 *      ]
 *      형식으로 저장되어야함.
 *  5. 취소시 저정되면 안됨.
 */
const layout = css`
    display: flex;
    flex-wrap: wrap ;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 400px;
`;

const imageLayout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    border: 1px solid #dbdbdb;
    width: 110px;
    height: 110px;
    overflow: hidden;
    & > img {
        width: 100%;
    }
`;
/**
 * 
 * 중요도 낮음 => 이미지 있는 상태 + 첫번째 렌더링에서 confirm 창 발생 => jsx 파일 건드리는 경우외에 발생하지 않음
 */
function PhotoRegister() {
    const uploadFilesId = useRef(0);
    const [ files, setFiles ] = useState([]);
    const [ allFiles, setAllFiles ] = useState([]);
    const imgFileRef = useRef();
    
    useEffect(() => {//로딩시 allFiles을 로컬스토리지에서 다운
        setAllFiles(!localStorage.getItem("photo") ? [] : JSON.parse(localStorage.getItem("photo")));
    },[]);
    useEffect(() => {//allfiles의 변경을 조건으로 로컬스토리지에 배열 저장
        localStorage.setItem("photo", JSON.stringify(allFiles));
    },[allFiles]);
    
    
    const handleFileChange = (e) => {
        const loadFiles = Array.from(e.target.files);
        if(loadFiles.length === 0) {
            imgFileRef.current.value = "";
            return;
        }
        if(!window.confirm("저장하시겠습니까?")) {//confirm 취소시 빈값 return
            imgFileRef.current.value = "";
            return;
        }
        let promises = [];
        uploadFilesId.current = allFiles.length > 0 ? allFiles[allFiles.length - 1].id : 0;//로컬스토리지의 마지막 id 저장
        promises = loadFiles.map(file => new Promise((resolve) => {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {//id와 imageUrl 형식의 객체 생성
                const loadImage = {
                    id: uploadFilesId.current += 1,
                    imageUrl: e.target.result
                };
                resolve(loadImage);
            }
            fileReader.readAsDataURL(file);
        }));
        Promise.all(promises)//Promise를 동기처리 후 배열 생성
        .then(result => {
            imgFileRef.current.value = "";
            setFiles(result); //Promise.all을 통해 생성된 배열 result을 files에 저장
            setAllFiles([...allFiles, ...result]);//기존 로컬스토리지의 배열 + 생성된 배열 통합 allFiles에 저장
        });        
    }

    return (
        <div css={S.layout}>
            {files.length > 0 ? <h1>등록된 사진</h1> : <h1 css={S.title} >사진 등록하기</h1>}
            <input type="file" style={{display: "none"}} multiple={true} ref={imgFileRef} onChange={handleFileChange}/>
            
            {files.length > 0 ?
                <div css={layout}>
            {files?.map(file => 
                <>
                    <div key={file.id} css={imageLayout}>
                        <img src={file.imageUrl} alt="" />
                    </div>
                </>
            )}
            </div> 
            : null
        }
        <WideButton text={"사진 불러오기"} onClick={() => imgFileRef.current.click()}/>
        </div>
    );
}

export default PhotoRegister;