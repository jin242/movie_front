import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import './Movie_Loginbar.css';
import {Button} from "@mui/material";  // 추가 스타일은 여기에 작성

const Header = () => {
    const [isOpen, setMenu] = useState(false);

    const toggleMenu = () => {
        setMenu(prev => !prev);
    };

    function login() {
        const memberId = document.getElementById("username").value;
        const memberPw = document.getElementById("password").value;

        fetch("/ttt/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ memberId, memberPw })
        })
            .then(async res => {
                const token = res.headers.get("Authorization");

                if (res.ok && token) {
                    alert(token.toString());
                    localStorage.setItem("jwt", token);
                    alert("로그인 성공! JWT 저장됨");
                    window.location.href = "/";
                } else {
                    const error = await res.text();
                    alert("로그인 실패: " + error);
                }
            })
            .catch(err => alert("에러: " + err));
    }

    return (
        <div className="header bg-dark text-white d-flex justify-content-between align-items-center p-3">
            <h5 className="m-0">My Movie App</h5>

            {/* 메뉴 아이콘 오른쪽 */}
            <MenuIcon
                onClick={toggleMenu}
                style={{ cursor: 'pointer', color: 'white' }}
            />

            {/* 오른쪽 사이드 메뉴 */}
            <ul className={`side-menu ${isOpen ? 'show-menu' : 'hide-menu'} bg-secondary text-white`}>
                <li className="py-2 border-bottom px-3"><input type="text" id="username" placeholder="아이디" /></li>
                <li className="py-2 border-bottom px-3"><input type="password" id="password" placeholder="비밀번호" /></li>
                <li className="py-2 border-bottom px-3"><button onClick={login}>로그인</button></li>
                <li className="py-2 border-bottom px-3"><button onClick="join()">회원가입</button></li>
                <li className="py-2 border-bottom px-3"><button onClick="logout()">로그아웃</button></li>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={toggleMenu}
                >숨기기</Button>
            </ul>
        </div>
    );
};

export default Header;
