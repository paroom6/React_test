/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
/**
 *  1. 사진 등록하기를 통해 등록된 이미지들을 각자 자유롭게 디자인하여 불러와야함.
 *  2. localStorage에 저장된 사진이 없으면 
 *      <h1>불러올 사진이 없습니다.<h1>
 *      문구가 중앙에 나오도록해야함.
 */
const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap ;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    width: 100%;
    height: 600px;
`;

const imageLayout = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    border: 1px solid #dbdbdb;
    width: 360px;
    height: 360px;
    overflow: hidden;
    & > img {
        width: 100%;
    }
`;


function PhotoAlbum() {
    const [ files, setFiles ] = useState([]);
    useEffect(() => {
        setFiles(!localStorage.getItem("photo") ? [] : JSON.parse(localStorage.getItem("photo")));
    }, []);

    return (
        <div css={layout}>
            { files.length > 0 ? files?.map(file => 
                <>
                    <div key={file.id} css={imageLayout}>
                        <img src={file.imageUrl} alt="" />
                    </div>
                </>
            ) : <h1 style={{color: "white"}}>불러올 사진이 없습니다.</h1>}
        </div>
    );
}

export default PhotoAlbum;