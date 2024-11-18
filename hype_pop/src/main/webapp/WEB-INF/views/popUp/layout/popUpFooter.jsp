<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>푸터와 네비게이션 바</title>
    <style>
        /* 전체 요소에 대한 기본 스타일 */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        /* 페이지 전체 레이아웃 스타일 */
        body {
            display: flex;
            flex-direction: column; /* 위에서 아래로 요소 배치 */
            min-height: 100vh; /* 최소 높이를 화면 크기로 설정 */
        }

        /* 메인 콘텐츠 영역 */
        #main-content {
            flex: 1; /* 화면을 채우는 영역 */
            padding: 20px; /* 여백 설정 */
        }

        /* 푸터 컨테이너 스타일 */
        .footer-container {
            display: flex;
            justify-content: space-between;
            padding: 20px;
            background-color: #f8f8f8;
            border-top: 1px solid #ccc;
            text-align: center;
        }

        .footer-contact h4 {
            margin-bottom: 10px;
            padding: 5px;
        }

        /* 네비게이션 바 기본 스타일 */
        nav {
            position: relative; /* 상대적 위치 지정 */
            z-index: 10; /* 다른 요소 위에 렌더링 */
        }
    </style>
</head>
<body>
    <!-- 네비게이션 바 -->
    <jsp:include page="popUpNavBar.jsp"/>



    <!-- 푸터 내용 -->
    <div class="footer-container">
        <div class="footer-contact">
            <h4>Address. 서울특별시마포구매봉산로31,9층 901호(시너지움) | E-mail. resource@kgda.or.kr | 사업자등록번호 206-82-06966호</h4>
            <h4>Copyrights 2021 by KGDA. All right reserved.</h4>
        </div>
    </div>
</body>
</html>
