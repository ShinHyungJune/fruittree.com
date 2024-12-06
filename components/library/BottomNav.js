import React from "react";

import { useDispatch, useSelector } from "react-redux";

const BottomNav = () => {

    // 유저 정보 관리
    const user = useSelector(state => state.app.user);

    return (
        <div className="bottomNav-type1">
            <ul>
                <li>
                    <a href="/" className="bottomNav-button">
                        <img src="/images/bottomNav-home.png" alt="홈" />
                    </a>
                </li>
                <li>
                    <a href="" className="bottomNav-button">
                        <img src="/images/bottomNav-list.png" alt="목록" />
                    </a>
                </li>
                <li>
                    <a href="/basts" className="bottomNav-button">
                        <img src="/images/bottomNav-best.png" alt="베스트" />
                    </a>
                </li>
                <li>
                    <a href="/events" className="bottomNav-button">
                        <img src="/images/bottomNav-event.png" alt="이벤트" />
                    </a>
                </li>
                {
                    user ?
                    <li>
                        <a href="/mypage" className="bottomNav-button">
                            <img src="/images/bottomNav-my.png" alt="마이페이지" />
                        </a>
                    </li>
                    :
                    <li>
                        <a href="/login" className="bottomNav-button">
                            <img src="/images/bottomNav-my.png" alt="로그인" />
                        </a>
                    </li>
                }
                
            </ul>
        </div>
    );
};

export default BottomNav;