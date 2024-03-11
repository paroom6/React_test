import { GoHome, GoPlus, GoPerson } from "react-icons/go";
import { PiGooglePhotosLogoLight } from "react-icons/pi";
import Home from "../pages/Home/Home";
import PhotoRegister from "../pages/PhotoRegister/PhotoRegister";
import PhotoAlbum from "../pages/PhotoAlbum/PhotoAlbum";
import Mypage from "../pages/Mypage/Mypage";

export const SIDEBAR_MENUS = [
    {
        id: 1,
        name: "홈",
        icon: <GoHome />,
        path: "/",
        element: <Home />
    },
    {
        id: 2,
        name: "사진등록",
        icon: <GoPlus />,
        path: "/photo/register",
        element: <PhotoRegister />
    },
    {
        id: 3,
        name: "사진첩",
        icon: <PiGooglePhotosLogoLight />,
        path: "/photo/album",
        element: <PhotoAlbum />
    },
    {
        id: 4,
        name: "나",
        icon: <GoPerson />,
        path: "/mypage",
        element: <Mypage />
    },
];