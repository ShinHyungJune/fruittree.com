"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";
// 리덕스
import { useDispatch, useSelector } from "react-redux";
import Header from "@/components/Header";
import NoListData from "@/components/NoListData";
import Pagination from "@/components/Pagination";
import product_reviewApi from "@/lib/api/product_reviewApi";
import ReviewAvailable from "@/components/library/ReviewAvailable";

export default function page() {
    const router = useRouter();

    const [form, setForm] = useState({
        page: 1,
    });
    const [reviews, setReviews] = useState({
        data: [],
        meta: {
            current_page: 1,
            last_page: 1,
            total: 0,
        },
    });

    // 유저 정보 관리
    const user = useSelector(state => state.app.user);
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);


    useEffect(() => {
        index()
    }, [form])
    function index() {
        product_reviewApi.indexAvailable(form, (response) => {
            setReviews(response.data);
        })
    }


    return (
        <>
            <Header subTitle={'상품 리뷰'} />
            <div className="body">
                {
                    isClient &&
                    <>
                        <div className="tab-menu-type2">
                            <ul>
                                <li className="active">
                                    <Link href="/mypage/review/available" className="">
                                        작성 가능한 리뷰 ({user.available_product_reviews_count})
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/mypage/review/mine">
                                        내 리뷰 ({user.product_reviews_count})
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <section>
                            <div className="totalEarnablePoints-wrap px-20 pt-20 pb-20">
                                <p className="label">적립 가능한 적립금 합계</p>
                                <p className="totalEarnablePoints">{user.available_deposit_point.toLocaleString()}P</p>
                            </div>

                            <div className="order-product-list-type1">
                                {
                                    reviews.data.length > 0 ? (
                                        <ul>
                                            {
                                                reviews.data.map((review) => {
                                                    return (
                                                        <li key={review.id}>
                                                            <ReviewAvailable review={review} onSuccess={() => { index() }} />
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    ) : (<NoListData />)
                                }
                            </div>

                            <Pagination
                                form={form}
                                setForm={setForm}
                                meta={reviews.meta}
                            />
                        </section>
                    </>
                }
            </div>
        </>
    );
}
