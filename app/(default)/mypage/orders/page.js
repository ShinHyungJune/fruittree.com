"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

// 리덕스
import { useDispatch, useSelector } from "react-redux";

import Header from "@/components/Header";
import NoListData from "@/components/NoListData";

import ordersApi from "@/lib/api/ordersApi";

export default function page() {
    const router = useRouter();

    const [visibleItemId, setVisibleItemId] = useState(null);

    const [form, setForm] = useState({
        page: 1,
    });
    const [orders, setOrders] = useState({
        data: [],
        meta: {
            current_page: 1,
            last_page: 1,
            total: 0,
        },
    });

    useEffect(() => {
        index()
    }, [form])
    function index() {
        ordersApi.index(form, (response) => {
            setOrders(response.data);
            console.log(response.data);
        })
    }




    return (
        <>
            <Header subTitle={'주문/배송 조회'} />

            <div className="body">
                <section className="mb-40">
                    <div className="order-list-type1">
                        <ul>
                            <li>
                                <div className="order-item-type1">
                                    <div className="order-num">
                                        <Link href="/deliveryTrackingDetail.html">
                                            Order20240000-000000 <i className="xi-angle-right"></i>
                                        </Link>
                                    </div>

                                    <div className="order-product-list-type1">
                                        <ul>
                                            <li>
                                                <div className="order-product-item-type1 px-20">
                                                    <div className="order-status-wrap">
                                                        <div className="order-status-box">
                                                            <p className="order-status">배송시작</p>
                                                            <span></span>
                                                            <p className="date">2024.00.00</p>
                                                        </div>
                                                        <p className="shipping-fee">배송비 3,000원</p>
                                                    </div>

                                                    <div className="order-product-type1">
                                                        <div className="item-img-wrap ratio-box">
                                                            <img src="/asset/images/test-img.png" alt="" />
                                                        </div>
                                                        <div className="item-content-wrap">
                                                            <p className="item-title">돌 스위티오 바나나, 1kg 내외, 1개</p>
                                                            <p className="item-option">4kg(14-16 중대과)</p>
                                                            <div className="item-count-amount-wrap">
                                                                <p className="item-count">수량 1개</p>
                                                                <p className="item-amount">84,800원</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="order-tracking mb-20">
                                                        <p className="order-tracking-labal">주문배송조회</p>
                                                        <Link href="">
                                                            <span className="tracking-number">684651321654</span>
                                                        </Link>
                                                    </div>

                                                    <div className="order-product-btn-wrap">
                                                        <Link href="/inquiryPageWrite.html" className="order-product-btn">
                                                            1:1문의
                                                        </Link>
                                                        <Link href="/exchangeReturn.html" className="order-product-btn">
                                                            반품접수
                                                        </Link>
                                                        <Link href="/exchangeReturn.html" className="order-product-btn">
                                                            교환접수
                                                        </Link>
                                                        <Link href="/reviewWrite.html" className="order-product-btn big blk">
                                                            리뷰작성 + 최대 1,500P
                                                        </Link>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className="order-item-type1">
                                    <div className="order-num">
                                        <Link href="/deliveryTrackingDetail.html">
                                            Order20240000-000000 <i className="xi-angle-right"></i>
                                        </Link>
                                    </div>

                                    <div className="order-product-list-type1">
                                        <ul>
                                            <li>
                                                <div className="order-product-item-type1 px-20">
                                                    <div className="order-status-wrap">
                                                        <div className="order-status-box">
                                                            <p className="order-status">구매완료</p>
                                                            <span></span>
                                                            <p className="date">2024.00.00</p>
                                                        </div>
                                                        <p className="shipping-fee">배송비 3,000원</p>
                                                    </div>

                                                    <div className="order-product-type1">
                                                        <div className="item-img-wrap ratio-box">
                                                            <img src="/asset/images/test-img.png" alt="" />
                                                        </div>
                                                        <div className="item-content-wrap">
                                                            <p className="item-title">돌 스위티오 바나나, 1kg 내외, 1개</p>
                                                            <p className="item-option">4kg(14-16 중대과)</p>
                                                            <div className="item-count-amount-wrap">
                                                                <p className="item-count">수량 1개</p>
                                                                <p className="item-amount">84,800원</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="order-tracking mb-20">
                                                        <p className="order-tracking-labal">주문배송조회</p>
                                                        <Link href="">
                                                            <span className="tracking-number">684651321654</span>
                                                        </Link>
                                                    </div>

                                                    <div className="order-product-btn-wrap">
                                                        <Link href="" className="order-product-btn">
                                                            1:1문의
                                                        </Link>
                                                        <Link href="/exchangeReturn.html" className="order-product-btn">
                                                            교환접수
                                                        </Link>
                                                        <Link href="/reviewWrite.html" className="order-product-btn big blk">
                                                            리뷰작성 + 최대 1,500P
                                                        </Link>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="order-product-item-type1 px-20">
                                                    <div className="order-status-wrap">
                                                        <div className="order-status-box">
                                                            <p className="order-status">구매완료</p>
                                                            <span></span>
                                                            <p className="date">2024.00.00</p>
                                                        </div>
                                                        <p className="shipping-fee">배송비 3,000원</p>
                                                    </div>

                                                    <div className="order-product-type1">
                                                        <div className="item-img-wrap ratio-box">
                                                            <img src="/asset/images/test-img.png" alt="" />
                                                        </div>
                                                        <div className="item-content-wrap">
                                                            <p className="item-title">돌 스위티오 바나나, 1kg 내외, 1개</p>
                                                            <p className="item-option">4kg(14-16 중대과)</p>
                                                            <div className="item-count-amount-wrap">
                                                                <p className="item-count">수량 1개</p>
                                                                <p className="item-amount">84,800원</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="order-tracking mb-20">
                                                        <p className="order-tracking-labal">주문배송조회</p>
                                                        <Link href="">
                                                            <span className="tracking-number">684651321654</span>
                                                        </Link>
                                                    </div>

                                                    <div className="order-product-btn-wrap">
                                                        <Link href="" className="order-product-btn">
                                                            1:1문의
                                                        </Link>
                                                        <Link href="/exchangeReturn.html" className="order-product-btn">
                                                            교환접수
                                                        </Link>
                                                        <Link href="/reviewWrite.html" className="order-product-btn big blk">
                                                            리뷰작성 + 최대 1,500P
                                                        </Link>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className="order-item-type1">
                                    <div className="order-num">
                                        <Link href="">
                                            Order20240000-000000 <i className="xi-angle-right"></i>
                                        </Link>
                                    </div>

                                    <div className="order-product-list-type1">
                                        <ul>
                                            <li>
                                                <div className="order-product-item-type1 px-20">
                                                    <div className="order-status-wrap">
                                                        <div className="order-status-box">
                                                            <p className="order-status">취소완료</p>
                                                        </div>
                                                        <p className="shipping-fee">배송비 3,000원</p>
                                                    </div>

                                                    <div className="order-product-type1">
                                                        <div className="item-img-wrap ratio-box">
                                                            <img src="/asset/images/test-img.png" alt="" />
                                                        </div>
                                                        <div className="item-content-wrap">
                                                            <p className="item-title">돌 스위티오 바나나, 1kg 내외, 1개</p>
                                                            <p className="item-option">4kg(14-16 중대과)</p>
                                                            <div className="item-count-amount-wrap">
                                                                <p className="item-count">수량 1개</p>
                                                                <p className="item-amount">84,800원</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="order-product-btn-wrap">
                                                        <Link href="" className="order-product-btn blk">
                                                            취소상세
                                                        </Link>
                                                        <Link href="/reviewWrite.html" className="order-product-btn">
                                                            1:1문의
                                                        </Link>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="order-product-item-type1 px-20">
                                                    <div className="order-status-wrap">
                                                        <div className="order-status-box">
                                                            <p className="order-status">취소완료</p>
                                                        </div>
                                                        <p className="shipping-fee">배송비 3,000원</p>
                                                    </div>

                                                    <div className="order-product-type1">
                                                        <div className="item-img-wrap ratio-box">
                                                            <img src="/asset/images/test-img.png" alt="" />
                                                        </div>
                                                        <div className="item-content-wrap">
                                                            <p className="item-title">돌 스위티오 바나나, 1kg 내외, 1개</p>
                                                            <p className="item-option">4kg(14-16 중대과)</p>
                                                            <div className="item-count-amount-wrap">
                                                                <p className="item-count">수량 1개</p>
                                                                <p className="item-amount">84,800원</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="order-product-btn-wrap">
                                                        <Link href="" className="order-product-btn blk">
                                                            취소상세
                                                        </Link>
                                                        <Link href="/reviewWrite.html" className="order-product-btn">
                                                            1:1문의
                                                        </Link>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className="order-item-type1">
                                    <div className="order-num">
                                        <Link href="">
                                            Order20240000-000000 <i className="xi-angle-right"></i>
                                        </Link>
                                    </div>

                                    <div className="order-product-list-type1">
                                        <ul>
                                            <li>
                                                <div className="order-product-item-type1 px-20">
                                                    <div className="order-status-wrap">
                                                        <div className="order-status-box">
                                                            <p className="order-status">교환완료</p>
                                                        </div>
                                                        <p className="shipping-fee">배송비 3,000원</p>
                                                    </div>

                                                    <div className="order-product-type1">
                                                        <div className="item-img-wrap ratio-box">
                                                            <img src="/asset/images/test-img.png" alt="" />
                                                        </div>
                                                        <div className="item-content-wrap">
                                                            <p className="item-title">돌 스위티오 바나나, 1kg 내외, 1개</p>
                                                            <p className="item-option">4kg(14-16 중대과)</p>
                                                            <div className="item-count-amount-wrap">
                                                                <p className="item-count">수량 1개</p>
                                                                <p className="item-amount">84,800원</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="order-product-btn-wrap">
                                                        <Link href="" className="order-product-btn blk">
                                                            교환상세
                                                        </Link>
                                                        <Link href="/reviewWrite.html" className="order-product-btn">
                                                            1:1문의
                                                        </Link>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </>
    );
}