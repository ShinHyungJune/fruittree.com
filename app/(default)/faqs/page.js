"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

// import Swiper from "swiper";  // Swiper 기본 가져오기

// 리덕스
import { useDispatch, useSelector } from "react-redux";

import Header from "@/components/Header";
import MainTabMenu from "@/components/library/MainTabMenu";
import NoListData from "@/components/NoListData";
import Pagination from "@/components/Pagination";
import { StateBoards } from "@/enums/stateBoards";
import boardsApi from "@/lib/api/boardsApi";



export default function page() {
    const router = useRouter();
    const [visibleItemId, setVisibleItemId] = useState(null);

    // 개시판 하위 카테고리
    const [initFaqs, setInitFaqs] = useState([])

    const [form, setForm] = useState({
        page: 1,
    });

    const [faqs, setFaqs] = useState({
        data: [],
        meta: {
            current_page: 1,
            last_page: 1,
            total: 0,
        },
    });


    useEffect(() => {
        boardsInit()
    }, [])
    function boardsInit() {
        boardsApi.init(StateBoards.FAQ, form, (response) => {
            setInitFaqs(response.data.data.category_items);
        })
    }


    useEffect(() => {
        boardsIndex()
    }, [form])
    function boardsIndex() {
        boardsApi.index(StateBoards.FAQ, form, (response) => {
            setFaqs(response.data);
        })
    }


    // 날짜 포맷팅 함수
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // 1월은 0부터 시작하므로 +1
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}.${month}.${day}`;
    };

    return (
        <>
            <Header />

            <div className="body">
                <div className="tab-menu-type2">
                    <ul>
                        <li className="active">
                            <Link href="/faqs">FAQ</Link>
                        </li>
                        <li>
                            <Link href="/notices">공지사항</Link>
                        </li>
                    </ul>
                </div>

                <section className="mb-60">
                    <div className="tab-menu-type3 mb-10 mt-10">
                        <div className="tab-menu-bar">
                            <button className="tab-item active">전체</button>
                            <button className="tab-item">주문결제</button>
                            <button className="tab-item">배송</button>
                            <button className="tab-item">상품</button>
                            <button className="tab-item">취소/교환/환불</button>
                        </div>
                    </div>
                    <div className="qna-list-type1">
                        {
                            faqs.data.length > 0 ? (
                                <ul>
                                    {
                                        faqs.data.map((faq)=>{
                                            const isVisible = visibleItemId === faq.id;

                                            return(
                                                <li key={faq.id}>
                                                    <div className="qna-item-type1">
                                                        <div
                                                            className="qna-item-top"
                                                            onClick={() =>
                                                                setVisibleItemId(isVisible ? null : faq.id)
                                                            } // 클릭 시 열고 닫기
                                                        >
                                                            <div className="category-wrap">
                                                                <p className="category-txt">주문결제</p>
                                                            </div>
                                                            <div className="content-txt-wrap">
                                                                <div className="content-txt">
                                                                    {faq.title}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        {isVisible && ( // 항목이 열렸을 때만 보이게 함
                                                            <div className="qna-item-bt">
                                                                <div className="category-wrap">
                                                                    <p className="category">A</p>
                                                                </div>
                                                                <div className="content-txt-wrap">
                                                                    <p>
                                                                        {faq.content_answer}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                    {/* <li>
                                        <div className="qna-item-type1">
                                            <div className="qna-item-top">
                                                <div className="category-wrap">
                                                    <p className="category-txt">교환문의</p>
                                                </div>
                                                <div className="content-txt-wrap">
                                                    <div className="content-txt">
                                                        출고는 언제해주시는건가요? <br />
                                                        올 생각을 안해요.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="qna-item-bt">
                                                <div className="category-wrap">
                                                    <p className="category">A</p>
                                                </div>
                                                <div className="content-txt-wrap">
                                                    <p>
                                                        안녕하세요. <br />
                                                        싱그러운 하루를 전달하는 열매나무입니다.
                                                        <br />
                                                        <br />
                                                        주문해주신 과일은 금일 출고 예정입니다.
                                                        <br />
                                                        <br />
                                                        감사합니다.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </li> */}
                                </ul>
                            ) : (
                                <NoListData message="공지사항이 없습니다." />
                            )
                        }
                    </div>
                    <Pagination
                        form={form}
                        setForm={setForm}
                        meta={faqs.meta}
                    />
                </section>
            </div>
        </>
    );
}