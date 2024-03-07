/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as S from "./style";
import WideButton from "../../components/WideButton/WideButton";
import { useEffect, useMemo, useRef } from "react";
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
 * 중요도 낮음 => 이미지 있는 상태 + 첫번째 렌더링에서 confirm 창 발생 => jsx 파일 건드리는 경우외에 발생하지 않음
 */
function PhotoRegister() {
    const uploadFilesId = useRef(0);
    const [ files, setFiles ] = useState([]);
    const [ allFiles, setAllFiles ] = useState([]);
    const imgFileRef = useRef();
    const notFirstLoad = useMemo(()=>{
        return files.length > 0 ? true : false;
    },[files])
    useEffect(() => {
        setAllFiles(!localStorage.getItem("photo") ? [] : JSON.parse(localStorage.getItem("photo")));
    },[]);
    useEffect(() => {
        if(notFirstLoad) {
            if(!window.confirm("저장하시겠습니까?")) {
                setFiles([]);//페이지 로드로 안되게 설정. 취소시 저정되면 안됨
                imgFileRef.current.value = "";//취소나 등록 후 같은 이미지 선택시 onChange 조건 재활성화
                console.log(imgFileRef.current.value);
                return;
            } else {
                localStorage.setItem("photo", JSON.stringify(allFiles));
                imgFileRef.current.value = "";

            } 
        }
    },[allFiles]);
    
    
    const handleFileChange = (e) => {
        const loadFiles = Array.from(e.target.files);
        if(loadFiles.length === 0) {
            imgFileRef.current.value = "";
            return;
        }
        let promises = [];
        uploadFilesId.current = allFiles.length > 0 ? allFiles[allFiles.length - 1].id : 0;
        promises = loadFiles.map(file => new Promise((resolve) => {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const loadImage = {
                    id: uploadFilesId.current += 1,
                    imageUrl: e.target.result
                };
                resolve(loadImage);
            }
            fileReader.readAsDataURL(file);
        }));
        Promise.all(promises)
        .then(result => {
            setFiles(result);
            setAllFiles([...allFiles, ...result]);
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