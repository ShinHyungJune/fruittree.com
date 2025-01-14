"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

// 리덕스
import {useDispatch} from "react-redux";
import {actions} from "@/app/store";


export default function Page() {
    const router = useRouter();

    const Text = `
    개인정보취급방침
개인정보의 수집목적 및 이용
“농업회사법인 열매나무 주식회사”는 이용자의 신분확인과 개개인의 특성에 맞추어 보다 다양하고 광범위한 맞춤 서비스를 드리기 위해 개인정보를 수집합니다. 이러한 목적으로 수집된 개인정보는 구매계약에 따른 빠르고 정확한 배송과 전체적인 통계자료 등에 이용되어 회원 개개인의 기호에 맞는 질 높은 서비스를 제공하게 됩니다.
개인정보의 수집범위
“농업회사법인 열매나무 주식회사”는 서비스 계약의 성립 및 이행에 필요한 최소한의 개인정보만을 수집하며, 기타 종교, 출신지, 건강상태 등 이용자의 기본적 인권을 현저하게 침해할 우려가 있는 개인정보는 이용자의 동의가 없는 한 수집하지 않습니다.
개인정보 항목 및 수집방법
수집되는 개인정보는 원활한 서비스 제공에 필요한 최소한의 정보만으로 한정되며, 아래 사항을 포함한 개인 정보의 수집 및 이용에 동의하시지 않을 경우 필수항목의 경우 회원의 가입 및 서비스 제공이 불가능합니다.
1.	수집하는 개인정보 항목
(1)	인터넷회원가입 : 성명, 아이디, 이메일, 주소, 휴대폰번호,
(2)	견적상담 서비스 : 이메일, 성명
2.	개인정보 수집 방법
(1)	홈페이지, 서면양식, 전화, 팩스, 이메일
개인정보의 보유기간 및 이용기간
1.	귀하의 개인정보는 다음과 같이 개인정보의 수집목적 또는 제공받은 목적이 달성되면 파기됩니다. 단, 상법 등 관련법령의 규정에 의하여 다음과 같이 거래 관련 권리 의무 관계의 확인 등을 이유로 일정기간 보유하여야 할 필요가 있을 경우에는 일정기간 보유합니다.
(1)	회원가입정보의 경우, 회원가입을 탈퇴하거나 회원에서 제명된 경우 등 일정한 사전에 보유목적, 기간 및 보유하는 개인정보 항목을 명시하여 동의를 구합니다.
(2)	계약 또는 청약철회 등에 관한 기록 : 5년
(3)	대금결제 및 재화등의 공급에 관한 기록 : 5년
(4)	소비자의 불만 또는 분쟁처리에 관한 기록 : 3년
2.	귀하의 동의를 받아 보유하고 있는 거래정보 등을 귀하께서 열람을 요구하는 경우 “농업회사법인 열매나무 주식회사”는 지체없이 그 열람, 확인할 수 있도록 조치합니다.
쿠키에 의한 개인정보 수집
1.	쿠키(cookie)란? 
“농업회사법인 열매나무 주식회사”는 귀하에 대한 정보를 저장하고 수시로 찾아내는 쿠키(cookie)를 사용합니다. 쿠키는 웹사이트가 귀하의 컴퓨터 브라우저(넷스케이프, 인터넷 익스플로러 등)로 전송하는 소량의 정보입니다. 귀하께서 웹사이트에 접속을 하면 “농업회사법인 열매나무 주식회사”의 컴퓨터는 귀하의 브라우저에 있는 쿠키의 내용을 읽고, 귀하의 추가정보를 귀하의 컴퓨터에서 찾아 접속에 따른 성명 등의 추가 입력 없이 서비스를 제공할 수 있습니다. 쿠키는 귀하의 컴퓨터는 식별하지만 귀하를 개인적으로 식별하지는 않습니다. 또한 귀하는 쿠키에 대한 선택권이 있습니다. 웹브라우저 상단의 도구 > 인터넷옵션 탭(option tab)에서 모든 쿠키를 다 받아들이거나, 쿠키가 설치될 때 통지를 보내도록 하거나, 아니면 모든 쿠키를 거부할 수 있는 선택권을 가질 수 있습니다.
2.	“농업회사법인 열매나무 주식회사”의 쿠키(cookie) 운용 
“농업회사법인 열매나무 주식회사”는 이용자의 편의를 위하여 쿠키를 운영합니다. “농업회사법인 열매나무 주식회사”의 쿠키를 통해 수집하는 정보는 “농업회사법인 열매나무 주식회사” 회원 ID에 한하며, 그 외의 다른 정보는 수집하지 않습니다. “농업회사법인 열매나무 주식회사”의 쿠키(cookie)를 통해 수집한 회원 ID는 다음의 목적을 위해 사용됩니다.
(1)	개인의 관심 분야에 따라 차별화된 정보를 제공
(2)	회원과 비회원의 접속빈도 또는 머문시간 등을 분석하여 이용자의 취향과 관심분야를 파악하여 타겟(target) 마케팅에 활용
(3)	쇼핑한 품목들에 대한 정보와 관심있게 둘러본 품목들에 대한 자취를 추적하여 다음 쇼핑 때 개인 맞춤 서비스를 제공 - 회원들의 습관을 분석하여 서비스 개편 등의 척도
(4)	게시판 글 등록 쿠키는 브라우저의 종료시나 로그아웃시 만료됩니다.
이용자의 동의절차와 예외 경우
“농업회사법인 열매나무 주식회사”는 이용자의 개인정보를 수집하는 경우 이용자의 서명날인, 전자서명, 전자우편, 동의함에 클릭하는 등의 이용자 동의절차를 거칩니다. 단, 다음의 경우는 예외로 합니다.
(1)	정보통신망이용촉진등에관한법률 또는 기타 다른 법령 등에 특별한 규정이 있는 경우
(2)	서비스 이용계약의 이행을 위하여 필요한 경우
(3)	서비스 제공에 따른 요금정산을 위하여 필요한 경우
개인정보의 위탁관리
“농업회사법인 열매나무 주식회사”가 개인정보 처리를 외부에 위탁하는 경우, 이용자의 동의를 받습니다. 그럴 때에도 위탁계약 등을 통해 서비스제공자의 개인정보보호 관련 지시엄수, 개인정보에 관한 비밀유지, 제3자 제공의 금지 및 사고시의 책임부담 등을 명확히 규정하고 계약내용을기록으로 보존합니다.
이용자관리
1.	개인정보 동의철회 
이용자는 자신의 개인정보수집에 동의한 후, 추후 이용자 ID와 비밀번호를 입력하여 동의를 철회하실 수 있습니다. 그럴 경우 본인여부를 확인한 후 원하는 조치를 해 드립니다.
2.	개인정보 열람 및 정정 
이용자가 자기 개인정보의 열람, 정정을 원할 때는 “농업회사법인 열매나무 주식회사”의 홈페이지로 접속해 이용자 ID와 비밀번호를 입력한 후, 본인의 개인정보 열람 및 정정을 요구할 수 있습니다. 이 경우에도 “농업회사법인 열매나무 주식회사”는 정정조치를 취한 후 이용자에게 통보해 드립니다.
3.	서비스에 대한 불만 처리
“농업회사법인 열매나무 주식회사”는 서비스 이용과 관련해 개인정보 등에 대한 이용자 불만은 언제든 친절히 해결해 드립니다. 불만에 대한 내용은 다음 메일 주소로 보내주시기 바랍니다. 
회원 불만 접수 인터넷 메일 주소 : bezzangecp@naver.com

4.	분쟁조정
“농업회사법인 열매나무 주식회사”의 이용자는 개인정보에 관한 분쟁이 있는 경우 신속하고 효과적인 분쟁해결을 위하여 한국정보보호센터 내의 개인정보분쟁조정위원회에 그 처리를 의뢰할 수 있습니다.
개인정보침해신고센터 URL: www.cyberprivacy.or.kr 
PC통신: go eprivacy
개인정보침해신고센터 전화: 02-1336

개인정보 보호정책의 개정
본 개인정보 보호정책은 정부의 관련법률 및 지침의 변경과 “농업회사법인 열매나무 주식회사”의 정책변화에 따라 수시로 변경될 수 있습니다. 변경된 사항은 정기적으로 방문하셔서 내용을 확인해 주십시오. 만약 변경사항에 의문이 있으실 때엔 언제든 개인정보관리자 김연진 (이메일 : bezzangecp@naver.com / 전화번호 : 055-944-3533)또는 고객센터(이메일 : bezzangecp@naver.com / 전화번호 : 055-944-3533)로 문의해 주십시오.

    `


    return (
        <section className="m-contents-section">
            <div className="container sm">
                <div className="m-contents-wrap type01">
                    <h2>개인정보취급방침</h2>
                    {Text}
                </div>
            </div>

        </section>
    );
}
