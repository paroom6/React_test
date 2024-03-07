/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as S from "./style";
import WideButton from "../../components/WideButton/WideButton";
import { useRef } from "react";
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

function PhotoRegister() {
    const uploadFilesId = useRef(0);
    const [ files, setFiles ] = useState([]);
    const imgFileRef = useRef();
    
    const handleFileChange = (e) => {
        const loadFiles = Array.from(e.target.files);
        if(loadFiles.length === 0) {
            imgFileRef.current.value = "";
            return;
        }
        uploadFilesId.current = 0;
        let promises = [];
        promises = loadFiles.map(file => new Promise((resolve) => {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                resolve({
                    id: uploadFilesId.current += 1,
                    imageUrl: e.target.result
                });
            }
            fileReader.readAsDataURL(file);
        }));

        Promise.all(promises)
        .then(result => {
            setFiles(result);
        });        
    }

    const handleImageUpload = () => {
        if(!window.confirm("저장하시겠습니까?")) {
            return;
        }
        localStorage.setItem("photo", JSON.stringify(files));
    }
    return (
        <div css={S.layout}>
            <h1 css={S.title} onClick={handleImageUpload}>사진 등록하기</h1>
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