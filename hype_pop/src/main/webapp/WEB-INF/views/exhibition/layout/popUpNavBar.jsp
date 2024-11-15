<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>페이지 제목</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .navBar {
            display: flex;
            justify-content: center;
            background-color: #333;
            padding: 10px;
            position: fixed;
            bottom: 0;
            width: 100%;
        }
        .navBar a {
            color: white;
            text-decoration: none;
            padding: 14px 20px;
            text-align: center;
        }
        .navBar a:hover {
            background-color: #575757;
            transition: background-color 0.3s;
        }
    </style>
</head>
<body>
    <div class="navBar">
        <a href="/hypePop/search/noData">팝업 스토어 검색</a>
        <a href="/goodsStore/goodsSearch">굿즈 검색</a>
        <a href="/hypePop/popUpMain#MapAPI">내 주변</a>
        <a href="/hypePop/calendar">캘린더</a>
        <a href="/member/login">로그인</a>
        <a href="#" onclick="logout()">로그아웃</a>
        <a href="/member/myPage?userNo=2">마이페이지</a>
    </div>
</body>
<script type="text/javascript">
    function logout() {
        // localStorage에서 userNo 삭제
        localStorage.removeItem('userNo');
        
        // Spring Security 로그아웃 URL로 리디렉션 (로그아웃 처리)
        window.location.href = '/logout';
        
        // 페이지 리로드
        location.reload();
    }
</script>

</html>
